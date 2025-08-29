import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { forwardRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const storyData = [
  { id: 1, imgSrc: "/doctor-listening.jpg", text: "It all starts with a conversation. I believe in listening, truly listening, to understand your story." },
  { id: 2, imgSrc: "/doctor-with-patient.jpg", text: "Every patient is a unique individual, not just a set of symptoms. Your journey is personal." },
  { id: 3, imgSrc: "/doctor-technology.jpg", text: "We combine compassionate care with advanced technology to ensure your comfort and confidence." },
  { id: 4, imgSrc: "/doctor-smiling.jpg", text: "Ultimately, my goal is to be your partner in health, guiding you towards a better quality of life." }
];

const StorySection = forwardRef((props, ref) => {
  const component = useRef();

  useGSAP(() => {
    // ... your GSAP animation logic remains the same
    const track = component.current.querySelector('.story-track');
    const stories = gsap.utils.toArray(".story-item");
    const totalScrollDistance = track.offsetWidth - window.innerWidth;
    const horizontalTween = gsap.to(track, {
      x: -totalScrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: component.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScrollDistance}`,
      }
    });
    stories.forEach((story) => {
      const textElement = story.querySelector('.story-text');
      const split = new SplitText(textElement, { type: 'words' });
      gsap.from(split.words, {
        autoAlpha: 0,
        y: 30,
        stagger: 0.05,
        scrollTrigger: {
          trigger: story,
          containerAnimation: horizontalTween,
          start: 'left center',
          end: 'center center',
          scrub: true,
        }
      });
    });
  }, { scope: component });

  return (
    <section ref={component} className="story-section  hero">
      <div ref={ref} className="story-track flex">
        {storyData.map((story) => (
          <div key={story.id} className="story-item flex-shrink-0 w-screen h-screen">
            <div className="container mx-auto flex flex-col md:flex-row h-full items-center gap-10">
              <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8">
                <img
                  src={story.imgSrc}
                  alt={story.text.substring(0, 20)}
                  className="w-full h-[80%] object-contain rounded-lg shadow-story-image"
                />
              </div>
              <div className="w-full md:w-1/2 p-8">
                {/* ✅ CORRECTED: Using the new, reliable .text-story class */}
                <p className="story-text text-3xl md:text-4xl font-light text-center md:text-left leading-relaxed text-story">
                  {story.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default StorySection;