// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function MainMenuCard({ 
//   Icon, 
//   badge1,
//   badge2,
//   title, 
//   desc, 
//   imageUrl,
//   onClick 
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="
//         w-full h-full rounded-3xl overflow-hidden
//         bg-olive-300
//         cursor-pointer transition-all duration-400
//         hover:-translate-y-2 hover:shadow-2xl hover:bg-olive-600
//         group
//         flex flex-col
//         relative
//       "
//     >
//       {/* Icon Background - Animated */}
//       <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none overflow-hidden">
//         <FontAwesomeIcon 
//           icon={Icon} 
//           className="text-olive-400/50 group-hover:text-olive-700/40 transition-all duration-600 group-hover:scale-110 group-hover:rotate-6" 
//           style={{ fontSize: '180px' }}
//         />
//       </div>

//       {/* Header - Fixed Height */}
//       <div className="p-6 pb-4 flex-shrink-0 relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex gap-2">
//             <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-olive-900 group-hover:bg-olive-50 transition-colors">
//               {badge1}
//             </span>
//             <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-olive-900 group-hover:bg-olive-50 transition-colors">
//               {badge2}
//             </span>
//           </div>
//           <div className="w-7 h-7 rounded-full flex items-center justify-center bg-olive-500 group-hover:bg-olive-700 flex-shrink-0 transition-colors">
//             <FontAwesomeIcon icon={Icon} className="text-white text-xs" />
//           </div>
//         </div>
        
//         <h3 className="mb-2 font-black leading-tight group-hover:text-white transition-colors h-[60px] flex items-center text-left">
//           {title}
//         </h3>
        
//         <p className="text-xs text-gray-800 leading-relaxed h-[84px] group-hover:text-white transition-colors text-left">
//           {desc}
//         </p>
//       </div>
//     </button>
//   );
// }

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { badge } from "fontawesome";
import { useState } from "react";

const colorVariants = [
  {
    outer: "bg-gradient-to-br from-cyan-300 via-cyan-200 to-sky-100",
    outerHover: "from-cyan-200 via-cyan-300 to-sky-200",
    icon: "bg-cyan-500",
    iconHover: "bg-cyan-700",
    iconBg: "text-cyan-200/30",
    iconBgHover: "text-cyan-400/40",
    badge: "bg-cyan-100",
    badgeText: "text-cyan-700",
    badgeBorder: "border-cyan-200",
  },
  {
    outer: "bg-gradient-to-br from-sky-300 via-sky-200 to-blue-100",
    outerHover: "from-sky-200 via-sky-300 to-blue-200",
    icon: "bg-sky-500",
    iconHover: "bg-sky-700",
    iconBg: "text-sky-200/30",
    iconBgHover: "text-sky-400/40",
    badge: "bg-sky-100",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
  },
  {
    outer: "bg-gradient-to-br from-sky-400 via-sky-300 to-blue-200",
    outerHover: "from-sky-300 via-sky-400 to-blue-300",
    icon: "bg-sky-600",
    iconHover: "bg-sky-800",
    iconBg: "text-sky-300/30",
    iconBgHover: "text-sky-500/40",
    badge: "bg-sky-200",
    badgeText: "text-sky-600",
    badgeBorder: "border-sky-300",
  },
  {
    outer: "bg-gradient-to-br from-blue-300 via-blue-200 to-indigo-100",
    outerHover: "from-blue-200 via-blue-300 to-indigo-200",
    icon: "bg-blue-500",
    iconHover: "bg-blue-700",
    iconBg: "text-blue-200/30",
    iconBgHover: "text-blue-400/40",
    badge: "bg-blue-100",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
  },
];

export default function MainMenuCard({ 
  Icon, 
  badge1,
  badge2,
  title, 
  desc, 
  colorIndex = 0,
  onClick 
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const colors = colorVariants[colorIndex % colorVariants.length];


  return (
    <button
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className={`
        w-full h-full rounded-[36px] overflow-visible
        ${colors.outer}
        hover:${colors.outerHover}
        cursor-pointer transition-all duration-300
        hover:shadow-3xl hover:scale-105
        group
        p-1
        relative
      `}
    >
      {/* Inner White Card */}
      <div className="w-full h-full bg-white rounded-4xl shadow-lg flex flex-col relative overflow-hidden">
        
        {/* Icon Background - Animated */}
        <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none overflow-hidden">
          <FontAwesomeIcon 
            icon={Icon} 
            className={`${colors.iconBg} group-hover:${colors.iconBgHover} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}
            style={{ fontSize: '180px' }}
          />
        </div>

        {/* Header - Fixed Height */}
        <div className="py-6 px-5 flex-shrink-0 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <span className={`px-3 py-1 border ${colors.badgeBorder} rounded-full text-[11px] font-semibold ${colors.badge} text-gray-900 transition-all`}>
                {badge1}
              </span>
              <span className={`px-3 py-1 border ${colors.badgeBorder} rounded-full text-[11px] font-semibold ${colors.badge} text-gray-900 transition-all`}>
                {badge2}
              </span>
            </div>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${colors.icon} group-hover:${colors.iconHover} flex-shrink-0 transition-all group-hover:scale-110`}>
              <FontAwesomeIcon icon={Icon} className="text-white text-xs" />
            </div>
          </div>
          
          <h3 className="mb-2 font-black leading-tight text-gray-800 group-hover:text-gray-900 transition-colors h-[60px] flex items-center text-left">
            {title}
          </h3>
          
          <p className="text-xs text-gray-500 leading-relaxed h-[84px] transition-colors text-left">
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}