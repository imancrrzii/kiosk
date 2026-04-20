import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShield } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import NotificationContainer from "@/components/ui/NotificationContainer";
import DashbiardAnimate from "../assets/animation/AnimatedDashboards.json";
import LottieLib from "lottie-react";
import Logo from "../assets/images/logo-bsb.png";
import FlowerBatik from "../assets/images/flowerbatik.svg";
import CheckBox from "@/components/ui/CheckBox";

const Lottie = LottieLib.default ?? LottieLib;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();
  const {
    notifications,
    show: showNotification,
    hide: hideNotification,
  } = useNotification();

  // Remember Me state — initialize from localStorage
  const savedCredentials = JSON.parse(
    localStorage.getItem("rememberedUser") || "null",
  );
  const [rememberMe, setRememberMe] = useState(!!savedCredentials);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: savedCredentials?.username || "",
      password: savedCredentials?.password || "",
    },
  });

  const onSubmit = async (data) => {
    // Save or clear credentials based on Remember Me checkbox
    if (rememberMe) {
      localStorage.setItem(
        "rememberedUser",
        JSON.stringify({ username: data.username, password: data.password }),
      );
    } else {
      localStorage.removeItem("rememberedUser");
    }

    const result = await login(data.username, data.password);

    if (result.success) {
      showNotification(`Selamat datang, ${result.user.name}!`, "success");
      switch (result.user.role) {
        case "ADMIN":
          navigate("/dashboard", { replace: true });
          break;
        case "TELLER":
        case "CS":
          navigate("/counter", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } else {
      showNotification(result.error, "error");
      setError("password", {
        type: "manual",
        message: result.error,
      });
    }
  };

  // ── 3D Mouse Tracking ──
  const panelRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    // Normalize to -1 … +1 from center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Helper: build translate style for a given parallax depth
  const parallax = (depth) => ({
    transform: `translate(${tilt.x * depth}px, ${tilt.y * depth}px)`,
    transition: "transform 0.3s ease-out",
  });

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2 font-sans">
      {/* Left illustration panel — hidden on mobile */}
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:flex p-10 items-center justify-center glass-shimmer"
        style={{
          background:
            "linear-gradient(135deg, #0284c7, #0369a1, #0ea5e9, #0284c7, #0369a1)",
          backgroundSize: "300% 300%",
          perspective: "1200px",
        }}
      >
        

        {/* Glass sphere — top left (depth: 30) */}
        <div
          className="absolute top-[8%] left-[6%] w-20 h-20 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(255,255,255,0.05) 70%, transparent)",
            boxShadow:
              "inset 0 -4px 12px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.08)",
            animation: "float-y 6s ease-in-out infinite",
            ...parallax(30),
          }}
        />

        {/* ── Flower Batik Ornament — top right ── */}
        <img
          src={FlowerBatik}
          alt=""
          className="absolute top-[6%] right-[6%] w-28 h-28 opacity-70 pointer-events-none"
          style={{
            animation: "hex-spin 30s linear infinite",
            ...parallax(20),
          }}
        />

        {/* ── Flower Batik Ornament — bottom left ── */}
        <img
          src={FlowerBatik}
          alt=""
          className="absolute bottom-[6%] left-[5%] w-36 h-36 opacity-70 pointer-events-none"
          style={{
            animation: "hex-spin 40s linear reverse infinite",
            ...parallax(14),
          }}
        />

        {/* ── Flower Batik Ornament — bottom right ── */}
        <img
          src={FlowerBatik}
          alt=""
          className="absolute bottom-[20%] right-[0%] w-40 h-40 opacity-70 pointer-events-none"
          style={{
            animation: "hex-spin 35s linear infinite",
            ...parallax(18),
          }}
        />

        {/* Small glass sphere — bottom right (depth: 15) */}
        <div
          className="absolute bottom-[15%] right-[8%] w-12 h-12 rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.08) 65%, transparent)",
            boxShadow:
              "inset 0 -3px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
            animation: "float-y 5s ease-in-out 1s infinite",
            ...parallax(15),
          }}
        />

        {/* 3D Cube wireframe — bottom left (depth: 25) */}
        <div
          className="absolute bottom-[10%] left-[8%] w-16 h-16 opacity-20"
          style={{
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "4px",
            transformStyle: "preserve-3d",
            transform: `translate(${tilt.x * 25}px, ${tilt.y * 25}px) rotateX(${tilt.y * 30}deg) rotateY(${tilt.x * 30}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className="absolute inset-1"
            style={{
              border: "1.5px solid rgba(255,255,255,0.3)",
              borderRadius: "3px",
              transform: "translateZ(12px) scale(0.8)",
            }}
          />
        </div>

        {/* Dots grid pattern — center top (depth: 10) */}
        <div
          className="absolute top-[5%] left-1/2 opacity-15"
          style={{
            width: "120px",
            height: "60px",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            transform: `translate(calc(-50% + ${tilt.x * 10}px), ${tilt.y * 10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* Floating ring — mid left (depth: 18) */}
        <div
          className="absolute top-[45%] left-[3%] w-10 h-10 rounded-full opacity-25"
          style={{
            border: "2px solid rgba(255,255,255,0.5)",
            ...parallax(18),
          }}
        />

        {/* Tiny sphere cluster — bottom center (depth: 12) */}
        <div
          className="absolute bottom-[6%] left-1/2 flex gap-3 opacity-25"
          style={{
            transform: `translate(calc(-50% + ${tilt.x * 12}px), ${tilt.y * 12}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {[8, 5, 10, 6].map((size, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), transparent 70%)",
                animation: `float-y ${4 + i}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Falling FlowerBatik Particles ── */}
        {Array.from({ length: 50 }).map((_, i) => {
          const size = 10 + ((i * 7) % 25);
          const left = 5 + ((i * 8.3) % 85);
          const duration = 10 + ((i * 2.1) % 8);
          const delay = (i * 1.2) % 6;
          const opacity = 0.12 + (i % 10) * 0.06;
          return (
            <img
              key={`batik-particle-${i}`}
              src={FlowerBatik}
              alt=""
              className="absolute pointer-events-none"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `-5%`,
                opacity,
                animation: `snowfall-batik ${duration}s linear ${delay}s infinite`,
                zIndex: 3,
              }}
            />
          );
        })}

        {/* ── 3D Hexagon — top center-right ── */}
        <div
          className="absolute top-[20%] right-[25%] opacity-20"
          style={{
            width: "40px",
            height: "46px",
            border: "2px solid rgba(255,255,255,0.4)",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            transformStyle: "preserve-3d",
            transform: `translate(${tilt.x * 22}px, ${tilt.y * 22}px) rotateY(${tilt.x * 20}deg) rotateX(${tilt.y * 20}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255,255,255,0.08)",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              animation: "hex-spin 15s linear infinite",
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        {/* ── Small hexagon — bottom center-left ── */}
        <div
          className="absolute bottom-[25%] left-[15%] opacity-15"
          style={{
            width: "28px",
            height: "32px",
            background: "rgba(255,255,255,0.1)",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: "hex-spin 20s linear reverse infinite",
            transform: `translate(${tilt.x * 16}px, ${tilt.y * 16}px)`,
            transition: "transform 0.3s ease-out",
            transformStyle: "preserve-3d",
          }}
        />

        {/* ── Pulsing glow orb — mid right ── */}
        <div
          className="absolute top-[55%] right-[5%] w-24 h-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite",
            transform: `translate(${tilt.x * 12}px, ${tilt.y * 12}px)`,
            transition: "transform 0.3s ease-out",
            filter: "blur(8px)",
          }}
        />

        {/* ── Pulsing glow orb — top left ── */}
        <div
          className="absolute top-[30%] left-[12%] w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.35), transparent 70%)",
            animation: "pulse-glow 5s ease-in-out 1.5s infinite",
            transform: `translate(${tilt.x * 8}px, ${tilt.y * 8}px)`,
            transition: "transform 0.3s ease-out",
            filter: "blur(6px)",
          }}
        />

        {/* ── Floating 3D diamond ── */}
        <div
          className="absolute top-[65%] right-[18%] opacity-20"
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid rgba(255,255,255,0.4)",
            transformStyle: "preserve-3d",
            transform: `translate(${tilt.x * 28}px, ${tilt.y * 28}px) rotate(45deg) rotateX(${tilt.y * 35}deg) rotateY(${tilt.x * 35}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* ── Cross/plus shape ── */}
        <div
          className="absolute bottom-[35%] right-[3%] opacity-15"
          style={{
            width: "18px",
            height: "18px",
            transform: `translate(${tilt.x * 14}px, ${tilt.y * 14}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "7px",
              left: 0,
              width: "18px",
              height: "3px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "7px",
              width: "3px",
              height: "18px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* ── Main Card with 3D tilt ── */}
        <div
          className="bg-white/20 backdrop-blur-sm border-2 border-white/30 flex flex-col items-center justify-center p-6 xl:p-10 rounded-4xl max-w-lg w-full z-10"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 6}deg)`,
            boxShadow: `${-tilt.x * 15}px ${tilt.y * 15}px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset`,
            transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
          }}
        >
          <div
            className="w-60 h-60 xl:w-80 xl:h-80"
            style={{
              transform: `translateZ(40px) translate(${tilt.x * 5}px, ${tilt.y * 5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <Lottie animationData={DashbiardAnimate} loop={true} />
          </div>
          <h2
            className="text-white text-center sm:text-base md:text-lg lg:text-3xl mt-4 drop-shadow-md leading-tight"
            style={{
              transform: `translateZ(25px) translate(${tilt.x * 3}px, ${tilt.y * 3}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            Sistem Layanan & Monitoring Antrian Nasabah
          </h2>
          <p 
          className="text-white text-center sm:text-md md:text-md lg:text-md mt-4 drop-shadow-md leading-tight"
          style={{
            transform: `translateZ(25px) translate(${tilt.x * 3}px, ${tilt.y * 3}px)`,
            transition: "transform 0.3s ease-out",
          }}
          >
            Platform terintegrasi untuk memantau, mengelola, dan meningkatkan
            kualitas layanan antrian nasabah secara real-time.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      {/* ── Subtle Flower Batik on form panel ── */}
      <img
        src={FlowerBatik}
        alt=""
        className="absolute bottom-4 right-4 w-24 h-24 opacity-[0.04] pointer-events-none lg:block hidden"
        style={{ animation: "hex-spin 50s linear infinite" }}
      />
      <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-8">
        <NotificationContainer
          notifications={notifications}
          onClose={hideNotification}
        />

        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src={Logo} alt="Logo" className="h-10 sm:h-12 mx-auto mb-3" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-4 sm:p-5 rounded-2xl border-2 border-gray-100 space-y-4"
          >
            <div>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username harus diisi" }}
                render={({ field }) => (
                  <InputField
                    label="Username"
                    placeholder="Masukkan Username Anda"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.username?.message}
                    showHelperText={!!errors.username}
                    helperText={errors.username?.message}
                    showLeftIcon={false}
                    showRightIcon={false}
                    disabled={isLoading}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password harus diisi" }}
                render={({ field }) => (
                  <InputField
                    label="Password"
                    placeholder="Masukkan Password Anda"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.password?.message}
                    isPassword={true}
                    showHelperText={!!errors.password}
                    helperText={errors.password?.message}
                    showLeftIcon={false}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
            <CheckBox
              label="Ingat Saya"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              size="medium"
            />

            <Button
              type="submit"
              disabled={isLoading}
              size="large"
              variant="primary"
              label={isLoading ? "Memverifikasi…" : "Masuk"}
              className="w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
