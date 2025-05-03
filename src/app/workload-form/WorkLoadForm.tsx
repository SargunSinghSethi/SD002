'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

type FormData = {
  modelType: string;
  datasetSize: string;
  purpose: string;
  budget: string;
  preferredRegion: string;
  duration: string;
  instancePreferences: string;
};

export default function WorkLoadForm() {
  const [formData, setFormData] = useState<FormData>({
    modelType: '',
    datasetSize: '',
    purpose: '',
    budget: '',
    preferredRegion: '',
    duration: '',
    instancePreferences: '',
  });

  const [result, setResult] = useState<null | {
    recommendedInstance: string;
    reason: string;
    price: number;
    vcpus: number;
    gpu: string;
  }>(null);

  const [showRequestButton, setShowRequestButton] = useState(false);
  const [isBudgetZero, setIsBudgetZero] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If budget is being updated, check if it is 0
    if (name === 'budget') {
      setIsBudgetZero(value.trim() === '0');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setShowRequestButton(false);

    const res = await fetch('/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setResult(data);
      if (!data.price || data.price === 0 || formData.budget.trim() === '0') {
        setShowRequestButton(true);
      }
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  const handleRequestClick = () => {
    alert("Your request has been submitted. We will notify you when this GPU becomes available.");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">GPU Workload Recommender</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="modelType" onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Model Type</option>
          <option value="vision">Vision</option>
          <option value="nlp">NLP</option>
          <option value="llm">LLM</option>
        </select>

        <input
          name="datasetSize"
          type="text"
          placeholder="Dataset Size (e.g., 5GB)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select name="purpose" onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Purpose</option>
          <option value="training">Training</option>
          <option value="inference">Inference</option>
        </select>

        <input
          name="budget"
          type="text"
          placeholder="Budget per hour (e.g., 2.5)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select name="preferredRegion" onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Preferred Region</option>
          <option value="mumbai">Mumbai</option>
          <option value="noida">Noida</option>
          <option value="us-east">US-East</option>
        </select>

        <input
          name="duration"
          type="text"
          placeholder="Duration (optional)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="instancePreferences"
          type="text"
          placeholder="Instance Preferences (optional)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {isBudgetZero ? (
          <Button
            type="button"
            onClick={handleRequestClick}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Request
          </Button>
        ) : (
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Get Recommendation
          </button>
        )}
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Recommended Instance</h2>
          <p><strong>Instance:</strong> {result.recommendedInstance}</p>
          <p><strong>Reason:</strong> {result.reason}</p>
          <p><strong>GPU:</strong> {result.gpu}</p>
          <p><strong>vCPUs:</strong> {result.vcpus}</p>

          {showRequestButton ? (
            <Button
              onClick={handleRequestClick}
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Request
            </Button>
          ) : (
            <p><strong>Price/hr:</strong> ${result.price.toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
  );
}
