# Contact Management System

A modern web application for managing contacts with authentication, real-time updates, and a responsive interface.

## Technology Stack

### Frontend

- **React 18** - UI library
- **TanStack Router** - Type-safe routing with built-in search params handling
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Static typing and enhanced developer experience

### Backend

- **PocketBase** - Open source backend with:
  - Real-time database
  - Authentication
  - File storage
  - Auto-generated APIs

## Features

- 🔐 Secure authentication (login/register)
- 📱 Responsive design
- 📝 CRUD operations for contacts
- 📊 Pagination
- 🔍 Search functionality
- 🚀 Real-time updates
- 🎨 Clean, modern UI

## Getting Started

1. Clone the repository:

```
git clone [your-repo-url]
```

2. Install dependencies:

```
npm install
```

3. Start PocketBase server:

```
./pocketbase serve
```

4. Start the development server:

```
npm run dev
```

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── routes/         # TanStack Router route definitions
│   ├── lib/           # Utilities and configurations
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── pocketbase/       # PocketBase configuration
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
