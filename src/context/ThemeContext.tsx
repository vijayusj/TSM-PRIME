'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
export type initial = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};
export const ThemeContext = createContext<initial | null>(null);
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark');
  const initial = useRef(true);
  useEffect(() => {
    // const mainTheme = localStorage.getItem('theme') || theme;
    if (initial.current) {
      initial.current = false;
      // console.log('vijay');
      return;
    }
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    // console.log('vija');
    // if (initial) {
    //   setTheme(mainTheme);
    //   initial.current = false;
    // }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext) as initial;
