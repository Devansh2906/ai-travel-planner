import React from 'react';
import { MapPin, Clock, IndianRupee, Globe, RefreshCcw, Navigation, Wallet, Info, Sparkles } from 'lucide-react';

const e = React.createElement;

export default function Itinerary({ itinerary, handleReset }) {
  const resultHeader = e('div', { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl w-full" },
    e('div', null,
      e('h2', { className: "text-3xl font-bold mb-2 tracking-tight text-white flex items-center gap-2" }, e(MapPin, { className: "text-[#6C63FF] w-7 h-7" }), itinerary.destination),
      e('div', { className: "flex flex-wrap items-center gap-3 text-sm text-slate-300 font-medium" },
        e('span', { className: "flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-md border border-white/5" }, e(Clock, { className: "w-3.5 h-3.5 text-teal-400" }), `${itinerary.days} Days`),
        e('span', { className: "flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-md border border-white/5" }, e(IndianRupee, { className: "w-3.5 h-3.5 text-teal-400" }), `₹${itinerary.budget.toLocaleString()}`),
        e('span', { className: "flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-md border border-white/5" }, e(Globe, { className: "w-3.5 h-3.5 text-teal-400" }), itinerary.travelType)
      )
    ),
    e('button', { onClick: handleReset, className: "flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium bg-black/20" }, e(RefreshCcw, { className: "w-4 h-4 text-teal-400" }), "Plan Another")
  );

  const daysPlan = e('div', { className: "flex flex-col gap-6 w-full" },
    (itinerary.plan || []).map((day, idx) => (
      e('div', { key: idx, className: "bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden flex flex-col" },
        e('div', { className: "bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-3" },
          e('div', { className: "w-10 h-10 rounded-full bg-[#6C63FF]/20 flex items-center justify-center border border-[#6C63FF]/30" },
            e('span', { className: "font-bold text-[#6C63FF]" }, `D${day.day}`)
          ),
          e('h3', { className: "text-xl font-semibold text-white" }, day.title)
        ),
        e('div', { className: "p-6 flex flex-col gap-6" },
          (day.activities || []).map((act, actIdx) => (
            e('div', { key: actIdx, className: "relative flex gap-4 pl-4 md:pl-0 group" },
              e('div', { className: "hidden md:flex flex-col items-center mt-1" },
                e('div', { className: "w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] z-10" }),
                actIdx !== day.activities.length - 1 ? e('div', { className: "w-0.5 h-full bg-white/10 mt-2 absolute top-3 bottom-0 left-[5.5px]" }) : null
              ),
              e('div', { className: "flex-1 bg-black/20 hover:bg-black/30 transition-colors border border-white/5 rounded-xl p-5 md:ml-4 group-hover:border-white/10" },
                e('div', { className: "flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3" },
                  e('div', null,
                    e('span', { className: "text-teal-300 text-xs font-semibold tracking-wider uppercase mb-1.5 block flex items-center gap-1.5" }, e(Clock, { className: "w-3 h-3" }), act.time),
                    e('h4', { className: "text-lg font-medium text-white" }, act.title)
                  ),
                  e('span', { className: "inline-flex items-center gap-1 text-xs font-medium bg-[#6C63FF]/20 text-[#c2bfff] border border-[#6C63FF]/30 px-2.5 py-1.5 rounded-md whitespace-nowrap self-start shadow-sm" },
                    act.cost
                  )
                ),
                e('p', { className: "text-slate-300 text-sm mb-4 leading-relaxed" }, act.desc),
                e('div', { className: "flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-auto bg-black/20 w-fit px-2.5 py-1.5 rounded-md" },
                  e(Navigation, { className: "w-3 h-3 text-teal-400" }), act.location
                )
              )
            )
          ))
        )
      )
    ))
  );

  const budgetBreakdown = e('div', { className: "bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden flex flex-col w-full mt-2" },
    e('div', { className: "bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-3" },
      e('div', { className: "w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center border border-teal-400/30" },
        e(Wallet, { className: "w-5 h-5 text-teal-400" })
      ),
      e('h3', { className: "text-xl font-semibold text-white" }, "Budget Breakdown")
    ),
    e('div', { className: "p-6" },
      e('div', { className: "w-full border border-white/10 rounded-xl overflow-hidden bg-black/20" },
        e('table', { className: "w-full text-left text-sm text-slate-300" },
          e('thead', { className: "bg-white/5 text-xs uppercase font-semibold text-slate-400 border-b border-white/10" },
            e('tr', null,
              e('th', { className: "px-6 py-4" }, "Category"),
              e('th', { className: "px-6 py-4 text-right" }, "Cost")
            )
          ),
          e('tbody', { className: "divide-y divide-white/5" },
            (itinerary.budgetBreakdown || []).map((item, idx) => (
              e('tr', { key: idx, className: "hover:bg-white/5 transition-colors" },
                e('td', { className: "px-6 py-4 font-medium text-white flex items-center gap-3" },
                  e('div', { className: "w-2 h-2 rounded-full bg-[#6C63FF]" }),
                  item.category
                ),
                e('td', { className: "px-6 py-4 text-right tabular-nums text-teal-300 font-medium" }, `₹${item.cost.toLocaleString()}`)
              )
            ))
          ),
          e('tfoot', { className: "bg-white/5 border-t border-white/10 font-semibold text-white" },
            e('tr', null,
              e('td', { className: "px-6 py-4" }, "Total Estimated Budget"),
              e('td', { className: "px-6 py-4 text-right text-lg text-teal-400 tabular-nums" }, `₹${itinerary.budget.toLocaleString()}`)
            )
          )
        )
      )
    )
  );

  const travelTips = e('div', { className: "bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden flex flex-col w-full mt-2" },
    e('div', { className: "bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-3" },
      e('div', { className: "w-10 h-10 rounded-full bg-[#6C63FF]/20 flex items-center justify-center border border-[#6C63FF]/30" },
        e(Info, { className: "w-5 h-5 text-[#6C63FF]" })
      ),
      e('h3', { className: "text-xl font-semibold text-white" }, "Travel Tips")
    ),
    e('div', { className: "p-6" },
      e('ul', { className: "flex flex-col gap-4" },
        (itinerary.tips && itinerary.tips.length > 0 ? itinerary.tips : [
          "Pack smart by rolling your clothes to save space and checking the local weather forecast a few days before departure.",
          "Keep small amounts of local currency handy for local transport and street food vendors where digital payments might not be accepted.",
          "Stay hydrated and be mindful of local customs, especially when visiting religious or historical landmarks."
        ]).map((tip, idx) => (
          e('li', { key: idx, className: "flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-white/5" },
            e(Sparkles, { className: "w-5 h-5 text-teal-400 mt-0.5 shrink-0" }),
            e('p', { className: "text-slate-300 text-sm leading-relaxed" }, tip)
          )
        ))
      )
    )
  );

  return e('div', { className: "w-full max-w-4xl flex flex-col gap-8 animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out" },
    resultHeader,
    daysPlan,
    budgetBreakdown,
    travelTips,
    e('div', { className: "flex justify-center mt-4 mb-8 text-slate-400 flex-col items-center gap-2" },
      e(Sparkles, { className: "w-5 h-5 text-teal-400" }),
      e('p', { className: "text-sm" }, "End of itinerary")
    )
  );
}
