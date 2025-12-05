"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { generatePublicId, pluralize } from "@/lib/utils";
import { Merchant, LoyaltyProgram } from "@/types/database";

export default function ProgramPage() {
  const router = useRouter();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [rewardName, setRewardName] = useState("");
  const [stampsRequired, setStampsRequired] = useState(10);
  const [stampUnitLabel, setStampUnitLabel] = useState("slice");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: merchantData } = await supabase
        .from("merchants")
        .select("*")
        .eq("owner_user_id", user.id)
        .single();

      if (merchantData) {
        setMerchant(merchantData as any);
        setBusinessName((merchantData as any).business_name);
        setLogoUrl((merchantData as any).logo_url || "");

        const { data: programData } = await supabase
          .from("loyalty_programs")
          .select("*")
          .eq("merchant_id", (merchantData as any).id)
          .single();

        if (programData) {
          setProgram(programData as any);
          setRewardName((programData as any).reward_name);
          setStampsRequired((programData as any).stamps_required);
          setStampUnitLabel((programData as any).stamp_unit_label);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create or update merchant
      let merchantId = merchant?.id;
      if (!merchant) {
        const { data: newMerchant, error: merchantError } = await supabase
          .from("merchants")
          .insert({
            owner_user_id: user.id,
            business_name: businessName,
            logo_url: logoUrl || null,
          } as any)
          .select()
          .single();

        if (merchantError) throw merchantError;
        merchantId = (newMerchant as any).id;
        setMerchant(newMerchant as any);
      } else {
        const { error: updateError } = await (
          supabase.from("merchants").update as any
        )({
          business_name: businessName,
          logo_url: logoUrl || null,
        }).eq("id", merchant.id);

        if (updateError) throw updateError;
      }

      // Create or update loyalty program
      if (!program && merchantId) {
        const { data: newProgram, error: programError } = await supabase
          .from("loyalty_programs")
          .insert({
            merchant_id: merchantId,
            reward_name: rewardName,
            stamps_required: stampsRequired,
            stamp_unit_label: stampUnitLabel,
            public_id: generatePublicId(),
          } as any)
          .select()
          .single();

        if (programError) throw programError;
        setProgram(newProgram as any);
      } else if (program) {
        const { error: updateError } = await (
          supabase.from("loyalty_programs").update as any
        )({
          reward_name: rewardName,
          stamps_required: stampsRequired,
          stamp_unit_label: stampUnitLabel,
        }).eq("id", program.id);

        if (updateError) throw updateError;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  const stampUnitPlural = pluralize(stampUnitLabel, stampsRequired);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {merchant ? "Configurar Tu Programa" : "Crear Tu Cafetería"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Business Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Información del Negocio
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Negocio *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ej., Café Monterrey"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Logo (opcional)
              </label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/logo.png"
              />
            </div>
          </div>
        </div>

        {/* Loyalty Program */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Programa de Lealtad
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Recompensa *
              </label>
              <input
                type="text"
                value={rewardName}
                onChange={(e) => setRewardName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ej., PASTEL ½ KG GRATIS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sellos Requeridos *
              </label>
              <input
                type="number"
                value={stampsRequired}
                onChange={(e) => setStampsRequired(parseInt(e.target.value))}
                required
                min="1"
                max="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiqueta de Unidad de Sello (singular) *
              </label>
              <input
                type="text"
                value={stampUnitLabel}
                onChange={(e) => setStampUnitLabel(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ej., rebanada, café, visita"
              />
              <p className="text-sm text-gray-500 mt-1">
                Plural: {stampUnitPlural}
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vista Previa</h2>
          <div className="border-2 border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {businessName || "Tu Negocio"}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                1 {stampUnitLabel} = 1 sello
              </div>
              <div className="text-lg font-medium text-gray-800">
                {stampsRequired} {stampUnitPlural} ={" "}
                {rewardName || "Tu Recompensa"}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium text-lg"
        >
          {saving
            ? "Guardando..."
            : merchant
            ? "Actualizar Programa"
            : "Crear Programa"}
        </button>
      </form>
    </div>
  );
}
