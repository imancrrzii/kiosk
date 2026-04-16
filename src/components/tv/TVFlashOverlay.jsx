import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";

export default function TVFlashOverlay({ flash, onClose }) {
  if (!flash) return null;
  
  const queueTypeConfig = QUEUE_TYPE_CONFIG[flash.queue_type];
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
    >
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.6); }
          70% { box-shadow: 0 0 0 40px rgba(59,130,246,0); }
        }
      `}</style>
      
      <div
        className="text-center"
        style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* Queue Type Label */}
        {queueTypeConfig && (
          <div className="flex items-center justify-center gap-3 text-base tracking-widest text-slate-400 uppercase mb-3">
            {queueTypeConfig.icon && (
              <FontAwesomeIcon 
                icon={queueTypeConfig.icon} 
                className="text-xl" 
              />
            )}
            <span>{queueTypeConfig.label}</span>
          </div>
        )}
        
        {/* "Silakan menuju" */}
        <div className="text-xl tracking-[0.4em] text-slate-500 uppercase mb-6">
          Silakan menuju
        </div>
        
        {/* Queue Number with Ring Animation */}
        <div
          className="mx-auto rounded-full flex items-center justify-center mb-6"
          style={{
            width: 200,
            height: 200,
            background: "rgba(59,130,246,0.1)",
            border: "2px solid rgba(59,130,246,0.3)",
            animation: "ringPulse 1.5s infinite",
          }}
        >
          <span
            className="text-[90px] font-black leading-none"
            style={{
              background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {flash.queue_number}
          </span>
        </div>
        
        {/* Counter Name */}
        <div className="text-4xl font-bold text-white tracking-wide">
          {flash.counter_name}
        </div>
      </div>
    </div>
  );
}