# FashionStore - Modern E-commerce Platform

A full-featured e-commerce website built with Node.js, Express, and Supabase.

## Features

- 🛍️ Product catalog with categories and search
- 🛒 Shopping cart functionality
- 🔐 User authentication and authorization
- 💳 Secure checkout process
- 📱 Responsive design for all devices
- ⚡ Fast performance with optimized assets
- 🔄 Real-time updates with Supabase

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, EJS
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fashionstore.git
   cd fashionstore
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and update with your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
SESSION_SECRET=your_session_secret
APP_URL=http://localhost:3000
```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Set up the environment variables in the Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
