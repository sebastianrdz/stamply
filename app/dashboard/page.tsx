"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Merchant, LoyaltyProgram } from "@/types/database";

export default function DashboardPage() {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalStamps: 0,
    rewardsUnlocked: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get merchant
      const { data: merchantData } = await supabase
        .from("merchants")
        .select("*")
        .eq("owner_user_id", user.id)
        .single();

      if (merchantData) {
        setMerchant(merchantData);

        // Get loyalty program
        const { data: programData } = await supabase
          .from("loyalty_programs")
          .select("*")
          .eq("merchant_id", merchantData.id)
          .single();

        if (programData) {
          setProgram(programData);

          // Get stats
          const { data: customers } = await supabase
            .from("customers")
            .select("id")
            .eq("loyalty_program_id", programData.id);

          const { data: passes } = await supabase
            .from("loyalty_passes")
            .select("current_stamps, reward_unlocked")
            .eq("loyalty_program_id", programData.id);

          const totalStamps =
            passes?.reduce((sum, pass) => sum + pass.current_stamps, 0) || 0;
          const rewardsUnlocked =
            passes?.filter((pass) => pass.reward_unlocked).length || 0;

          setStats({
            totalCustomers: customers?.length || 0,
            totalStamps,
            rewardsUnlocked,
          });
        }
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (!merchant) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a Stamply!
          </h2>
          <p className="text-gray-600 mb-6">
            Configuremos el programa de tarjetas de lealtad digital de tu
            cafetería.
          </p>
          <Link
            href="/dashboard/program"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Crear Tu Cafetería
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {merchant.business_name}
        </h1>
        <p className="text-gray-600 mt-2">Resumen del Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Total de Clientes
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalCustomers}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Total de Sellos Dados
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalStamps}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Recompensas Desbloqueadas
          </div>
          <div className="text-3xl font-bold text-green-600">
            {stats.rewardsUnlocked}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/program"
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <div className="font-medium text-gray-900">Configurar Programa</div>
            <div className="text-sm text-gray-600 mt-1">
              Actualiza la configuración de tu programa de lealtad
            </div>
          </Link>
          <Link
            href="/dashboard/share"
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <div className="font-medium text-gray-900">
              Compartir Enlace de Registro
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Obtén código QR y enlace para clientes
            </div>
          </Link>
          <Link
            href="/dashboard/stamp"
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <div className="font-medium text-gray-900">Sellar una Tarjeta</div>
            <div className="text-sm text-gray-600 mt-1">
              Agrega sellos a las tarjetas de clientes
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
