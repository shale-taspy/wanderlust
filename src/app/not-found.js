import Link from 'next/link';

export default function NotFound() {
return (
    <div className="min-h-[75vh] bg-white text-slate-900 flex flex-col justify-center items-center px-6 py-12 font-sans">
    
    
    <div className="text-center max-w-xl mx-auto space-y-6">

        
        <div className="space-y-2">
        <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-slate-900">
            404
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-wide">
            We could not find coordinates for this destination.
        </p>
        </div>

    
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
        The booking page or travel destination you are searching for may have been updated, relocated, or temporarily suspended.
        </p>

    
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
        <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#00A8CC] hover:bg-cyan-600 text-white font-medium text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
        >
            Return to Homepage
        </Link>
        
        <Link
            href="/destinations"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-medium text-sm transition-all duration-200 active:scale-[0.98]"
        >
            Browse All Destinations
        </Link>
        </div>

    </div>
    </div>
);
}