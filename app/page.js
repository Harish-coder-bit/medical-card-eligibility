import StateSelector from "@/components/StateSelector";
import states from "@/data/states.json";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Medical Card Eligibility Checker</h1>
      <p className="mt-3 mb-6 text-gray-600">
        Select your state below to check if you are eligible for a medical card.
      </p>
      <StateSelector states={states} />
    </div>
  );
}
