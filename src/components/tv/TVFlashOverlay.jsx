import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";

export default function TVFlashOverlay({ flash, onClose }) {
  if (!flash) return null;
  
  const queueTypeConfig = QUEUE_TYPE_CONFIG[flash.queue_type];
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(255, 255, 255, 0.97)" }}
    >
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }
          70% { box-shadow: 0 0 0 50px rgba(14, 165, 233, 0); }
        }
      `}</style>
      
      <div
        className="text-center"
        style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {queueTypeConfig && (
          <div className="flex items-center justify-center gap-3 text-base tracking-widest text-sky-600 uppercase mb-3 font-semibold">
            {queueTypeConfig.icon && (
              <FontAwesomeIcon 
                icon={queueTypeConfig.icon} 
                className="text-xl text-sky-500" 
              />
            )}
            <span>{queueTypeConfig.label}</span>
          </div>
        )}
        
        <div className="text-xl tracking-[0.4em] text-gray-500 uppercase mb-6 font-medium">
          Silakan menuju
        </div>
        
        <div
          className="mx-auto rounded-full flex items-center justify-center mb-6"
          style={{
            width: 250,
            height: 250,
            background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
            border: "4px solid #0ea5e9",
            animation: "ringPulse 1.5s infinite",
          }}
        >
          <span
            className="text-[84px] font-black leading-none"
            style={{
              background: "linear-gradient(135deg, #0284c7, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {flash.queue_number}
          </span>
        </div>
        
        <div className="text-4xl font-bold text-sky-700 tracking-wide">
          {flash.counter_name}
        </div>
      </div>
    </div>
  );
}