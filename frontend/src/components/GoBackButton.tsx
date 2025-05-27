'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function GoBackButton() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const handleButtonPress = () => {
        if(isMounted){
            router.replace("/")
        }
    };
    
    return (
        <button 
            onClick={handleButtonPress}
            className="bg-white text-[#562626] px-4 py-2 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center justify-center"
            disabled={!isMounted}
        >
            <span className="mr-1">←</span> Back
        </button>
    );
}