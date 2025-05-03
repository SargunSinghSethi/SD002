import { NextRequest, NextResponse } from "next/server";

const regionMap: Record<string, string> = {
  mumbai: "ap-south-mum-1",
  noida: "ap-south-noi-1",
  "us-east": "us-east-at-1",
};

type WorkloadInput = {
  modelType: string;
  datasetSize: string;
  purpose: "training" | "inference";
  budget: string;
  preferredRegion: keyof typeof regionMap;
  duration?: string;
  instancePreferences?: string;
};

type GPUInstance = {
  name: string;
  price: number;
  vcpus: number;
  gpu: string;
  memory: number;
};

export async function POST(req: NextRequest) {
  try {
    const {
      modelType,
      datasetSize,
      purpose,
      budget,
      preferredRegion,
    }: WorkloadInput = await req.json();

    const regionCode = regionMap[preferredRegion];

    if (!regionCode) {
      return NextResponse.json({ error: "Invalid region selected." }, { status: 400 });
    }

    const apiUrl = `https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=${regionCode}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!Array.isArray(data.data)) {
      return NextResponse.json({ error: "Invalid data format from API" }, { status: 500 });
    }

    const gpuInstances: GPUInstance[] = data.data.map((gpu: any): GPUInstance => {
        const price = parseFloat(gpu.price_per_hour);
        return {
          name: gpu.resource_name,
          price: isNaN(price) ? 0 : price, // keep zero price so frontend can act
          vcpus: gpu.vcpus,
          gpu: gpu.gpu_description,
          memory: gpu.memory || 0,
        };
    });
      

    const budgetPerHour = parseFloat(budget);
    const filtered = gpuInstances
      .filter((inst: GPUInstance) => inst.price <= budgetPerHour)
      .sort((a: GPUInstance, b: GPUInstance) => b.memory - a.memory || b.vcpus - a.vcpus);

    const best = filtered[0];

    if (!best) {
      return NextResponse.json({ error: "No suitable instance found under given budget." }, { status: 404 });
    }

    return NextResponse.json({
      recommendedInstance: best.name,
      reason: `Selected based on memory and vCPU availability within your budget of $${budgetPerHour}/hr.`,
      price: best.price,
      vcpus: best.vcpus,
      gpu: best.gpu,
    });
  } catch (error: any) {
    console.error("Recommendation Error:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
