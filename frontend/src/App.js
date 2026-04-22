import React, { useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import Form from './components/Form.js';
import Itinerary from './components/Itinerary.js';
import MapView from './components/MapView.js';

const e = React.createElement;

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handlePlanTrip = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const destination = formData.get('destination');
    const days = parseInt(formData.get('days'), 10);
    const budget = parseInt(formData.get('budget'), 10);
    const travelType = formData.get('travelType');

    if (!destination || !days || !budget || !travelType) return;

    setIsGenerating(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, budget, type: travelType })
      });

      if (!response.ok) {
        throw new Error('Failed to generate trip from backend');
      }

      const data = await response.json();

      const parseCost = (str) => {
        if (!str) return 0;
        if (typeof str === 'number') return str;
        
        // Remove commas, then find the FIRST number sequence.
        // This prevents "6000 (4 nights)" from turning into 60004.
        const match = str.replace(/,/g, '').match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const plan = (data.days || []).map((d, index) => {
        const activities = (d.plan || []).map((actString) => {
          const splitPos = actString.indexOf(':');
          const timePart = splitPos !== -1 ? actString.slice(0, splitPos).trim() : "Activity";
          const descPart = splitPos !== -1 ? actString.slice(splitPos + 1).trim() : actString;
          return {
            time: timePart.length > 20 ? "Info" : timePart,
            title: timePart.length > 20 ? "Detail" : timePart,
            desc: descPart,
            location: data.highlights && data.highlights.length > 0 ? data.highlights[Math.floor(Math.random() * data.highlights.length)] : "Local Area",
            cost: "Included"
          };
        });
        return {
          day: index + 1,
          title: d.day || `Day ${index + 1}`,
          activities: activities
        };
      });

      const rawStay = parseCost(data.budget?.stay);
      const rawFood = parseCost(data.budget?.food);
      const rawTransport = parseCost(data.budget?.transport);
      const rawActivities = parseCost(data.budget?.activities);

      const aiTotal = rawStay + rawFood + rawTransport + rawActivities;
      
      let finalStay, finalFood, finalTransport, finalActivities;

      if (aiTotal > 0) {
        // Distribute proportionally if AI provided numbers
        finalStay = Math.round((rawStay / aiTotal) * budget);
        finalFood = Math.round((rawFood / aiTotal) * budget);
        finalTransport = Math.round((rawTransport / aiTotal) * budget);
        finalActivities = budget - finalStay - finalFood - finalTransport; // ensures exact sum
      } else {
        // Fallback default
        finalStay = Math.round(budget * 0.4);
        finalFood = Math.round(budget * 0.3);
        finalTransport = Math.round(budget * 0.15);
        finalActivities = budget - finalStay - finalFood - finalTransport;
      }

      setItinerary({
        destination,
        days,
        budget,
        travelType,
        tips: data.tips || [],
        budgetBreakdown: [
          { category: "Stay", cost: finalStay },
          { category: "Food", cost: finalFood },
          { category: "Transport", cost: finalTransport },
          { category: "Activities", cost: finalActivities },
        ],
        plan: plan
      });
    } catch (error) {
      console.error(error);
      alert('Error fetching from backend.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setItinerary(null);
  };

  const appChildren = [];

  // Background
  appChildren.push(e(MapView, { key: 'map-bg' }));

  // Navbar
  appChildren.push(
    e('nav', { className: "relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-white/5 border-b border-white/10", key: 'nav' },
      e('div', { className: "flex items-center gap-2" },
        e('div', { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-[#6C63FF] to-teal-400 flex items-center justify-center" },
          e(PlaneTakeoff, { className: "w-4 h-4 text-white" })
        ),
        e('span', { className: "font-semibold text-lg tracking-tight" }, "AI Planner")
      ),
      e('div', { className: "hidden md:flex gap-8 text-sm font-medium text-slate-200" },
        e('a', { href: "#", className: "hover:text-white transition-colors" }, "Inspiration"),
        e('a', { href: "#", className: "hover:text-white transition-colors" }, "Features"),
        e('a', { href: "#", className: "hover:text-white transition-colors" }, "FAQ")
      )
    )
  );

  // Main
  const mainChildren = [];

  if (!itinerary && !isGenerating) {
    mainChildren.push(e(Form, { key: 'form', handlePlanTrip }));
  }

  if (isGenerating) {
    mainChildren.push(
      e('div', { className: "flex flex-col items-center justify-center animate-in fade-in duration-500", key: 'loading' },
        e('div', { className: "relative w-24 h-24 mb-8" },
          e('div', { className: "absolute inset-0 border-t-4 border-[#6C63FF] border-solid rounded-full animate-spin" }),
          e('div', { className: "absolute inset-2 border-r-4 border-teal-400 border-solid rounded-full animate-[spin_1.5s_linear_infinite_reverse]" }),
          e('div', { className: "absolute inset-0 flex items-center justify-center" }, e(PlaneTakeoff, { className: "w-8 h-8 text-white animate-pulse" }))
        ),
        e('h2', { className: "text-2xl font-semibold text-white mb-2" }, "Curating Your Journey"),
        e('p', { className: "text-slate-300 max-w-md text-center" }, "Our AI is analyzing thousands of data points to craft the perfect itinerary for your trip...")
      )
    );
  }

  if (itinerary && !isGenerating) {
    mainChildren.push(e(Itinerary, { key: 'itinerary', itinerary, handleReset }));
  }

  appChildren.push(
    e('main', { className: "relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-12 w-full max-w-5xl mx-auto", key: 'main' }, mainChildren)
  );

  return e('div', { className: "min-h-screen font-sans text-white bg-slate-950 relative overflow-hidden flex flex-col theme-custom-wrapper" }, appChildren);
}
