const submissions = [];

export function createSubmission(data) {
  const submission = {
    id: Date.now().toString(),
    fullName: data.fullName,
    email: data.email,
    age: data.age,
    medicalCondition: data.medicalCondition,
    state: data.state,
    stateSlug: data.stateSlug,
    submittedAt: new Date().toISOString(),
  };
  submissions.push(submission);
  return submission;
}

export function getAllSubmissions() {
  return submissions;
}
