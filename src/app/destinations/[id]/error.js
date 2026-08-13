      "use client";

      import Link from "next/link";
      import { useEffect } from "react";

      const ErrorPage = ({ error, reset }) => {
      useEffect(() => {
      // Log the error to an analytics or error tracking service
      if (error) {
            console.error("Logged Page Error:", error);
      }
      }, [error]);

      return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="w-8 h-8"
            >
            <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
            </svg>
            </div>

            {/* Heading & Description */}
            <h1 className="text-3xl font-bold tracking-tight mb-2">
            Something went wrong!
            </h1>
            <p className="text-slate-500 max-w-md mb-6 text-sm sm:text-base">
            An unexpected error occurred while loading this page. You can try
            refreshing the page or head back to the home page.
            </p>

            {/* Optional Error Message Box */}
            {error?.message && (
            <div className="mb-8 p-3 bg-slate-100 rounded-md text-xs font-mono text-slate-600 max-w-md w-full overflow-x-auto text-left border border-slate-200">
            <p className="font-semibold mb-1 text-slate-700">Error Details:</p>
            <code>{error.message}</code>
            </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
            <button
            onClick={() => reset?.()}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors text-sm shadow-sm"
            >
            Try Again
            </button>

            <Link
            href="/"
            className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-md transition-colors text-sm"
            >
            Back to Home
            </Link>
            </div>
      </div>
      );
      };

      export default ErrorPage;
