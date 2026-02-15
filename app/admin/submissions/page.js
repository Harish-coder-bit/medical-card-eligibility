"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminSubmissions() {
  const [auth, setAuth] = useState({
    authenticated: false,
    username: "",
    password: "",
    error: "",
    loading: false,
  });

  const [data, setData] = useState({
    submissions: [],
    loading: false,
    error: null,
  });

  async function handleLogin(e) {
    e.preventDefault();
    setAuth((prev) => ({ ...prev, error: "", loading: true }));

    try {
      await axios.post("/api/auth", {
        username: auth.username,
        password: auth.password,
      });

      setAuth((prev) => ({ ...prev, authenticated: true, loading: false }));
      fetchSubmissions();
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to authenticate. Please try again.";
      setAuth((prev) => ({ ...prev, error: errorMessage, loading: false }));
    }
  }

  async function fetchSubmissions() {
    setData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.get("/api/eligibility");
      setData((prev) => ({
        ...prev,
        submissions: response.data.submissions || [],
        loading: false,
      }));
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch submissions";
      setData((prev) => ({ ...prev, error: errorMessage, loading: false }));
    }
  }

  if (!auth.authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-12">
        <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your credentials to view submissions.
        </p>

        {auth.error && (
          <p className="text-red-600 text-sm text-center mb-4">{auth.error}</p>
        )}

        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col gap-1.5 mb-4">
            <label htmlFor="username" className="font-semibold text-sm">Username</label>
            <input
              type="text"
              id="username"
              value={auth.username}
              onChange={(e) => setAuth((prev) => ({ ...prev, username: e.target.value }))}
              required
              className="py-2.5 px-3 text-base border border-gray-300 rounded-lg bg-white transition-colors duration-200 focus:border-[#2c3e50] focus:ring-2 focus:ring-[#2c3e50]/20 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label htmlFor="password" className="font-semibold text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={auth.password}
              onChange={(e) => setAuth((prev) => ({ ...prev, password: e.target.value }))}
              required
              className="py-2.5 px-3 text-base border border-gray-300 rounded-lg bg-white transition-colors duration-200 focus:border-[#2c3e50] focus:ring-2 focus:ring-[#2c3e50]/20 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={auth.loading}
            className={`w-full py-2.5 text-white border-none rounded-lg text-base font-semibold transition-colors duration-200 ${
              auth.loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2c3e50] cursor-pointer hover:bg-[#34495e]"
            }`}
          >
            {auth.loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin - Submissions</h1>
      <p className="mt-2 mb-6 text-gray-500">
        All form submissions are listed below.
      </p>

      {data.loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2c3e50] rounded-full animate-spin" />
          <p className="mt-4 text-gray-500 text-sm">Loading submissions...</p>
        </div>
      ) : data.error ? (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{data.error}</p>
          <button
            onClick={fetchSubmissions}
            className="py-2.5 px-6 bg-[#2c3e50] text-white rounded-lg hover:bg-[#34495e] transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      ) : data.submissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No submissions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-[#2c3e50] text-white font-semibold">Name</th>
                  <th className="text-left py-3 px-4 bg-[#2c3e50] text-white font-semibold">Email</th>
                  <th className="text-left py-3 px-4 bg-[#2c3e50] text-white font-semibold">Age</th>
                  <th className="text-left py-3 px-4 bg-[#2c3e50] text-white font-semibold">Condition</th>
                  <th className="text-left py-3 px-4 bg-[#2c3e50] text-white font-semibold">State</th>
                  <th className="text-left py-3 px-4 bg-[#2c3e50] text-white font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.submissions.map((sub, index) => (
                  <tr
                    key={sub.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="py-2.5 px-4 border-b border-gray-200">{sub.fullName}</td>
                    <td className="py-2.5 px-4 border-b border-gray-200">{sub.email}</td>
                    <td className="py-2.5 px-4 border-b border-gray-200">{sub.age}</td>
                    <td className="py-2.5 px-4 border-b border-gray-200">{sub.medicalCondition}</td>
                    <td className="py-2.5 px-4 border-b border-gray-200">{sub.state}</td>
                    <td className="py-2.5 px-4 border-b border-gray-200">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
