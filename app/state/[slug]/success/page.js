import Link from "next/link";
import states from "@/data/states.json";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const state = states.find((s) => s.slug === slug);
  return {
    title: `Application Submitted - ${state?.name || "Unknown State"}`,
    description: "Your medical card application has been submitted successfully.",
  };
}

export default async function SuccessPage({ params, searchParams }) {
  const { slug } = await params;
  const { name } = await searchParams;
  const state = states.find((s) => s.slug === slug);
  const userName = name || "Applicant";

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">Thank You, {userName}!</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <p className="text-gray-600">
          Your medical card eligibility application for <strong>{state?.name || "your state"}</strong> has
          been submitted successfully.
        </p>
        <p className="text-gray-500 mt-3 text-sm">
          We will review your application and get back to you via email.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Link
          href="/"
          className="inline-block py-3 px-8 bg-[#2c3e50] text-white no-underline rounded-lg font-semibold hover:bg-[#34495e] transition-colors duration-200"
        >
          Back to Home
        </Link>
        <Link
          href="/"
          className="inline-block py-3 px-8 border border-[#2c3e50] text-[#2c3e50] no-underline rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
        >
          Apply for Another State
        </Link>
      </div>
    </div>
  );
}
