import React from 'react';
import { MapPin, Clock, IndianRupee, Globe, ChevronDown, Sparkles } from 'lucide-react';

const e = React.createElement;

export default function Form({ handlePlanTrip }) {
  return e('div', { className: "w-full max-w-3xl flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out" },
    e('h1', { className: "text-5xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300" }, "Your Personal Travel Agent"),
    e('p', { className: "text-lg md:text-xl text-slate-300 mb-12 max-w-2xl drop-shadow-sm font-light leading-relaxed" }, "Discover the world with smart, personalized itineraries designed by AI in seconds. Tell us where you want to go, and let the magic happen."),

    e('div', { className: "w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl p-6 sm:p-8" },
      e('form', { onSubmit: handlePlanTrip, className: "flex flex-col gap-6" },
        e('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
          e('div', { className: "flex flex-col gap-1.5 text-left" },
            e('label', { htmlFor: "destination", className: "text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider" }, "Destination"),
            e('div', { className: "relative" },
              e('div', { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, e(MapPin, { className: "h-4 w-4 text-slate-400" })),
              e('input', { required: true, type: "text", name: "destination", id: "destination", placeholder: "e.g. Goa, Udaipur", className: "w-full bg-black/20 text-white placeholder-slate-400 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all shadow-inner" })
            )
          ),
          e('div', { className: "flex flex-col gap-1.5 text-left" },
            e('label', { htmlFor: "days", className: "text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider" }, "Duration (Days)"),
            e('div', { className: "relative" },
              e('div', { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, e(Clock, { className: "h-4 w-4 text-slate-400" })),
              e('input', { required: true, type: "number", name: "days", id: "days", min: "1", max: "30", placeholder: "e.g. 5", className: "w-full bg-black/20 text-white placeholder-slate-400 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all shadow-inner" })
            )
          ),
          e('div', { className: "flex flex-col gap-1.5 text-left" },
            e('label', { htmlFor: "budget", className: "text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider" }, "Budget (₹)"),
            e('div', { className: "relative" },
              e('div', { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, e(IndianRupee, { className: "h-4 w-4 text-slate-400" })),
              e('input', { required: true, type: "number", name: "budget", id: "budget", min: "1000", placeholder: "e.g. 50000", className: "w-full bg-black/20 text-white placeholder-slate-400 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all shadow-inner [&::-webkit-inner-spin-button]:appearance-none" })
            )
          ),
          e('div', { className: "flex flex-col gap-1.5 text-left" },
            e('label', { htmlFor: "travelType", className: "text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider" }, "Travel Type"),
            e('div', { className: "relative" },
              e('div', { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, e(Globe, { className: "h-4 w-4 text-slate-400" })),
              e('select', { required: true, defaultValue: "", name: "travelType", id: "travelType", className: "w-full bg-black/20 text-white border border-white/10 rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all appearance-none shadow-inner [&>option]:bg-slate-900" },
                e('option', { value: "", disabled: true }, "Who's going?"),
                e('option', { value: "Solo Adventure" }, "Solo Adventure"),
                e('option', { value: "Couple" }, "Couple"),
                e('option', { value: "Group" }, "Group")
              ),
              e('div', { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" }, e(ChevronDown, { className: "h-4 w-4 text-slate-400" }))
            )
          )
        ),
        e('div', { className: "pt-4" },
          e('button', {
            type: "submit",
            className: "relative w-full overflow-hidden rounded-2xl p-[2px] group hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          },
            e('span', { className: "absolute inset-0 bg-gradient-to-r from-[#6C63FF] via-teal-400 to-[#6C63FF] opacity-80 group-hover:opacity-100 transition-opacity" }),
            e('div', { className: "relative flex items-center justify-center gap-3 bg-slate-950/90 backdrop-blur-2xl group-hover:bg-slate-950/70 text-white py-4 px-6 rounded-[14px] transition-all duration-300 w-full h-full" },
              e(Sparkles, { className: "w-5 h-5 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]" }),
              e('span', { className: "text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200" }, "Plan my trip")
            )
          )
        )
      )
    )
  );
}
