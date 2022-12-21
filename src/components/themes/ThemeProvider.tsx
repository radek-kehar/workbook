import React, {createContext, ReactNode, useEffect, useState} from "react";
import {DEFAULT_THEME, ThemeType} from "@/themes";
import {applyTheme} from "@/themes/utils";

export const ThemeProviderContext = createContext<ThemeType>(null);

// const dispatchTheme = useContext(ThemeProviderDispatchContext);
export const ThemeProviderDispatchContext = createContext<(ThemeType) => void>(null);

type ThemeProviderProps = {
    children: ReactNode
}

export function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeType>(DEFAULT_THEME);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const dispatchTheme = (theme: ThemeType) => {
        setTheme(theme);
    }

    return (
        <ThemeProviderContext.Provider value={theme}>
            <ThemeProviderDispatchContext.Provider value={dispatchTheme}>
                { children }
            </ThemeProviderDispatchContext.Provider>
        </ThemeProviderContext.Provider>
    )
}
