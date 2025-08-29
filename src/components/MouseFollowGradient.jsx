import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MouseFollowGradient = () => {
  useGSAP(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;

      // Animate CSS variables on body for mouse-following gradient
      gsap.to("body", {
        '--mouse-x': `${xPercent}%`,
        '--mouse-y': `${yPercent}%`,
        duration: 1,
        ease: 'sine.out',
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return null;
};

export default MouseFollowGradient;
