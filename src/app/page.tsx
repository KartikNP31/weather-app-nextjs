"use client";

import Weather from "@/components/Weather";

export default function Home() {
  return (

    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-400 to-blue-400 p-6">
      {/* weather components */}
      <Weather />
    </div>
  );
}
