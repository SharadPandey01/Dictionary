import { Link } from "react-router-dom";

export default function NotFound() {
   
    let buttonStyle = 'border border-white rounded-xl bg-blue-950 text-white px-8 py-3 transition-transform duration-300 hover:scale-110 font-bold';

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-6 bg-[#010409] text-white text-center p-4">
            
            <h1 className="text-9xl font-extrabold tracking-widest text-white">404</h1>

            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl md:text-4xl font-sans">Whoops! You're lost in space.</h2>
                <p className="text-gray-400 text-sm md:text-base max-w-md">
                    The word or page you are looking for doesn't exist or has been moved to another dimension.
                </p>
            </div>

            {/* Back to Home Link */}
            <Link to="/" className={buttonStyle}>
                Return to Home
            </Link>
            
        </div>
    );
}