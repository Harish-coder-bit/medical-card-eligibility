"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StateSelector({ states }) {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleCheck() {
    if (!selected) {
      setError("Please select a state first.");
      return;
    }
    setError("");
    router.push(`/state/${selected}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md">
      <label htmlFor="state-select" className="block font-semibold text-lg mb-3">
        Select your state:
      </label>
      <select
        id="state-select"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          if (error) setError("");
        }}
        className={`w-full p-3 text-base border rounded-lg bg-white transition-colors duration-200 focus:border-[#2c3e50] focus:ring-2 focus:ring-[#2c3e50]/20 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">-- Choose a state --</option>
        {states.map((state) => (
          <option key={state.slug} value={state.slug}>
            {state.name} ({state.abbreviation})
          </option>
        ))}
      </select>
      {error && <span className="text-red-600 text-xs mt-2 block">{error}</span>}
      <button
        onClick={handleCheck}
        className="w-full mt-4 py-3 px-5 bg-[#2c3e50] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-[#34495e] transition-colors duration-200"
      >
        Check Eligibility
      </button>
    </div>
  );
}
