# GPU Cost Optimizer & Recommender 🧠⚙️

A full-stack application built with **Next.js (App Router)** and **TypeScript** that helps users find cost-optimized GPU instances for their AI/ML workloads using AceCloudHosting's real-time pricing API.

## 🎬 Demo

[![GPU Cost Optimizer & Recommender Demo](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID)

▶️ Click the image above to watch a demonstration of how the GPU Cost Optimizer & Recommender works

## 🚀 Features

- **Dynamic GPU Instance Recommendations** based on:
  - Model type (Vision, NLP, LLM)
  - Dataset size
  - Purpose (Training / Inference)
  - Budget constraints
  - Preferred region
- **Real-time Pricing Data** from AceCloudHosting API
- **Smart Fallback System** with request option if no GPU matches budget
- **Clean, Responsive UI** built with Tailwind CSS & React Server Components

## 🛠️ Tech Stack

- **Next.js 13+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **AceCloudHosting Pricing API**

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/gpu-recommender.git
cd gpu-recommender
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to use the application.

## 📁 Project Structure

```
/app
  /api
    /recommendation
      route.ts            # Backend route handling GPU recommendation logic
  /components
    /ui
      button.tsx          # Reusable Button component
    WorkLoadForm.tsx      # Frontend form for user input
  layout.tsx
  page.tsx
/public
/styles
  globals.css
package.json
tsconfig.json
README.md
```

## 🧪 Usage Guide

1. Fill in the workload form with your requirements:
   - Select your model type (Vision, NLP, LLM)
   - Enter your dataset size
   - Choose your purpose (Training / Inference)
   - Set your budget range
   - Select your preferred region

2. Click "Get Recommendations" to receive cost-optimized GPU instance suggestions

3. If no options match your budget, you'll see a request option for custom solutions

## 🌍 API Integration

This application uses the AceCloudHosting GPU Pricing API to fetch real-time pricing data and make intelligent recommendations based on your specific workload requirements.

## 🔄 Customization

You can customize the recommendation algorithm by modifying the `/app/api/recommendation/route.ts` file to adjust priority weights for different factors (cost, performance, availability).

## 🚧 Limitations

- This is an MVP version without authentication
- Edge cases like malformed input or empty API responses are handled gracefully
- Limited to GPU options available through AceCloudHosting

## 📈 Future Improvements

- User authentication and saved preferences
- Historical price tracking
- Performance benchmarks for different workloads
- Multi-cloud provider comparison
- Export recommendations as PDF/CSV

## 📄 License

[MIT](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [AceCloudHosting](https://www.acecloudhosting.com) for providing the GPU pricing API
- [Next.js](https://nextjs.org/) for the incredible React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
