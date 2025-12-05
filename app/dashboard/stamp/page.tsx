"use client";

import { useState } from "react";
import { LoyaltyPassWithDetails } from "@/types/database";

export default function StampPage() {
  const [passSerial, setPassSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<LoyaltyPassWithDetails | null>(null);

  async function handleStamp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/pass/stamp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passSerial }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to stamp card");
      }

      setResult(data.loyaltyPass);
      setPassSerial(""); // Clear input for next scan
    } catch (err: any) {
      setError(err.message || "Failed to stamp card");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Sellar Tarjeta de Cliente
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleStamp} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escanear o Ingresar Serial del Pase
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={passSerial}
              onChange={(e) => setPassSerial(e.target.value)}
              required
              autoFocus
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Ingresa el número de serie del pase"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium text-lg"
            >
              {loading ? "Sellando..." : "Sellar"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Escanea el código QR en la tarjeta de lealtad del cliente o ingresa
            el número de serie manualmente
          </p>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {result && (
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="text-4xl">✓</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-800 mb-2">
                  ¡Sello Agregado Exitosamente!
                </div>
                {result.reward_unlocked && (
                  <div className="text-lg font-medium text-green-700 mb-4">
                    🎉 ¡Recompensa Desbloqueada! 🎉
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cliente:</span>
                <span className="font-medium text-gray-900">
                  {result.customer.first_name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sellos Actuales:</span>
                <span className="font-medium text-gray-900">
                  {result.current_stamps} /{" "}
                  {result.loyalty_program.stamps_required}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recompensa:</span>
                <span className="font-medium text-gray-900">
                  {result.loyalty_program.reward_name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estado:</span>
                <span
                  className={`font-medium ${
                    result.reward_unlocked ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {result.reward_unlocked ? "Desbloqueado" : "En Progreso"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progreso</span>
                  <span>
                    {Math.round(
                      (result.current_stamps /
                        result.loyalty_program.stamps_required) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      result.reward_unlocked ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (result.current_stamps /
                          result.loyalty_program.stamps_required) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">💡 Consejo</h3>
        <p className="text-sm text-blue-800">
          Para un pago más rápido, usa un escáner de código de barras para
          escanear el código QR en las tarjetas de los clientes. El número de
          serie se ingresará automáticamente.
        </p>
      </div>
    </div>
  );
}
