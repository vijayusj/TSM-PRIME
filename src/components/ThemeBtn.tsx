'use client';
import { useTheme } from '@/context/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();
  function toggle(e: any) {
    // console.log('uu');
    e.stopPropagation();
    if (theme === 'dark') {
      setTheme('light');
      // localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      // localStorage.setItem('theme', 'dark');
    }
  }
  // console.log(theme);
  return (
    <div onClick={toggle} className="theme_btn">
      {theme === 'light' ? (
        <MdDarkMode className="btn" />
      ) : (
        <MdLightMode className="btn" />
      )}
    </div>
  );
};

export default ThemeBtn;
