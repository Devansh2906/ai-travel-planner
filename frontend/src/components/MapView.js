import React from 'react';

const e = React.createElement;

export default function MapView() {
  const bgUrl = "https://images.unsplash.com/photo-1712769813025-406fc136724a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc2NlbmljJTIwbW91bnRhaW4lMjBsYWtlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NjgzMDY2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  return e('div', { className: "fixed inset-0 z-0" },
    e('img', { src: bgUrl, alt: "Scenic Mountain Lake", className: "w-full h-full object-cover opacity-80" }),
    e('div', { className: "absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/90 z-10" })
  );
}
