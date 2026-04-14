import { useState, useEffect, useRef } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function useCounter(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
}

const BambooPattern = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 120 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="60"
      y1="0"
      x2="60"
      y2="400"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.15"
    />
    <line
      x1="57"
      y1="50"
      x2="63"
      y2="50"
      stroke="currentColor"
      strokeWidth="6"
      opacity="0.2"
    />
    <line
      x1="57"
      y1="120"
      x2="63"
      y2="120"
      stroke="currentColor"
      strokeWidth="6"
      opacity="0.2"
    />
    <line
      x1="57"
      y1="190"
      x2="63"
      y2="190"
      stroke="currentColor"
      strokeWidth="6"
      opacity="0.2"
    />
    <line
      x1="57"
      y1="260"
      x2="63"
      y2="260"
      stroke="currentColor"
      strokeWidth="6"
      opacity="0.2"
    />
    <line
      x1="57"
      y1="330"
      x2="63"
      y2="330"
      stroke="currentColor"
      strokeWidth="6"
      opacity="0.2"
    />
    <path
      d="M60 80 Q30 60 20 30"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.1"
      fill="none"
    />
    <path
      d="M60 150 Q90 130 100 100"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.1"
      fill="none"
    />
    <path
      d="M60 220 Q30 200 15 170"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.1"
      fill="none"
    />
    <path
      d="M60 290 Q90 270 105 240"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.1"
      fill="none"
    />
  </svg>
);

const WaveDecoration = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 1440 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 60 Q360 0 720 60 Q1080 120 1440 60 L1440 120 L0 120 Z"
      fill="currentColor"
      opacity="0.08"
    />
    <path
      d="M0 80 Q360 30 720 80 Q1080 130 1440 80 L1440 120 L0 120 Z"
      fill="currentColor"
      opacity="0.05"
    />
  </svg>
);

const SunIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="8" stroke="#D4A574" strokeWidth="1.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1={24 + Math.cos((angle * Math.PI) / 180) * 12}
        y1={24 + Math.sin((angle * Math.PI) / 180) * 12}
        x2={24 + Math.cos((angle * Math.PI) / 180) * 16}
        y2={24 + Math.sin((angle * Math.PI) / 180) * 16}
        stroke="#D4A574"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

function ImagePlaceholder({
  variant,
  className = "",
  aspectClass = "aspect-video",
}: {
  variant: string;
  className?: string;
  aspectClass?: string;
}) {
  const configs: Record<string, { bg: string; label: string; icon: React.ReactNode }> = {
    hero: {
      bg: "from-amber-800 via-orange-700 to-yellow-600",
      label: "Lodge exterior · golden hour",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M8 40 L24 12 L40 40 Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
          <circle cx="34" cy="16" r="4" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
      ),
    },
    pool: {
      bg: "from-teal-700 via-cyan-600 to-emerald-500",
      label: "Natural pool & greenery",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4 28 Q12 22 20 28 Q28 34 36 28 Q40 25 44 28" stroke="white" strokeWidth="1.5" opacity="0.4" fill="none" />
          <path d="M4 34 Q12 28 20 34 Q28 40 36 34 Q40 31 44 34" stroke="white" strokeWidth="1" opacity="0.25" fill="none" />
        </svg>
      ),
    },
    bamboo: {
      bg: "from-yellow-700 via-amber-600 to-lime-600",
      label: "Bamboo architecture",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <line x1="16" y1="4" x2="16" y2="44" stroke="white" strokeWidth="2" opacity="0.3" />
          <line x1="24" y1="8" x2="24" y2="44" stroke="white" strokeWidth="2" opacity="0.25" />
          <line x1="32" y1="4" x2="32" y2="44" stroke="white" strokeWidth="2" opacity="0.2" />
        </svg>
      ),
    },
    garden: {
      bg: "from-emerald-700 via-green-600 to-teal-500",
      label: "Tropical garden",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 44 L24 20" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <path d="M24 20 Q16 16 18 8 Q20 4 24 6 Q28 4 30 8 Q32 16 24 20" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
        </svg>
      ),
    },
    bedroom: {
      bg: "from-amber-900 via-orange-800 to-yellow-700",
      label: "Rustic bedroom",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="20" width="32" height="16" rx="2" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
          <rect x="10" y="16" width="12" height="6" rx="3" stroke="white" strokeWidth="1" opacity="0.25" fill="none" />
          <rect x="26" y="16" width="12" height="6" rx="3" stroke="white" strokeWidth="1" opacity="0.25" fill="none" />
        </svg>
      ),
    },
    terrace: {
      bg: "from-orange-700 via-amber-600 to-yellow-500",
      label: "Open terrace",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4 32 L24 16 L44 32" stroke="white" strokeWidth="1.5" opacity="0.3" fill="none" />
          <rect x="12" y="32" width="24" height="12" stroke="white" strokeWidth="1" opacity="0.25" fill="none" />
        </svg>
      ),
    },
    beach: {
      bg: "from-sky-600 via-cyan-500 to-amber-400",
      label: "Nearby beach",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="36" cy="10" r="5" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M0 28 Q12 22 24 28 Q36 34 48 28" stroke="white" strokeWidth="1.5" opacity="0.3" fill="none" />
        </svg>
      ),
    },
    detail: {
      bg: "from-stone-600 via-amber-700 to-orange-600",
      label: "Artisan detail",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
          <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="1" opacity="0.2" fill="none" />
          <circle cx="24" cy="24" r="2" fill="white" opacity="0.2" />
        </svg>
      ),
    },
    kitchen: {
      bg: "from-orange-700 via-amber-600 to-yellow-500",
      label: "Open kitchen",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="10" y="16" width="28" height="20" rx="2" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
          <line x1="10" y1="24" x2="38" y2="24" stroke="white" strokeWidth="1" opacity="0.2" />
        </svg>
      ),
    },
    living: {
      bg: "from-yellow-700 via-amber-600 to-orange-500",
      label: "Living terrace",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="24" width="32" height="12" rx="2" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M12 24 L12 18 Q24 12 36 18 L36 24" stroke="white" strokeWidth="1" opacity="0.2" fill="none" />
        </svg>
      ),
    },
  };

  const config = configs[variant] || configs.detail;

  return (
    <div
      className={`${aspectClass} bg-gradient-to-br ${config.bg} relative overflow-hidden rounded-xl ${className}`}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
        <div className="w-16 h-16 rounded-full border border-white/15 flex items-center justify-center">
          {config.icon}
        </div>
        <span className="text-white/35 text-xs tracking-[0.2em] uppercase text-center">
          {config.label}
        </span>
      </div>
    </div>
  );
}

/* ─── Navigation ─── */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-amber-950/90 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-amber-100 text-lg tracking-wider font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            CASA DEL VIENTO
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "ESPACIOS", id: "spaces" },
              { label: "PISCINA", id: "pool" },
              { label: "UBICACIÓN", id: "location" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-amber-200/50 hover:text-amber-200/80 text-sm tracking-wider transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="px-5 py-2 rounded-full bg-amber-600/20 border border-amber-400/20 text-amber-200/70 hover:bg-amber-600/30 text-sm tracking-wider transition-all"
              style={{ fontFamily: "Georgia, serif" }}
            >
              RESERVA
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-amber-200/60 p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {menuOpen ? (
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-amber-950/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {[
            { label: "Spaces", id: "spaces" },
            { label: "Pool & Garden", id: "pool" },
            { label: "Location", id: "location" },
            { label: "Reserve Now", id: "booking" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-amber-200/60 hover:text-amber-200 text-xl tracking-wider transition-colors"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── IMAGEN DE FONDO ── */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src="/fotos/BACKGROUND-CASA.png"
          alt="Casa del Viento"
          className="w-full h-full object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Capa oscura gradiente para que el texto se lea bien */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Tono cálido encima para mantener la estética ámbar */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/50 via-transparent to-orange-800/30" />
      </div>

      {/* ── BAMBOO DECORATIVO ── */}
      <BambooPattern className="absolute left-4 md:left-12 top-0 h-full w-8 text-amber-200/20 z-10" />
      <BambooPattern className="absolute right-4 md:right-12 top-0 h-full w-8 text-amber-200/10 z-10" />

      {/* ── PARTÍCULAS ── */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/20 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── CONTENIDO ── */}
      <div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{
          opacity: Math.max(0, 1 - scrollY / 600),
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        {/* Badge superior */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300/20 bg-black/20 backdrop-blur-sm mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <SunIcon />
          <span
            className="text-amber-200/80 text-xs tracking-[0.3em] uppercase font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Norte de Perú · Retiro Costero
          </span>
        </div>

        {/* Título */}
        <h1
          className={`transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="block text-amber-100/50 text-lg md:text-xl tracking-[0.2em] uppercase font-light mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Descubre
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[0.9] tracking-tight drop-shadow-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Casa
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl text-amber-200/90 font-light leading-[0.9] tracking-tight mt-2 drop-shadow-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            del Viento
          </span>
        </h1>

        {/* Línea separadora */}
        <div
          className={`mt-8 w-16 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent mx-auto transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Subtítulo */}
        <p
          className={`mt-8 text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "Georgia, serif" }}
        >
          Una casa de bambú donde el desierto se encuentra con el mar.
          <br />
          <span className="text-amber-200/50">
            Respira. Desacelera. Llega.
          </span>
        </p>

        {/* Botones CTA */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={() =>
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-amber-900/30 hover:shadow-amber-600/40 hover:scale-105 cursor-pointer"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Reservar ahora
          </button>
          <button
            onClick={() =>
              document.getElementById("pool")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white/70 hover:text-white text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ver la casa
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 flex flex-col items-center transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">
            Desliza para explorar
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-300/40 to-transparent relative overflow-hidden">
            <div
              className="absolute top-0 w-px h-4 bg-amber-300/80"
              style={{ animation: "bounce 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* ── DATOS RÁPIDOS abajo ── */}
      <div
        className={`absolute bottom-10 left-0 right-0 z-20 transition-all duration-1000 delay-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <div className="flex justify-center gap-8 md:gap-16 px-6">
          {[
            { numero: "5 min", label: "a la playa" },
            { numero: "5", label: "dormitorios" },
            { numero: "10 min", label: "a Huacho" },
          ].map((dato, i) => (
            <div key={i} className="text-center">
              <div
                className="text-white/80 text-lg md:text-2xl font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {dato.numero}
              </div>
              <div className="text-white/30 text-xs tracking-widest uppercase mt-1">
                {dato.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <WaveDecoration className="text-amber-50 w-full h-24" />
      </div>
    </section>
  );
}

/* ─── Intro ─── */

function IntroSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative bg-amber-50 py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <span
              className="text-amber-700/50 text-xs tracking-[0.3em] uppercase font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              LA EXPERIENCIA
            </span>
            <h2
              className="mt-4 text-3xl md:text-4xl lg:text-5xl text-stone-800 font-light leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Donde el desierto
              <br />
              <span className="text-amber-700/70">se encuentra con la calma</span>
            </h2>
            <div className="mt-6 w-12 h-px bg-amber-600/30" />
            <p
              className="mt-6 text-stone-600/80 text-base md:text-lg leading-relaxed font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Ubicada en la costa del norte del Perú, Casa del Viento es una casa rural de bambú 
              diseñada para quienes buscan desconectar en un entorno natural. 
              Cada espacio ha sido construido de forma artesanal, 
              combinando comodidad con una estética auténtica.
            </p>
            <p
              className="mt-4 text-stone-500/70 text-base leading-relaxed font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
             Disfruta de mañanas con luz natural, tardes en la piscina rodeado de áreas verdes 
             y noches tranquilas lejos del ruido. 
             Todo a solo 5 minutos de la playa y 10 minutos de Huacho.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative">
            <img
             src="/fotos/terrace.png"
              alt="Terraza abierta de Casa del Viento"
            className="w-full aspect-square object-cover rounded-xl shadow-2xl shadow-amber-900/10"
              />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-amber-600/20 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-amber-600/20 rounded-br-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pool ─── */

function PoolSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="pool" ref={ref} className="relative bg-stone-100 py-24 md:py-36 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-50/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Título */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="text-teal-700/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            SUMÉRGETE
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl text-stone-800 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Piscina & <span className="text-teal-700/70">Áreas Verdes</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-teal-600/30 mx-auto" />
        </div>

        {/* Video principal */}
        <div
          className={`transition-all duration-1200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <video
            src="/videos/piscina.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover rounded-xl shadow-2xl shadow-teal-900/10"
          />
        </div>

        {/* Grid de 3 */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              tipo: "imagen",
              foto: "/fotos/ccc.png",
              video: "",
              poster: "",
              alt: "Áreas verdes y naturaleza",
              title: "Naturaleza y Tranquilidad",
              desc: "Disfruta de amplias áreas verdes en un entorno privado, ideal para desconectar y descansar.",
            },
            {
              tipo: "video",
              foto: "",
              video: "/videos/jardin.mp4",
              poster: "/fotos/dx.jpg",
              alt: "Casa de bambú artesanal",
              title: "Casa de bambú",
              desc: "Espacios frescos y abiertos con diseño artesanal que conecta con la naturaleza.",
            },
            {
              tipo: "video",
              foto: "",
              video: "/videos/ubicacion.mp4",
              poster: "",
              alt: "Cerca de la playa y Huacho",
              title: "Ubicación estratégica",
              desc: "A solo 5 minutos de la playa y 10 minutos de Huacho, con fácil acceso y total tranquilidad.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${800 + i * 200}ms` }}
            >
              {item.tipo === "video" ? (
                <video
                  src={item.video}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-[4/3] object-cover rounded-xl group-hover:shadow-xl transition-shadow duration-500"
                />
              ) : (
                <img
                  src={item.foto}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover rounded-xl group-hover:shadow-xl transition-shadow duration-500"
                />
              )}

              <h3
                className="mt-4 text-stone-800 text-lg font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-stone-500 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Bamboo ─── */

function BambooSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative bg-amber-900 py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-300 to-transparent"
            style={{ left: `${10 + i * 12}%` }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`order-2 md:order-1 transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
              <div className="grid grid-cols-2 gap-4">
  {/* Foto izquierda */}
  <img
    src="/fotos/bambu.jpg"
    alt="Estructura de bambú"
    className="w-full aspect-[1/2] object-cover rounded-xl shadow-2xl"
  />
  {/* Video derecha */}
  <img
    src="/fotos/bambu2.png"
    className="w-full aspect-[1/2] object-cover rounded-xl mt-8 shadow-2xl"
  />
</div>
          </div>

          <div
            className={`order-1 md:order-2 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <span
              className="text-amber-300/50 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              CONSTRUCCIÓN ARTESANAL
            </span>
            <h2
              className="mt-4 text-3xl md:text-5xl text-amber-50 font-light leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Bambú Natural,
              <br />
              <span className="text-amber-300/70">Comodidad Real</span>
            </h2>
            <div className="mt-6 w-12 h-px bg-amber-400/30" />
            <p
              className="mt-6 text-amber-100/60 text-base md:text-lg leading-relaxed font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Construida con bambú y materiales naturales, 
              los espacios se mantienen frescos, ventilados y 
              cómodos durante todo el día. Un diseño pensado para descansar mejor y disfrutar del entorno.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Bambú", "Ambientes frescos", "Ventilación natural", "Materiales naturales", "Diseño abierto"].map(
                (tag, i) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-full border border-amber-400/20 text-amber-200/60 text-xs tracking-wider transition-all duration-500 ${
                      isInView ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${600 + i * 100}ms`,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Spaces ─── */

function SpacesSection() {
  const { ref, isInView } = useInView();
  const [activeSpace, setActiveSpace] = useState(0);

  const spaces = [
    {
      name: "Sala de Estar",
      variant: "bedroom",
      desc: "Un espacio cómodo y acogedor para relajarte, conversar o disfrutar un momento tranquilo después del día..",
      features: ["Espacio amplio", "Ambiente tranquilo", "Ideal para descansar", "Conexión con áreas exteriores"],
    },
    {
      name: "Cocina",
      variant: "kitchen",
      desc: "Cocina equipada y abierta que conecta con el exterior, perfecta para preparar tus comidas con comodidad y sin perder el contacto con la naturaleza.",
      features: ["Cocina equipada", "Barra / espacio funcional", "Diseño abierto", "Ventilación natural"],
    },
    {
      name: "Comedor",
      variant: "living",
      desc: "Un ambiente ideal para compartir comidas en grupo, con un entorno cálido y relajado.",
      features: ["Espacio para compartir", "Ambiente acogedor", "6 asientos", "Buena iluminación"],
    },
        {
      name: "Baños",
      variant: "living",
      desc: "Baños cómodos y funcionales, diseñados para ofrecer privacidad y practicidad durante tu estadía.",
      features: ["Agua 24/7", "Espacio amplio", "Buena ventilación"],
    },
        {
      name: "Dormitorios",
      variant: "living",
      desc: "Habitaciones pensadas para el descanso, con ventilación natural y un ambiente tranquilo para dormir mejor.",
      features: ["Camarotes King Size", "Colchones Paraíso", "Ambiente silencioso", "Espacios frescos"],
    },
  ];

  return (
    <section id="spaces" ref={ref} className="relative bg-stone-50 py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="text-amber-700/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ESPACIOS DE LA CASA
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl text-stone-800 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ambientes que se <span className="text-amber-700/70">Sienten</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-amber-600/30 mx-auto" />
        </div>

        <div
          className={`flex justify-center flex-wrap gap-3 mb-12 transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          {spaces.map((space, i) => (
            <button
              key={i}
              onClick={() => setActiveSpace(i)}
              className={`px-5 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 cursor-pointer ${
                activeSpace === i
                  ? "bg-amber-800 text-amber-50 shadow-lg shadow-amber-900/20"
                  : "bg-white text-stone-500 hover:bg-amber-50 hover:text-stone-700 border border-stone-200"
              }`}
              style={{ fontFamily: "Georgia, serif" }}
            >
              {space.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <ImagePlaceholder
              variant={spaces[activeSpace].variant}
              aspectClass="aspect-[16/10]"
              className="shadow-2xl shadow-stone-900/10"
            />
          </div>
          <div className="md:col-span-2">
            <h3
              className="text-2xl md:text-3xl text-stone-800 font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {spaces[activeSpace].name}
            </h3>
            <div className="mt-3 w-8 h-px bg-amber-600/30" />
            <p
              className="mt-4 text-stone-600/70 text-base leading-relaxed font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {spaces[activeSpace].desc}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {spaces[activeSpace].features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600/40" />
                  <span
                    className="text-stone-500 text-sm"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Amenities ─── */

function AmenitiesSection() {
  const { ref, isInView } = useInView();

  const amenities = [
    { icon: "🏊", label: "Private Pool" },
    { icon: "🌿", label: "Tropical Garden" },
    { icon: "🛏️", label: "2 Bedrooms" },
    { icon: "🍳", label: "Full Kitchen" },
    { icon: "📶", label: "High-Speed WiFi" },
    { icon: "🅿️", label: "Private Parking" },
    { icon: "🌙", label: "Stargazing Deck" },
    { icon: "🧘", label: "Yoga Space" },
  ];

  return (
    <section ref={ref} className="relative bg-stone-100 py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="text-amber-700/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            TODO LO QUE NECESITAS
          </span>
          <h2
            className="mt-4 text-3xl md:text-4xl text-stone-800 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Comodidades que hacen la{" "}
            <span className="text-amber-700/70">DIFERENCIA</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map((item, i) => (
            <div
              key={i}
              className={`bg-white/70 backdrop-blur-sm rounded-xl p-5 text-center border border-stone-200/50 hover:border-amber-300/40 hover:shadow-md transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 60}ms` }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p
                className="text-stone-600 text-sm"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Location ─── */

function LocationSection() {
  const { ref, isInView } = useInView();
  const beachMin = useCounter(5, 1500, isInView);
  const cityMin = useCounter(10, 1500, isInView);

  return (
    <section
      id="location"
      ref={ref}
      className="relative bg-gradient-to-b from-sky-50 to-amber-50 py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="text-sky-700/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Privileged Location
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl text-stone-800 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
           Entre la <span className="text-sky-700/70">Playa</span>
            <br />
            y la <span className="text-amber-700/70">Ciudad</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-sky-600/30 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-sky-100 shadow-lg transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-start gap-6">
              <div>
                <div
                  className="text-5xl md:text-6xl font-light text-sky-600"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {beachMin}
                </div>
                <div className="text-sky-500/60 text-sm tracking-wider uppercase mt-1">
                  minutos
                </div>
              </div>
              <div>
                <h3
                  className="text-stone-800 text-xl font-light"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  A la playa
                </h3>
                <p className="mt-2 text-stone-500 text-sm leading-relaxed">
                   Disfruta del mar a solo minutos. Perfecto para paseos, atardeceres y días de descanso.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 shadow-lg transition-all duration-1000 delay-500 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-start gap-6">
              <div>
                <div
                  className="text-5xl md:text-6xl font-light text-amber-600"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {cityMin}
                </div>
                <div className="text-amber-500/60 text-sm tracking-wider uppercase mt-1">
                  minutos
                </div>
              </div>
              <div>
                <h3
                  className="text-stone-800 text-xl font-light"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  A Huacho
                </h3>
                <p className="mt-2 text-stone-500 text-sm leading-relaxed">
                  Accede rápidamente a restaurantes, mercados y todo lo necesario durante tu estadía.
                </p>
              </div>
            </div>
          </div>
        </div>

              <div
  className={`transition-all duration-1000 delay-600 ${
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
  }`}
>
  <img
    src="/fotos/playa-ciudad.jpg"
    alt="Playa cercana a Casa del Viento"
    className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
  />
</div>

        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-800 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { icon: "🏄", label: "Surf Spots", sub: "World-class breaks" },
            { icon: "🐟", label: "Fresh Market", sub: "Daily catch & produce" },
            { icon: "🏛️", label: "Ruins & History", sub: "Pre-Inca temples" },
            { icon: "🌅", label: "Desert Sunsets", sub: "Unforgettable views" },
          ].map((item, i) => (
            <div key={i} className="text-center p-4">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4
                className="text-stone-800 text-sm font-medium"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.label}
              </h4>
              <p className="text-stone-400 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */

function TestimonialSection() {
  const { ref, isInView } = useInView();

  const testimonials = [
    {
      text: "Vinimos por un fin de semana y terminamos quedándonos más. La casa, la piscina y la tranquilidad hacen que realmente desconectes.",
      author: "María & Carlos",
      origin: "Los Olivos, Peru",
      foto: "/fotos/perfil1.jpg",
    },
    {
      text: "Se nota el trabajo artesanal en cada detalle. Es un lugar simple, bonito y muy bien pensado para descansar.",
      author: "Sofía R.",
      origin: "Lince, Perú",
      foto: "/fotos/perfil2.jpg",
    },
    {
      text: "Está cerca de todo, pero se siente completamente tranquilo. Ideal para escapar unos días.",
      author: "Jorge M.",
      origin: "Barranco, Perú",
      foto: "/fotos/perfil3.jpg",
    },
  ];

  return (
    <section ref={ref} className="relative bg-amber-800 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,200,100,0.08),transparent_70%)]" />
      <BambooPattern className="absolute left-8 top-0 h-full w-6 text-amber-300/15" />
      <BambooPattern className="absolute right-8 top-0 h-full w-6 text-amber-300/10" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Título */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="text-amber-300/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Lo que dicen nuestros huéspedes
          </span>
          <h2
            className="mt-4 text-3xl md:text-4xl text-amber-50 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Así se vive{" "}
            <span className="text-amber-300/70">Casa del Viento</span>
          </h2>
        </div>

        {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
  {testimonials.map((t, i) => (
    <div
      key={i}
      className={`bg-amber-900/40 backdrop-blur-sm rounded-xl p-6 border border-amber-600/10 flex flex-col cursor-pointer
        transition-all duration-500
        hover:scale-105
        hover:border-amber-400/30
        hover:bg-amber-900/60
        hover:shadow-xl
        hover:shadow-amber-900/30
        ${
          isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      style={{ transitionDelay: `${300 + i * 200}ms` }}
    >
      {/* Comilla */}
      <div
        className="text-amber-400/20 text-5xl leading-none mb-2 text-center"
        style={{ fontFamily: "Georgia, serif" }}
      >
        "
      </div>

      {/* Texto centrado */}
      <p
        className="text-amber-100/60 text-sm leading-relaxed font-light italic text-center flex-1"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {t.text}
      </p>

      {/* Pie del card */}
      <div className="mt-6 pt-4 border-t border-amber-600/10 flex items-center gap-3">
        <img
          src={t.foto}
          alt={t.author}
          className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/20 flex-shrink-0"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div>
          <p
            className="text-amber-200/70 text-sm"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t.author}
          </p>
          <p className="text-amber-300/30 text-xs mt-0.5">
            {t.origin}
          </p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, s) => (
            <svg
              key={s}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#F59E0B"
              opacity="0.7"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}

/* ─── CTA / Booking ─── */

function CTASection() {
  const { ref, isInView } = useInView();
  const [formState, setFormState] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-amber-900/30 border border-amber-600/20 rounded-lg px-4 py-3 text-amber-100 text-sm focus:outline-none focus:border-amber-400/40 transition-colors placeholder-amber-300/20";

  return (
    <section
      id="booking"
      ref={ref}
      className="relative bg-gradient-to-b from-amber-900 via-amber-800 to-stone-900 py-24 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,200,100,0.1),transparent_60%)]" />
      <BambooPattern className="absolute left-4 md:left-16 top-0 h-full w-6 text-amber-300/10" />
      <BambooPattern className="absolute right-4 md:right-16 top-0 h-full w-6 text-amber-300/10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center mb-4">
            <SunIcon />
          </div>
          <span
            className="text-amber-300/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
           Descansa como se debe 
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl text-amber-50 font-light leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Tu experiencia en
            <br />
            <span className="text-amber-300/80">Casa del Viento</span>
            <br />
            comienza aquí
          </h2>
          <div className="mt-4 w-16 h-px bg-amber-400/30 mx-auto" />
          <p
            className="mt-6 text-amber-100/40 text-base md:text-lg max-w-xl mx-auto font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Reserva tu estadía con facilidad. Elige tus fechas, cuántos serán y déjanos tus datos para confirmar tu reserva al instante.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={`bg-amber-950/50 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-amber-600/10 shadow-2xl transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-amber-200/50 text-xs tracking-wider uppercase mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                Día de llegada
                </label>
                <input
                  type="date"
                  value={formState.checkIn}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, checkIn: e.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-amber-200/50 text-xs tracking-wider uppercase mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                Día de salida
                </label>
                <input
                  type="date"
                  value={formState.checkOut}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, checkOut: e.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label
                  className="block text-amber-200/50 text-xs tracking-wider uppercase mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                 Número de huéspedes
                </label>
                <select
                  value={formState.guests}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, guests: e.target.value }))
                  }
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="bg-amber-900 text-amber-100">
                      {n} {n === 1 ? "Huésped" : "Huéspedes"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-amber-200/50 text-xs tracking-wider uppercase mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Full name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-amber-200/50 text-xs tracking-wider uppercase mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="tucorreo@gmail.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-950 rounded-xl py-4 text-base tracking-wider uppercase font-medium transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-500/30 active:scale-[0.98] cursor-pointer"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Solicitar Reserva
            </button>

            <p
              className="mt-4 text-amber-200/25 text-xs text-center"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Nos pondremos en contacto contigo dentro de las próximas 24 horas para confirmar tu reserva y enviarte toda la información necesaria para tu estadía.
            </p>
          </form>
        ) : (
          <div className="bg-amber-950/50 backdrop-blur-md rounded-2xl p-12 border border-amber-600/10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-600/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 16 L14 22 L24 10"
                  stroke="#D4A574"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3
              className="text-amber-50 text-2xl font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Thank you, {formState.name || "traveler"}
            </h3>
            <p
              className="mt-3 text-amber-200/50 text-base font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your reservation request has been received.
              <br />
              We'll send a confirmation to your email within 24 hours.
            </p>
            <p
              className="mt-6 text-amber-300/30 text-sm italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The wind is already preparing to welcome you.
            </p>
          </div>
        )}

        <div
          className={`mt-8 text-center transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-baseline gap-2">
            <span
              className="text-amber-300/40 text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Desde
            </span>
            <span
              className="text-amber-200/70 text-3xl font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              $200
            </span>
            <span
              className="text-amber-300/40 text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            >
              / por día
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function FooterSection() {
  return (
    <footer className="bg-stone-900 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3
          className="text-2xl text-amber-200/60 font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Casa del Viento
        </h3>
        <p
          className="mt-2 text-stone-500 text-sm"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Un refugio de bambú para desconectar en el norte del Perú
        </p>

        <div className="mt-8 w-12 h-px bg-stone-700 mx-auto" />

        <div className="mt-8 flex justify-center gap-8">
          {["Instagram", "WhatsApp", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-stone-500 hover:text-amber-300/60 text-sm transition-colors duration-300"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {link}
            </a>
          ))}
        </div>

        <p className="mt-8 text-stone-700 text-xs">
          © 2026 Casa del Viento. Creado con amor en el norte peruano.
        </p>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ─── */

export default function App() {
  return (
    <div
      className="min-h-screen bg-amber-50 text-stone-800 overflow-x-hidden"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <Navigation />
      <HeroSection />
      <IntroSection />
      <PoolSection />
      <BambooSection />
      <SpacesSection />
      <AmenitiesSection />
      <LocationSection />
      <TestimonialSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}