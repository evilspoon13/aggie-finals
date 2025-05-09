import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-sm font-medium text-gray-800">Made by Cameron Stone</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between space-x-6 w-full max-w-2xs">
            <Link 
              href="https://aggie.tamu.edu/registration-and-records/classes/final-examination-schedules" 
              className="text-sm text-gray-600 hover:text-[#500000] flex items-center gap-1"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Official Final Exam Info
              <ExternalLink size={14} className="inline-block ml-1" />
            </Link>
            <p className="text-center mt-4 text-sm text-gray-600">Disclaimer: This website is student made. Double check any final exam information on the official Aggie One Stop website. </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center md:justify-start">
          <p className="text-xs text-gray-500">
            © {currentYear} Aggie Finals
          </p>
        </div>
      </div>
    </footer>
  );
}