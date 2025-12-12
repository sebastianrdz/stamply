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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Cómo Funciona
              </button>
              <button
                onClick={() => scrollToSection("funciones")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Funciones
              </button>
              <button
                onClick={() => scrollToSection("precios")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Precios
              </button>
              <button
                onClick={() => scrollToSection("opiniones")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Opiniones
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
              Programa de Lealtad Digital Simple y Poderoso
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Sin apps que descargar, sin fricción. Tus clientes agregan tu
              tarjeta de lealtad directo a Apple Wallet o Google Wallet.
              <span className="font-semibold text-gray-900">
                {" "}
                Más visitas, más ventas.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 hover:scale-105 font-semibold text-lg shadow-lg transition-all hover:shadow-xl text-center"
              >
                Comenzar Gratis
              </Link>
              <a
                href="mailto:contacto@stamply.com"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 hover:scale-105 font-semibold text-lg transition-all text-center"
              >
                Agenda una Demo
              </a>
            </div>
            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Empieza en menos de 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sin necesidad de tarjeta de crédito</span>
              </div>
            </div>
          </div>

          {/* Right Column - Card Carousel */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative w-full max-w-sm">
              {/* Stacked Cards with 3D Effect */}
              <div className="relative h-[400px] sm:h-[480px]">
                {/* Card 3 - Background */}
                <div className="absolute top-8 left-4 right-4 transform rotate-3 opacity-40">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl p-6 text-white h-[280px]"></div>
                </div>

                {/* Card 2 - Middle */}
                <div className="absolute top-4 left-2 right-2 transform -rotate-2 opacity-70 hover:opacity-90 transition-all duration-300">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-6 text-white h-[280px]">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs opacity-90">Tarjeta de Lealtad</p>
                        <h3 className="text-xl font-bold mt-1">
                          Panadería Dulce
                        </h3>
                      </div>
                      <div className="text-3xl">🥐</div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs opacity-90 mb-1">Cliente</p>
                      <p className="text-base font-semibold">María García</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs opacity-90 mb-2">Progreso</p>
                      <div className="flex gap-1.5">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-full border-2 border-white ${
                              i < 5 ? "bg-white" : "bg-transparent"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs opacity-90 mt-3">
                      8 compras = 1 pan gratis
                    </div>
                  </div>
                </div>

                {/* Card 1 - Front (Main) */}
                <div className="absolute top-0 left-0 right-0 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white h-[280px]">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs opacity-90">Tarjeta de Lealtad</p>
                        <h3 className="text-xl font-bold mt-1">
                          Café Monterrey
                        </h3>
                      </div>
                      <div className="text-3xl">☕</div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs opacity-90 mb-1">Cliente</p>
                      <p className="text-base font-semibold">Juan Pérez</p>
                    </div>

                    {/* Stamps */}
                    <div className="mb-3">
                      <p className="text-xs opacity-90 mb-2">Progreso</p>
                      <div className="flex gap-1.5">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-full border-2 border-white ${
                              i < 7 ? "bg-white" : "bg-transparent"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs opacity-90 mt-3">
                      10 visitas = 1 café gratis
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-blue-100 animate-pulse-slow">
                <p className="text-xs font-semibold text-gray-700">
                  Compatible con Apple & Google Wallet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      {/* <section className="bg-white/50 py-12 border-y border-gray-200">
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
      </section> */}

      {/* Features Section */}
      {/* <section
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
      </section> */}

      {/* Value & ROI Section */}
      {/* <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 md:py-24">
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
      </section> */}

      {/* How It Works Section - Modern Timeline */}
      <section id="como-funciona" className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center mb-16">
            Tres pasos simples para transformar tu negocio
          </p>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Connecting Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 transform -translate-x-1/2"></div>

            {/* Step 1 */}
            <div className="relative mb-16 md:mb-24">
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div
                  className="md:text-right opacity-0 animate-slide-up"
                  style={{ animationDelay: "100ms" }}
                >
                  <div className="inline-block md:block">
                    <div className="flex md:justify-end items-center gap-4 mb-4">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-xl md:order-2">
                        <span className="text-sm absolute -top-2 -left-2 bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                          01
                        </span>
                        🎨
                      </div>
                      <div className="md:hidden w-full h-0.5 bg-blue-200"></div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                      Diseña tu Tarjeta
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600">
                      Personaliza tu programa de lealtad en minutos. Elige
                      cuántos sellos necesitan tus clientes, qué recompensa
                      ofrecer, y añade el logo de tu negocio.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative mb-16 md:mb-24">
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div className="hidden md:block"></div>
                <div
                  className="opacity-0 animate-slide-up"
                  style={{ animationDelay: "250ms" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-xl">
                      <span className="text-sm absolute -top-2 -left-2 bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                        02
                      </span>
                      📱
                    </div>
                    <div className="md:hidden w-full h-0.5 bg-blue-200"></div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Tus Clientes la Agregan a su Billetera
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Comparte un código QR o enlace. Tus clientes escanean y
                    agregan la tarjeta directo a Apple Wallet o Google Wallet.
                    Sin apps, sin fricción.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div
                  className="md:text-right opacity-0 animate-slide-up"
                  style={{ animationDelay: "400ms" }}
                >
                  <div className="inline-block md:block">
                    <div className="flex md:justify-end items-center gap-4 mb-4">
                      <div className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-xl md:order-2">
                        <span className="text-sm absolute -top-2 -left-2 bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                          03
                        </span>
                        📈
                      </div>
                      <div className="md:hidden w-full h-0.5 bg-blue-200"></div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                      Sella, Mide y Haz Crecer tus Ventas
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600">
                      Cada compra suma un sello. Observa cómo tus clientes
                      regresan más seguido. Accede a estadísticas en tiempo real
                      y haz crecer tu negocio.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className="mt-16 text-center opacity-0 animate-slide-up"
            style={{ animationDelay: "550ms" }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-all mr-4"
            >
              Ver Ejemplo de Tarjeta
            </button>
            <Link
              href="/auth/signup"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 font-semibold shadow-lg transition-all"
            >
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section
        id="funciones"
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Más que una Tarjeta de Sellos
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Stamply te da las herramientas para conocer mejor a tus clientes y
              hacer crecer tu negocio
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-md">
                🔔
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Notificaciones Automáticas
              </h3>
              <p className="text-gray-600">
                Envía recordatorios automáticos a tus clientes cuando estén
                cerca de completar su tarjeta. Mantén tu negocio en su mente.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-md">
                ⏰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Recordatorios Inteligentes
              </h3>
              <p className="text-gray-600">
                Identifica clientes que no han visitado en un tiempo y envíales
                un mensaje personalizado para que regresen.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-md">
                👥
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Base de Datos de Clientes
              </h3>
              <p className="text-gray-600">
                Guarda información de tus clientes: nombre, correo, teléfono.
                Conoce mejor a tu audiencia y personaliza tu servicio.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-md">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Estadísticas en Tiempo Real
              </h3>
              <p className="text-gray-600">
                Ve cuántas tarjetas has emitido, cuántas visitas has tenido y
                cuántas recompensas se han canjeado. Todo en un dashboard
                simple.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "500ms" }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-md">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Promociones Personalizadas
              </h3>
              <p className="text-gray-600">
                Crea ofertas especiales para tus mejores clientes o para
                ocasiones especiales. Aumenta las ventas en días específicos.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "600ms" }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-md">
                📱
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sin Apps que Descargar
              </h3>
              <p className="text-gray-600">
                Tus clientes usan Apple Wallet o Google Wallet que ya tienen en
                su teléfono. Cero fricción, máxima adopción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Una Sola Plataforma para tu Negocio Local
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Ideal para cafeterías, panaderías y muchos otros tipos de negocios
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Business Type 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300">
              <div className="text-4xl mb-3">☕</div>
              <p className="font-semibold text-gray-900">Cafeterías</p>
            </div>

            {/* Business Type 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-300">
              <div className="text-4xl mb-3">🥐</div>
              <p className="font-semibold text-gray-900">Panaderías</p>
            </div>

            {/* Business Type 3 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-pink-300">
              <div className="text-4xl mb-3">🍦</div>
              <p className="font-semibold text-gray-900">Heladerías</p>
            </div>

            {/* Business Type 4 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300">
              <div className="text-4xl mb-3">🌮</div>
              <p className="font-semibold text-gray-900">Foodtrucks</p>
            </div>

            {/* Business Type 5 */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300">
              <div className="text-4xl mb-3">💪</div>
              <p className="font-semibold text-gray-900">Gimnasios</p>
            </div>

            {/* Business Type 6 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-300">
              <div className="text-4xl mb-3">💅</div>
              <p className="font-semibold text-gray-900">Salones</p>
            </div>

            {/* Business Type 7 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-teal-300">
              <div className="text-4xl mb-3">🍕</div>
              <p className="font-semibold text-gray-900">Pizzerías</p>
            </div>

            {/* Business Type 8 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-300">
              <div className="text-4xl mb-3">🍔</div>
              <p className="font-semibold text-gray-900">Restaurantes</p>
            </div>

            {/* Business Type 9 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-300">
              <div className="text-4xl mb-3">🧘</div>
              <p className="font-semibold text-gray-900">Studios</p>
            </div>

            {/* Business Type 10 */}
            <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-lime-300">
              <div className="text-4xl mb-3">🥗</div>
              <p className="font-semibold text-gray-900">Juice Bars</p>
            </div>

            {/* Business Type 11 */}
            <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-fuchsia-300">
              <div className="text-4xl mb-3">🧁</div>
              <p className="font-semibold text-gray-900">Pastelerías</p>
            </div>

            {/* Business Type 12 */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-sky-300">
              <div className="text-4xl mb-3">🛍️</div>
              <p className="font-semibold text-gray-900">Tiendas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Resultados que Sí se Sienten en tu Negocio
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Negocios como el tuyo están viendo resultados reales con Stamply
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Metric 1 */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  +35%
                </div>
                <p className="text-blue-100 text-lg">
                  Aumento en visitas de clientes frecuentes
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  10K+
                </div>
                <p className="text-blue-100 text-lg">
                  Tarjetas digitales emitidas y contando
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  -90%
                </div>
                <p className="text-blue-100 text-lg">
                  Menos tarjetas perdidas vs. papel
                </p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  4.9★
                </div>
                <p className="text-blue-100 text-lg">
                  Calificación promedio de nuestros clientes
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-blue-200 max-w-2xl mx-auto">
              * Resultados basados en promedios de negocios activos. Los
              resultados individuales pueden variar según el tipo de negocio y
              ejecución del programa.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        id="opiniones"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Opiniones de Negocios como el Tuyo
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Descubre cómo Stamply está ayudando a crecer negocios locales
          </p>
        </div>

        {/* Testimonials Grid - Horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-max sm:min-w-0">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300 w-80 sm:w-auto flex-shrink-0 sm:flex-shrink">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  AG
                </div>
                <div>
                  <p className="font-bold text-gray-900">Ana García</p>
                  <p className="text-sm text-gray-600">
                    Dueña de cafetería en Monterrey
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;Desde que usamos Stamply, nuestros clientes regresan más
                seguido. Ya no tenemos pilas de tarjetas de papel y la
                integración con Apple Wallet es perfecta.&rdquo;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300 w-80 sm:w-auto flex-shrink-0 sm:flex-shrink">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  CM
                </div>
                <div>
                  <p className="font-bold text-gray-900">Carlos Martínez</p>
                  <p className="text-sm text-gray-600">
                    Dueño de panadería artesanal
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;Mis clientes aman que puedan tener su tarjeta en el
                celular. He visto un aumento del 40% en clientes que regresan.
                Stamply es una inversión que vale la pena.&rdquo;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300 w-80 sm:w-auto flex-shrink-0 sm:flex-shrink">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  LR
                </div>
                <div>
                  <p className="font-bold text-gray-900">Laura Rodríguez</p>
                  <p className="text-sm text-gray-600">
                    Dueña de heladería local
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;La configuración fue súper fácil. En menos de 10 minutos
                ya tenía mi programa de lealtad funcionando. Las estadísticas me
                ayudan a entender mejor a mis clientes.&rdquo;
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300 w-80 sm:w-auto flex-shrink-0 sm:flex-shrink">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  JS
                </div>
                <div>
                  <p className="font-bold text-gray-900">Jorge Sánchez</p>
                  <p className="text-sm text-gray-600">
                    Dueño de foodtruck de tacos
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;Perfecto para mi foodtruck. Mis clientes escanean el QR,
                agregan la tarjeta y listo. No necesito apps complicadas ni
                equipos caros. Simple y efectivo.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator for mobile */}
        <div className="sm:hidden text-center mt-4">
          <p className="text-sm text-gray-500">← Desliza para ver más →</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Elige el Plan Ideal para tu Negocio
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Empieza gratis, cancela cuando quieras. Sin cargos ocultos.
            </p>

            {/* Monthly/Annual Toggle - Visual only */}
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button className="px-6 py-2 rounded-md bg-white text-gray-900 font-semibold shadow-sm">
                Mensual
              </button>
              <button className="px-6 py-2 rounded-md text-gray-600 font-semibold">
                Anual
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan 1 - Básico */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Básico
                </h3>
                <p className="text-gray-600 mb-4">Perfecto para empezar</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">$399</span>
                  <span className="text-gray-600">/ mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">1 sucursal</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Clientes ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Tarjetas digitales ilimitadas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">1 promoción activa</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Estadísticas básicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Soporte por correo</span>
                </li>
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full bg-gray-900 text-white text-center px-6 py-3 rounded-lg hover:bg-gray-800 font-semibold transition-all"
              >
                Empezar
              </Link>
            </div>

            {/* Plan 2 - Pro (Popular) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-2xl p-8 border-2 border-blue-500 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600 mb-4">
                  Para negocios en crecimiento
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-blue-600">$599</span>
                  <span className="text-gray-600">/ mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 font-semibold">
                    Todo en Básico, más:
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Hasta 3 sucursales</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">5 promociones activas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Estadísticas avanzadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Notificaciones automáticas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Soporte prioritario</span>
                </li>
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-all"
              >
                Empezar
              </Link>
            </div>

            {/* Plan 3 - Multi-sucursal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Multi-sucursal
                </h3>
                <p className="text-gray-600 mb-4">Para cadenas pequeñas</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">$999</span>
                  <span className="text-gray-600">/ mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 font-semibold">
                    Todo en Pro, más:
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Sucursales ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Promociones ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Dashboard centralizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Soporte dedicado</span>
                </li>
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full bg-gray-900 text-white text-center px-6 py-3 rounded-lg hover:bg-gray-800 font-semibold transition-all"
              >
                Empezar
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-12 max-w-2xl mx-auto">
            Todos los planes incluyen integración con Apple Wallet y Google
            Wallet, actualizaciones automáticas y puedes cancelar en cualquier
            momento.
          </p>
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

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Empieza Hoy tu Programa de Lealtad Digital
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Prueba Stamply sin compromiso y descubre cómo aumenta el regreso de
            tus clientes. Configura tu primera tarjeta en menos de 5 minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
            >
              Comenzar Gratis
            </Link>
            <a
              href="mailto:hola@stamply.mx"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 font-semibold text-lg transition-all hover:scale-105 w-full sm:w-auto"
            >
              Hablar con Nosotros
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Configuración en 5 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancela cuando quieras</span>
            </div>
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
