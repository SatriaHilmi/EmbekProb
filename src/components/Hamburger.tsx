import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface Props {
    targetId: string;
};

export const Hamburger: React.FC<Props> = ({ targetId }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
        const menu = document.getElementById(targetId);
        if (menu) {
            if (!open) {
                menu.classList.remove("max-h-0");
                menu.classList.add("max-h-96");
            } else {
                menu.classList.remove("max-h-96");
                menu.classList.add("max-h-0");
            }
        }
    };

    return (
        <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
        >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
    );
};
