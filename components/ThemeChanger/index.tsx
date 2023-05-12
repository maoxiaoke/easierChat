import { useTheme } from 'next-themes'
import ThemeIcon from './ThemeSVGComp'

const THEMES = ['system','dark', 'light'];

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  const nextTheme = ()=>{
    const targetIndex = (THEMES.findIndex(v=>v===theme)+1) % THEMES.length
    setTheme(THEMES[targetIndex])
  }

  return <div 
    className='w-10 h-10 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 select-none flex justify-center items-center' 
    onClick={nextTheme}> 
      <ThemeIcon mode={theme}></ThemeIcon>
  </div>
}

export default ThemeChanger