# Travel Planner

A modern web app to help you plan your trips around the world, organize destinations, and create detailed itineraries for each journey.

## Features

- Sign in with GitHub
- Create, edit, and manage trips with multiple locations
- Interactive map and 3D globe visualization
- Track visited countries and travel statistics
- Modern UI with dark mode support

## Technologies Used

- Next.js 15
- TypeScript
- Prisma + PostgreSQL
- TailwindCSS
- Flowbite React
- React Leaflet & react-globe.gl
- UploadThing for image uploads
- NextAuth for authentication

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a PostgreSQL database and add environment variables in `.env`:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   GEOAPIFY_API_KEY=your_api_key
   ```
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `app/` - Application pages
- `components/` - UI components
- `lib/` - Utilities and server functions
- `prisma/` - Database schema and seeds
- `public/` - Static files and images

## Contributing

Contributions and suggestions are welcome! Open an Issue or Pull Request on [GitHub](https://github.com/username/travel-planner).

## License

MIT License

---

**Contact:**  
[Abdulrahman Habiba](mailto:abdulrahman@example.com)

