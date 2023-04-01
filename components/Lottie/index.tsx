import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

import type { AnimationItem } from 'lottie-web';

export interface LottieProps {
  iconStyle?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  data: any;
}

const Lottie = ({ iconStyle, children, className, data }: LottieProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem>();

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: data,
    });

    animationRef.current = animation;

    return () => {
      animation && animation.destroy();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!animationRef.current) {
      return;
    }
    animationRef.current.play();
    animationRef.current.loop = true;
  };

  const handleMouseLeave = () => {
    if (!animationRef.current) {
      return;
    }
    animationRef.current.loop = false;
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className}>
      <div ref={containerRef} style={iconStyle}></div>
      { children  ? children : null }
    </div>
  );
};

export default Lottie;

