// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Optional: SVG or Image for 404 */}
        <div className="flex justify-center">
          <div className="h-24 w-24 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          This page does not exist
        </h2>
        <p className="text-gray-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link
          href="/"
          className="inline-block bg-[#C49B5C] text-white px-6 py-3 rounded-lg hover:bg-[#C49B5C]/700 transition-colors duration-200 font-medium"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}