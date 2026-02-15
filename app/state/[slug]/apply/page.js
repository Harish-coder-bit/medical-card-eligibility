"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import FormInput from "@/components/FormInput";
import states from "@/data/states.json";
import { eligibilityFormSchema } from "@/schemas/eligibility";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const state = states.find((s) => s.slug === params.slug);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    medicalCondition: "",
    agreePrivacy: false,
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!state) {
    return <p>State not found.</p>;
  }

  function handleChange(field) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const parsed = eligibilityFormSchema.safeParse({
      fullName: formData.fullName,
      email: formData.email,
      age: formData.age === "" ? undefined : Number(formData.age),
      medicalCondition: formData.medicalCondition,
      agreePrivacy: formData.agreePrivacy,
    });

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      await axios.post("/api/eligibility", {
        fullName: formData.fullName,
        email: formData.email,
        age: Number(formData.age),
        medicalCondition: formData.medicalCondition,
        agreePrivacy: formData.agreePrivacy,
        state: state.name,
        stateSlug: state.slug,
      });

      router.push(`/state/${state.slug}/success?name=${encodeURIComponent(formData.fullName)}`);
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.fieldErrors) {
        setFieldErrors(errorData.fieldErrors);
      }
      setError(errorData?.error || "Failed to submit. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Link
        href={`/state/${state.slug}`}
        className="inline-flex items-center text-[#2c3e50] text-sm no-underline hover:underline mb-4"
      >
        &larr; Back to {state.name}
      </Link>

      <h1 className="text-3xl font-bold">Apply for Medical Card - {state.name}</h1>
      <p className="mt-2 mb-6 text-gray-500">
        Fill out the form below to check your eligibility.
      </p>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="max-w-[500px]" noValidate>
        <FormInput
          label="Full Name"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          error={fieldErrors.fullName?.[0]}
          required
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          error={fieldErrors.email?.[0]}
          required
        />
        <FormInput
          label="Age"
          id="age"
          type="number"
          value={formData.age}
          onChange={handleChange("age")}
          error={fieldErrors.age?.[0]}
          required
          min="1"
          max="120"
        />
        <FormInput
          label="Medical Condition"
          id="medicalCondition"
          type="textarea"
          value={formData.medicalCondition}
          onChange={handleChange("medicalCondition")}
          error={fieldErrors.medicalCondition?.[0]}
          required
        />
        <FormInput
          label="I agree to the privacy policy"
          id="agreePrivacy"
          type="checkbox"
          value={formData.agreePrivacy}
          onChange={handleChange("agreePrivacy")}
          error={fieldErrors.agreePrivacy?.[0]}
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className={`mt-3 py-2.5 px-6 text-white border-none rounded-lg text-base font-semibold transition-colors duration-200 ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2c3e50] cursor-pointer hover:bg-[#34495e]"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
