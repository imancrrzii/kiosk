import { useEffect, useState } from "react";

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(40px, -60px) scale(1.1); }
          66%       { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-50px, 40px) scale(1.08); }
          66%       { transform: translate(60px, -20px) scale(0.92); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(30px, 50px) scale(1.12); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          40%       { transform: translate(-40px, -30px) scale(1.06); }
          80%       { transform: translate(20px, 40px) scale(0.9); }
        }
        .blob { border-radius: 9999px; filter: blur(60px); opacity: 0.55; position: absolute; }
        .blob-1 { animation: blob1 9s ease-in-out infinite; }
        .blob-2 { animation: blob2 11s ease-in-out infinite; }
        .blob-3 { animation: blob3 8s ease-in-out infinite; }
        .blob-4 { animation: blob4 13s ease-in-out infinite; }
      `}</style>

      {/* Blobs */}
      <div className="blob blob-1 bg-cyan-400 w-20 h-20 -top-20 -left-20" />
      <div className="blob blob-2 bg-sky-400 w-22 h-22 top-1/4 -right-16" />
      <div className="blob blob-3 bg-blue-400 w-24 h-24 -bottom-16 left-1/4" />
      <div className="blob blob-4 bg-indigo-400 w-26 h-26 bottom-1/4 right-1/4" />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

export default function KioskWrapper({ children, menuCards = [] }) {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 flex flex-col p-6 font-sans overflow-hidden">
      <style>{`
        @keyframes pulseBadge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
          50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
        }
        .badge-pulse { animation: pulseBadge 2.6s ease-in-out infinite; }
      `}</style>

      {/* Animated blobs */}
      <AnimatedBackground />

      {/* Content - flex-grow untuk mengisi space */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-grow flex flex-col items-center justify-center">
        {/* ── Badge ── */}
        <div
          className={`mb-2 transition-all duration-500 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="badge-pulse inline-flex items-center gap-2 bg-white/80 border border-sky-200 rounded-full px-4 py-1 text-[11px] font-semibold text-sky-600 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
            Kios Layanan Mandiri · Bank Sumsel Babel
          </span>
        </div>

        {/* ── Title ── */}
        <div
          className={`mb-1 text-center transition-all duration-500 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "80ms" }}
        >
          <h1
            className="text-2xl md:text-5xl font-black leading-tight tracking-tight"
            style={{
              background: "linear-gradient(135deg, #8FBAF3, #008DDA, #8FBAF3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BSB-Kiosk Self-Service
          </h1>
        </div>

        {/* ── Subtitle ── */}
        <div
          className={`mb-8 text-center transition-all duration-500 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "160ms" }}
        >
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            Pilih layanan yang Anda butuhkan. Semua transaksi cepat, mudah dan aman tanpa perlu antri di teller.
          </p>
        </div>

        {/* ── Cards or children ── */}
        {menuCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {menuCards.map((card, i) => (
              <MainMenuCard key={i} {...card} colorIndex={i} delay={280 + i * 80} />
            ))}
          </div>
        ) : (
          children
        )}
      </div>

      {/* ── Footer hint - sekarang di luar content wrapper ── */}
      <div
        className={`relative z-0 w-full text-center py-2 transition-all duration-500 ${headerVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "700ms" }}
      > 
        <p className="text-[11px] text-slate-400">
          Butuh bantuan? Hubungi petugas kami
        </p>
      </div>
    </div>
  );
}
