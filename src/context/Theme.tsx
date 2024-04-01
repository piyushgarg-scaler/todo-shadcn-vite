import { FC, createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "dark" | "light";

export interface IThemeContext {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeColor;
}

const ThemeConext = createContext<IThemeContext | null>(null);

export const useTheme = () => {
  const value = useContext(ThemeConext);
  return value!;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setTheme] = useState<ThemeColor>(
    () => (localStorage.getItem("theme") as ThemeColor) || defaultTheme
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "light") {
      window.document.documentElement.classList.remove("dark");
      window.document.documentElement.classList.add("light");
    } else {
      window.document.documentElement.classList.remove("light");
      window.document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <ThemeConext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeConext.Provider>
  );
};
