import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Stamply</h1>
          <p className="text-2xl text-gray-600">
            Tarjetas de Lealtad Digitales para Cafeterías y Panaderías
          </p>
        </header>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Recompensa a tus Clientes con Tarjetas de Lealtad Digitales
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Crea hermosas tarjetas de lealtad digitales que se integran con
              Apple Wallet. ¡Olvídate de las tarjetas de papel y digitalízate
              hoy!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-medium text-lg shadow-lg"
              >
                Comenzar Gratis
              </Link>
              <Link
                href="/auth/login"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-medium text-lg"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Integración con Apple Wallet
            </h3>
            <p className="text-gray-600">
              Tus clientes obtienen una tarjeta digital en su Apple Wallet -
              siempre accesible, nunca se pierde.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Fácil de Usar
            </h3>
            <p className="text-gray-600">
              Configura tu programa de lealtad en minutos. Escanea códigos QR
              para agregar sellos en caja.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Recompensas Personalizables
            </h3>
            <p className="text-gray-600">
              Define tus propias recompensas y requisitos de sellos. Perfecto
              para cafeterías, panaderías y más.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ¿Cómo Funciona?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Crea tu Programa
                </h3>
                <p className="text-gray-600">
                  Regístrate y configura tu programa de lealtad con el nombre de
                  tu negocio, recompensa y requisitos de sellos.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Comparte con tus Clientes
                </h3>
                <p className="text-gray-600">
                  Obtén un código QR y enlace para compartir con tus clientes.
                  Lo escanean para obtener su tarjeta de lealtad digital.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Sella y Recompensa
                </h3>
                <p className="text-gray-600">
                  Escanea las tarjetas de los clientes en caja para agregar
                  sellos. ¡Cuando alcancen la meta, desbloquean su recompensa!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600">
          <p>© 2024 Stamply. Hecho con Next.js, Supabase y ❤️</p>
        </footer>
      </div>
    </div>
  );
}
