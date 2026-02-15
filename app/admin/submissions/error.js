"use client";

export default function AdminError({ error, reset }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <span className="text-red-600 text-2xl font-bold">!</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6">{error?.message || "Failed to load submissions."}</p>
      <button
        onClick={reset}
        className="py-2.5 px-6 bg-[#2c3e50] text-white rounded-lg hover:bg-[#34495e] transition-colors duration-200"
      >
        Try again
      </button>
    </div>
  );
}
