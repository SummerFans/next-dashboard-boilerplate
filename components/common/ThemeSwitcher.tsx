
"use client";

import { useTheme } from "next-themes";
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/outline';


const ThemeSwitcher = () => {

    const { systemTheme, theme, setTheme } = useTheme();

    const renderThemeChanger = () => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === "dark") {
            return (
                <>
                    <SunIcon className="w-6 h-6 text-yellow-500 " role="button" onClick={() =>
                        setTheme('light')} />
                </>
            )
        } else {
            return (
                <>
                    <MoonIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" role="button" onClick={() =>
                        setTheme('dark')} />
                </>
            )
        }
    };

    return (
        <>
            {renderThemeChanger()}
        </>
    );
};

export default ThemeSwitcher;