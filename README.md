# 🌍 Travel Planner

A modern, feature-rich web application designed to help users **plan trips, organize destinations, and create detailed itineraries** for seamless travel experiences.

---

## ✨ Features

- 🔐 **GitHub Authentication** – Secure login with your GitHub account.
- 🗺️ **Trip Management** – Create, edit, and manage multiple trips with detailed itineraries and locations.
- 🌍 **Interactive Visualizations** – Explore destinations with **React Leaflet** maps and a **3D globe** using `react-globe.gl`.
- 📊 **Travel Statistics** – Track visited countries and view personalized travel insights.
- 🎨 **Modern UI** – Sleek, responsive design with **dark mode** support.
- 🖼️ **Image Uploads** – Upload and manage trip-related images via **UploadThing**.

---

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Flowbite React
- **Backend**: Next.js API Routes, Prisma, PostgreSQL
- **Authentication**: NextAuth
- **Maps & Visualization**: React Leaflet, react-globe.gl
- **File Uploads**: UploadThing

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Geoapify API key for maps

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdulrahmanHabiba/travel-planner-v2.git
   cd travel-planner-v2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add:

   ```ini
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   GEOAPIFY_API_KEY=your_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   UPLOADTHING_SECRET=your_uploadthing_secret
   ```

4. Setup the database with Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [**http://localhost:3000**](http://localhost:3000) 🎉

---

## 📂 Project Structure

- `app/` – Next.js routes & API endpoints
- `components/` – Reusable UI components
- `lib/` – Utility functions & logic
- `prisma/` – Prisma schema & migrations
- `public/` – Static assets (images, icons)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit & push your changes.
4. Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For feedback or questions: **Abdulrahman Habiba**

Happy travels! 🌍✈️
