import WorkloadForm from './workload-form/WorkLoadForm';  // Importing the WorkloadForm component


export default function Home() {
  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Workload Input Form</h1>
        <WorkloadForm /> {/* Render the WorkloadForm component here */}
      </div>
    </div>
  );
}
