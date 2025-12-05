"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { LoyaltyProgram, Merchant } from "@/types/database";
import { pluralize } from "@/lib/utils";

export default function CustomerSignupPage() {
  const params = useParams();
  const publicId = params.publicId as string;

  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProgram();
  }, [publicId]);

  async function loadProgram() {
    try {
      const { data: programData, error: programError } = await supabase
        .from("loyalty_programs")
        .select("*, merchants(*)")
        .eq("public_id", publicId)
        .single();

      if (programError || !programData) {
        setError("Loyalty program not found");
        return;
      }

      setProgram(programData as any);
      setMerchant((programData as any).merchants);
    } catch (err) {
      console.error("Error loading program:", err);
      setError("Failed to load loyalty program");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/customers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId,
          firstName,
          email: email || undefined,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to create card";
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Download the pass file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        response.headers
          .get("Content-Disposition")
          ?.split("filename=")[1]
          ?.replace(/"/g, "") || "loyalty-card.txt";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);
    } catch (err: any) {
      console.error("Customer creation error:", err);
      setError(err.message || "Failed to create loyalty card");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error && !program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No Encontrado
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Éxito!</h1>
            <p className="text-gray-600 mb-6">
              Tu tarjeta de lealtad ha sido creada y descargada.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-2">
              ¡Hola, {firstName}!
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                ¡Tu tarjeta de lealtad digital para{" "}
                <strong>{merchant?.business_name}</strong> está lista!
              </p>
              <p className="font-medium">
                Colecciona {program?.stamps_required}{" "}
                {pluralize(
                  program?.stamp_unit_label || "sello",
                  program?.stamps_required || 0
                )}{" "}
                para desbloquear:
              </p>
              <p className="text-lg font-bold text-blue-600">
                {program?.reward_name}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Próximos Pasos:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Agrega la tarjeta a Apple Wallet (si es compatible)</li>
              <li>Muestra tu tarjeta al pagar para ganar sellos</li>
              <li>¡Sigue tu progreso hacia tu recompensa!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {merchant?.business_name}
          </h1>
          <p className="text-gray-600">Obtén Tu Tarjeta de Lealtad Digital</p>
        </div>

        {/* Program Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">
              1 {program?.stamp_unit_label} = 1 sello
            </div>
            <div className="text-lg font-bold text-gray-900">
              {program?.stamps_required}{" "}
              {pluralize(
                program?.stamp_unit_label || "",
                program?.stamps_required || 0
              )}{" "}
              = {program?.reward_name}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre *
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo Electrónico (opcional)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="tu@correo.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lo usaremos para enviarte actualizaciones sobre tus recompensas
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium text-lg"
          >
            {submitting
              ? "Creando Tarjeta..."
              : "Obtener Mi Tarjeta de Lealtad"}
          </button>
        </form>
      </div>
    </div>
  );
}
