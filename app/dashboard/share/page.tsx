"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import QRCode from "react-qr-code";
import { LoyaltyProgram } from "@/types/database";

export default function SharePage() {
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadProgram();
  }, []);

  async function loadProgram() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: merchantData, error: merchantError } = await supabase
        .from("merchants")
        .select("id")
        .eq("owner_user_id", user.id)
        .single();

      if (merchantData && !merchantError) {
        const { data: programData } = await supabase
          .from("loyalty_programs")
          .select("*")
          .eq("merchant_id", merchantData.id)
          .single();

        if (programData) {
          setProgram(programData);
        }
      }
    } catch (error) {
      console.error("Error loading program:", error);
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!program) return;
    const url = getSignupUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function getSignupUrl(): string {
    if (!program) return "";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    return `${baseUrl}/c/${program.public_id}`;
  }

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (!program) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          Por favor crea tu programa de lealtad primero.
        </div>
      </div>
    );
  }

  const signupUrl = getSignupUrl();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Comparte Tu Tarjeta de Lealtad
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Código QR de Registro de Clientes
          </h2>
          <p className="text-gray-600 mb-6">
            Los clientes pueden escanear este código QR para registrarse y
            obtener su tarjeta de lealtad digital
          </p>

          <div className="inline-block p-8 bg-white border-4 border-gray-200 rounded-lg">
            <QRCode value={signupUrl} size={256} />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Enlace de Registro
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={signupUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Comparte este enlace con tus clientes por correo electrónico, redes
            sociales o tu sitio web
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            ¿Cómo funciona?
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>El cliente escanea el código QR o visita el enlace</li>
            <li>Ingresa su nombre y correo electrónico (opcional)</li>
            <li>Recibe una tarjeta de lealtad digital para Apple Wallet</li>
            <li>Escaneas su tarjeta para agregar sellos al pagar</li>
            <li>
              Cuando alcancen {program.stamps_required} sellos, ¡desbloquean la
              recompensa!
            </li>
          </ol>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Consejos</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Imprime el código QR y muéstralo en tu mostrador</li>
            <li>Agrega el código QR a tus recibos</li>
            <li>Comparte el enlace en tus perfiles de redes sociales</li>
            <li>Inclúyelo en tu firma de correo electrónico</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
