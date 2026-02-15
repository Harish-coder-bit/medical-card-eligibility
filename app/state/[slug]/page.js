import Link from "next/link";
import { notFound } from "next/navigation";
import states from "@/data/states.json";

export const revalidate = 60;

export function generateStaticParams() {
  return states.map((state) => ({
    slug: state.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const state = states.find((s) => s.slug === slug);
  if (!state) {
    return { title: "State Not Found" };
  }
  return {
    title: `${state.name} - Medical Card Eligibility`,
    description: `Check medical card eligibility requirements for ${state.name}. Age requirement: ${state.ageRequirement}+, Card fee: $${state.cardFee}.`,
  };
}

export default async function StatePage({ params }) {
  const { slug } = await params;
  const state = states.find((s) => s.slug === slug);

  if (!state) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center text-[#2c3e50] text-sm no-underline hover:underline mb-4"
      >
        &larr; Back to States
      </Link>

      <h1 className="text-3xl font-bold">{state.name}</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Age Requirement</p>
            <p className="text-2xl font-bold text-[#2c3e50]">{state.ageRequirement}+</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Card Fee</p>
            <p className="text-2xl font-bold text-[#2c3e50]">${state.cardFee}</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{state.description}</p>
      </div>

      <Link
        href={`/state/${state.slug}/apply`}
        className="inline-block py-3 px-8 bg-[#2c3e50] text-white no-underline rounded-lg text-base font-semibold hover:bg-[#34495e] transition-colors duration-200"
      >
        Start Evaluation
      </Link>
    </div>
  );
}
