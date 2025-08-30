import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(ScrollTrigger, SplitText);

const IntroSection = () => {
  const container = useRef();

  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=150%", // Shorter duration is fine now
        scrub: 1.5,
        pin: true,
      },
    });

    // The timeline now ONLY handles the intro
    const title = new SplitText(".dna", { type: "chars" });
    masterTimeline.from(title.chars, { opacity: 0, y: 150, stagger: 0.05, ease: "back.out" });
    masterTimeline.to(".dna", { scale: 0.5, opacity: 0, ease: "power2.inOut" });
    
    
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen overflow-hidden hero ">
      {/* StorySection is no longer here */}
      <div className="hero overflow-hidden">
        <div className="video relative z-0 h-screen w-screen">
          <h1 className="dna text-8xl text-center text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            John Cena
          </h1>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;