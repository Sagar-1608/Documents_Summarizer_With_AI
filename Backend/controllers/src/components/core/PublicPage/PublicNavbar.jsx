import React, { useState, useEffect } from "react";

const navItems = [
    {
        group: "Top Highlights",
        items: ["Ticker Message", "Carousel", "News", "Quick Link"],
    },
    {
        group: "Safety & Policies",
        items: ["Policies", "Safety SOP", "Safety Snap", "Zimedaar", "Best Kaizen"],
    },
    {
        group: "Wellness & Recognition",
        items: [
            "Wellness Tips",
            "Wellness Wave",
            "Leaderboard",
            "Victory Vault",
            "Bosstomer",
            "Elevate IQ",
            "Crown Collection",
        ],
    },
    {
        group: "CSR & Celebrations",
        items: [
            "CSR Initiative",
            "Fest",
            "Employee Moments",
            "Welcome Onboard",
            "Retirement",
        ],
    },
    {
        group: "Performance",
        items: ["Monthly Performance", "Quarterly Performance"],
    },
    {
        group: "New Section",
        items: ["New Gallery", "New Movement"],
    },
];

export default function PublicNavbar() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <div
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.70)' }}
                className={`fixed top-0 left-0 w-full z-50   shadow-md transition-transform duration-300 ease-in-out ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-2">
                    {/* Logo */}
                    <div className=" h-[60px] w-auto">
                        <img src="/logo.webp" alt="Logo" className="h-full object-contain" />
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-6 ml-6">
                        {navItems.map((group, index) => (


                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(index)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {/* Group Button */}
                                <button className="text-sm text-gray-100 hover:text-blue-600 cursor-pointer">
                                    {group.group}
                                </button>

                                {/* Dropdown + Triangle */}
                                {openDropdown === index && (
                                    <div className="absolute  left-0  z-50 flex flex-col items-start ">
                                        {/* Triangle Pointer */}
                                        <div className="ml-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white/80" />

                                        {/* Dropdown Menu */}
                                        <div
                                            className="w-48 p-3 rounded-xl shadow-2xl backdrop-blur-md bg-white/80 border border-gray-200/60
             animate-dropdown transform transition-all duration-300 origin-top scale-100 border-t-0"
                                        >
                                            {group.items.map((item, idx) => (
                                                <a
                                                    key={idx}
                                                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                    className="block px-4 py-2 mb-1 text-sm text-gray-800 font-medium rounded-lg 
                 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white 
                 transition-all duration-200 ease-in-out"
                                                >
                                                    {item}
                                                </a>
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </div>

                        ))}
                    </div>

                    {/* Title */}
                    <div className="ml-auto">
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-md hover:scale-105 transition-transform duration-300">
                            Belagavi Pulse
                        </h1>
                    </div>
                </div>
            </div>



        </>
    );
}



