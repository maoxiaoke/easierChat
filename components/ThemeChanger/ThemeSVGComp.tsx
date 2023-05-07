import { MoonIcon,DesktopIcon, SunIcon } from '@radix-ui/react-icons'

const ThemeSvg = (props: {mode?: string})=>{
  const {mode} = props
  if(mode==='dark'){
    return <MoonIcon />
   }
  if(mode ==='light'){
    return <SunIcon />
  }
  if(mode === 'system'){
    return <DesktopIcon />
  }
  return <></>
}
export default ThemeSvg