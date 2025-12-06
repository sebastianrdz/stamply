"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Stamply
              </Link>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("caracteristicas")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Características
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Cómo Funciona
              </button>
              <button
                onClick={() => scrollToSection("precios")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Precios
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Preguntas Frecuentes
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Entrar</span>
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Comenzar Gratis</span>
                <span className="sm:hidden">Gratis</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Two Columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Recompensa a tus Clientes con Tarjetas de Lealtad Digitales
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Crea hermosas tarjetas de lealtad digitales que se integran con
              Apple Wallet. ¡Olvídate de las tarjetas de papel y digitalízate
              hoy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 hover:scale-105 font-medium text-lg shadow-lg transition-all hover:shadow-xl text-center"
              >
                Comenzar Gratis
              </Link>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 hover:scale-105 font-medium text-lg transition-all"
              >
                Ver cómo funciona
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Sin contratos largos. Cancela cuando quieras.
            </p>
          </div>

          {/* Right Column - Mockup */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative hover:scale-105 transition-transform duration-500">
              {/* iPhone Mockup */}
              <div className="w-[240px] sm:w-[280px] h-[480px] sm:h-[560px] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gray-50 h-12 flex items-center justify-center">
                    <div className="w-24 h-6 bg-gray-900 rounded-full"></div>
                  </div>

                  {/* Wallet Card */}
                  <div className="p-4 sm:p-6">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
                      <div className="flex justify-between items-start mb-6 sm:mb-8">
                        <div>
                          <p className="text-xs sm:text-sm opacity-90">
                            Tarjeta de Lealtad
                          </p>
                          <h3 className="text-lg sm:text-2xl font-bold mt-1">
                            Tu Cafetería
                          </h3>
                        </div>
                        <div className="text-2xl sm:text-4xl">☕</div>
                      </div>

                      <div className="mb-4 sm:mb-6">
                        <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">
                          Cliente
                        </p>
                        <p className="text-base sm:text-lg font-semibold">
                          Juan Pérez
                        </p>
                      </div>

                      {/* Stamps */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">
                          Progreso
                        </p>
                        <div className="flex gap-1.5 sm:gap-2">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white ${
                                i < 6 ? "bg-white" : "bg-transparent"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm opacity-90 mt-3 sm:mt-4">
                        10 sellos = 1 café gratis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white/50 py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8">
            Diseñado para cafeterías y panaderías independientes en Monterrey y
            más allá
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div
              className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors opacity-100 animate-fade-in"
              style={{ animationDelay: "0ms" }}
            >
              Café Bloom
            </div>
            <div
              className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors opacity-100 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Country Culture Coffee
            </div>
            <div
              className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors opacity-100 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Panadería Central
            </div>
            <div
              className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors opacity-100 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              Café del Valle
            </div>
            <div
              className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors opacity-100 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Pan y Más
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="caracteristicas"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué Stamply?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo lo que necesitas para reemplazar las tarjetas de sello en papel
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-slide-up"
            style={{ animationDelay: "0ms" }}
          >
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Siempre en el bolsillo del cliente
            </h3>
            <p className="text-gray-600">
              Tus clientes obtienen una tarjeta digital en su Apple Wallet -
              siempre accesible, nunca se pierde.
            </p>
          </div>
          <div
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-slide-up"
            style={{ animationDelay: "150ms" }}
          >
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Configura tu programa en minutos
            </h3>
            <p className="text-gray-600">
              Configura tu programa de lealtad en minutos. Escanea códigos QR
              para agregar sellos en caja.
            </p>
          </div>
          <div
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Recompensas hechas a tu medida
            </h3>
            <p className="text-gray-600">
              Define tus propias recompensas y requisitos de sellos. Perfecto
              para cafeterías, panaderías y más.
            </p>
          </div>
        </div>
      </section>

      {/* Value & ROI Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 opacity-0 animate-slide-up px-4">
              El Valor Real de un Programa de Lealtad
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto opacity-0 animate-slide-up px-4"
              style={{ animationDelay: "150ms" }}
            >
              Los programas de lealtad no son solo un beneficio para tus
              clientes, son una inversión estratégica que impulsa tu negocio
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            <div
              className="text-center opacity-0 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                  67%
                </div>
                <p className="text-blue-100 text-sm sm:text-base md:text-lg">
                  de clientes gastan más cuando participan en un programa de
                  lealtad
                </p>
              </div>
            </div>
            <div
              className="text-center opacity-0 animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                  5x
                </div>
                <p className="text-blue-100 text-sm sm:text-base md:text-lg">
                  más económico retener un cliente que conseguir uno nuevo
                </p>
              </div>
            </div>
            <div
              className="text-center opacity-0 animate-slide-up sm:col-span-2 md:col-span-1"
              style={{ animationDelay: "400ms" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                  +40%
                </div>
                <p className="text-blue-100 text-sm sm:text-base md:text-lg">
                  aumento en frecuencia de visitas con programas de lealtad
                  efectivos
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            <div
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl opacity-0 animate-slide-up hover:shadow-2xl transition-shadow"
              style={{ animationDelay: "500ms" }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                  💰
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Aumenta el Ticket Promedio
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Los clientes con tarjetas de lealtad tienden a comprar más
                    por visita para alcanzar su siguiente recompensa. Un café
                    extra, un pastel adicional - cada compra cuenta.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl opacity-0 animate-slide-up hover:shadow-2xl transition-shadow"
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                  🔄
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Clientes que Regresan Más Seguido
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    La anticipación de completar su tarjeta motiva a los
                    clientes a elegir tu cafetería sobre la competencia. Más
                    visitas = más ingresos.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl opacity-0 animate-slide-up hover:shadow-2xl transition-shadow"
              style={{ animationDelay: "700ms" }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                  📊
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Datos Valiosos de tus Clientes
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Conoce quiénes son tus mejores clientes, cuándo visitan y
                    qué compran. Información que te ayuda a tomar mejores
                    decisiones de negocio.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl opacity-0 animate-slide-up hover:shadow-2xl transition-shadow"
              style={{ animationDelay: "800ms" }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                  ❤️
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Construye Lealtad Real
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Los clientes se sienten valorados y apreciados. Un programa
                    de lealtad bien ejecutado transforma compradores ocasionales
                    en embajadores de tu marca.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Example */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <div
              className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-white/20 opacity-0 animate-slide-up"
              style={{ animationDelay: "900ms" }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 text-center px-2">
                Ejemplo Real: Cafetería con 100 Clientes Activos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="bg-white/5 rounded-lg p-4 sm:bg-transparent sm:p-0">
                  <div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wide mb-2">
                    Antes
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    2 visitas/mes
                  </div>
                  <div className="text-blue-200 text-xs sm:text-sm">
                    $80 promedio/cliente
                  </div>
                </div>
                <div className="hidden sm:flex items-center justify-center">
                  <div className="text-4xl text-white animate-pulse-slow">
                    →
                  </div>
                </div>
                <div className="sm:hidden flex items-center justify-center py-2">
                  <div className="text-3xl text-white animate-pulse-slow rotate-90">
                    →
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 sm:bg-transparent sm:p-0">
                  <div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wide mb-2">
                    Con Stamply
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    3 visitas/mes
                  </div>
                  <div className="text-blue-200 text-xs sm:text-sm">
                    $120 promedio/cliente
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-blue-100 text-base sm:text-lg mb-2">
                    Incremento mensual en ingresos
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    +$4,000 MXN
                  </div>
                  <div className="text-blue-200 mt-2 text-sm sm:text-base">
                    Inversión: $499/mes • ROI: 800%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Tres pasos simples para empezar
          </p>

          <div className="space-y-12">
            <div
              className="flex gap-6 items-start opacity-0 animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Crea tu programa de lealtad
                </h3>
                <p className="text-lg text-gray-600">
                  Elige cuántos sellos se necesitan y qué recompensa quieres
                  ofrecer. Personaliza el nombre de tu negocio y los detalles de
                  tu programa.
                </p>
              </div>
            </div>

            <div
              className="flex gap-6 items-start opacity-0 animate-slide-up"
              style={{ animationDelay: "250ms" }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Comparte tu código QR
                </h3>
                <p className="text-lg text-gray-600">
                  Imprímelo y colócalo en tu barra o mesas para que tus clientes
                  se registren. También puedes compartir el enlace por redes
                  sociales.
                </p>
              </div>
            </div>

            <div
              className="flex gap-6 items-start opacity-0 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Sella y recompensa
                </h3>
                <p className="text-lg text-gray-600">
                  Escanea la tarjeta digital en cada compra y entrega la
                  recompensa cuando completen los sellos. ¡Así de fácil!
                </p>
              </div>
            </div>
          </div>

          <div
            className="text-center mt-12 opacity-0 animate-slide-up"
            style={{ animationDelay: "550ms" }}
          >
            <Link
              href="/auth/signup"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 hover:scale-105 font-medium text-lg shadow-lg transition-all hover:shadow-xl"
            >
              Empezar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen las cafeterías
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 opacity-0 animate-slide-up hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 animate-pulse-slow">
                A
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Ana García</p>
                <p className="text-gray-600">Dueña de Café Bloom</p>
              </div>
            </div>
            <p className="text-xl text-gray-700 italic leading-relaxed">
              &ldquo;Desde que usamos Stamply, nuestros clientes regresan más
              seguido y ya no tenemos pilas de tarjetas de papel. La integración
              con Apple Wallet es perfecta y a nuestros clientes les
              encanta.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Precios simples para tu cafetería
            </h2>
            <p className="text-xl text-gray-600">
              Empieza gratis y paga solo si te funciona
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200 opacity-0 animate-slide-up hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Plan Cafetería
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-blue-600">$499</span>
                  <span className="text-gray-600">/ mes por sucursal</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Tarjetas digitales ilimitadas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Clientes ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Integración con Apple Wallet
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Soporte por correo</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Actualizaciones automáticas
                  </span>
                </li>
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full bg-blue-600 text-white text-center px-8 py-4 rounded-lg hover:bg-blue-700 font-medium text-lg shadow-lg transition-all hover:shadow-xl"
              >
                Comenzar Gratis
              </Link>

              <p className="text-center text-sm text-gray-600 mt-4">
                Puedes cancelar en cualquier momento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber sobre Stamply
          </p>
        </div>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">
                ¿Mis clientes necesitan instalar una app?
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform ${
                  openFaq === 1 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 1 && (
              <div className="px-6 pb-5">
                <p className="text-gray-600">
                  No. Solo escanean un código QR y agregan su tarjeta a Apple
                  Wallet. No necesitan descargar ninguna aplicación adicional.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">
                ¿Qué pasa si mi negocio no usa dispositivos Apple?
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform ${
                  openFaq === 2 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 2 && (
              <div className="px-6 pb-5">
                <p className="text-gray-600">
                  Puedes seguir escaneando códigos desde cualquier navegador en
                  cualquier dispositivo. Tus clientes con iPhone usarán Apple
                  Wallet, y estamos trabajando en soporte para Android.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">
                ¿Puedo usar Stamply en varias sucursales?
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform ${
                  openFaq === 3 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 3 && (
              <div className="px-6 pb-5">
                <p className="text-gray-600">
                  Sí, puedes registrar varias ubicaciones. Cada sucursal puede
                  tener su propio programa de lealtad o compartir uno común.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">
                ¿Puedo cancelar cuando quiera?
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform ${
                  openFaq === 4 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 4 && (
              <div className="px-6 pb-5">
                <p className="text-gray-600">
                  Sí, sin contratos forzosos. Puedes cancelar tu suscripción en
                  cualquier momento desde tu panel de control.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">
                ¿Cuánto tiempo toma configurarlo?
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform ${
                  openFaq === 5 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 5 && (
              <div className="px-6 pb-5">
                <p className="text-gray-600">
                  La mayoría de las cafeterías lo configuran en menos de 15
                  minutos. Solo necesitas crear tu cuenta, configurar tu
                  programa y compartir el código QR.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 6 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">
                ¿Cómo funcionan las recompensas?
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform ${
                  openFaq === 6 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 6 && (
              <div className="px-6 pb-5">
                <p className="text-gray-600">
                  Tú decides cuántos sellos necesitan tus clientes para obtener
                  una recompensa y qué recompensa ofrecer. Cuando un cliente
                  completa los sellos, su tarjeta se actualiza automáticamente y
                  puede canjear su recompensa.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Stamply</h3>
              <p className="text-gray-600">
                Tarjetas de lealtad digitales para cafeterías y panaderías
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("caracteristicas")}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Características
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("precios")}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Precios
                  </button>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Términos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>© {currentYear} Stamply. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
