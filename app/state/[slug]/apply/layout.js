import states from "@/data/states.json";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const state = states.find((s) => s.slug === slug);
  return {
    title: `Apply - ${state?.name || "Unknown State"} Medical Card`,
    description: `Submit your medical card eligibility application for ${state?.name || "your state"}.`,
  };
}

export default function ApplyLayout({ children }) {
  return children;
}
