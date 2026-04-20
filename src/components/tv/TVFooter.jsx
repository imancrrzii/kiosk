import { faClock, faGlobe, faMapPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TVFooter = ({ time }) => {
  return (
    <div>
      {/* Footer */}
      <div
        className="flex items-center gap-6 px-8"
        style={{
          background: "linear-gradient(to right, #f8fafc, #f1f5f9)",
          borderTop: "1px solid #e2e8f0",
          height: 32,
        }}
      >
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faMapPin} className="text-sky-500" size="xs" />
          <span className="text-[10px] text-gray-500">Palembang, Sumatera Selatan</span>
        </div>
        <div style={{ width: 1, height: 12, background: "#e2e8f0" }} />
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faClock} className="text-sky-500" size="xs" />
          <span className="text-[10px] text-gray-500">
            Operasional: <strong className="text-gray-700">Senin–Jumat 08:00–16:00 WIB</strong>
          </span>
        </div>
        <div style={{ width: 1, height: 12, background: "#e2e8f0" }} />
        <div className="flex items-center gap-1.5">
        <FontAwesomeIcon icon={faPhone} className="text-sky-500" size="xs" />
        <span className="text-[10px] text-gray-500">
          <strong className="text-gray-700">1500-XXX</strong>
        </span>
        </div>

        <div style={{ width: 1, height: 12, background: "#e2e8f0" }} />
        <div className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faGlobe} className="text-sky-500" size="xs" />
            <span className="text-[10px] text-gray-500">www.bank.co.id</span>
        </div>
        
        <span className="ml-auto text-[9px] text-gray-400">v2.0 · Update {time.toLocaleTimeString("id-ID")}</span>
      </div>
    </div>
  );
};

export default TVFooter;
