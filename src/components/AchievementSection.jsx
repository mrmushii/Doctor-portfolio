"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: "First Step",
    description: "The journey began...",
    size: "lg",
    imgSrc: "/placeholder-image-1.jpg",
    details:
      "This initial phase was all about exploration. Driven by curiosity, I laid the foundational groundwork for everything that was to come.",
  },
  {
    title: "Breakthrough",
    description: "Overcame a big challenge...",
    size: "sm",
    imgSrc: "/placeholder-image-2.jpg",
    details:
      "Facing the first major obstacle was daunting, but overcoming it marked a significant turning point and boosted my confidence immensely.",
  },
  {
    title: "Collaboration",
    description: "Worked with amazing people...",
    size: "md",
    imgSrc: "/placeholder-image-3.jpg",
    details:
      "True innovation happens together. We combined our efforts to achieve something far greater than any one of us could have alone.",
  },
  {
    title: "Recognition",
    description: "Efforts were acknowledged...",
    size: "lg",
    imgSrc: "/placeholder-image-4.jpg",
    details:
      "Receiving recognition from peers and the wider community was a humbling validation of the hard work and dedication poured into the project.",
  },
  {
    title: "New Horizons",
    description: "Exploring advanced concepts...",
    size: "md",
    imgSrc: "/placeholder-image-5.jpg",
    details:
      "The journey is far from over. With new goals on the horizon, the focus is now on leveraging past experiences to innovate for the future.",
  },
  {
    title: "Mentorship",
    description: "Guiding the next generation...",
    size: "sm",
    imgSrc: "/placeholder-image-2.jpg",
    details:
      "Sharing knowledge and helping others grow is one of the most rewarding parts of the journey. It's about giving back and building a stronger community.",
  },
  {
    title: "Innovation",
    description: "Creating novel solutions...",
    size: "lg",
    imgSrc: "/placeholder-image-1.jpg",
    details:
      "Pushing the boundaries of what's possible by developing new techniques and solutions that solve real-world problems in elegant ways.",
  },
];

const sizeClasses = {
  sm: "w-[60vw] h-[45vh] max-w-sm max-h-60",
  md: "w-[70vw] h-[55vh] max-w-md max-h-72",
  lg: "w-[75vw] h-[60vh] max-w-lg max-h-80",
};

// Safe positions to avoid overflow
const cardPositions = [
  { top: "35%", left: "40%" },
  { top: "37%", left: "35%" },
  { top: "34%", left: "40%" },
  { top: "36%", left: "55%" },
  { top: "38%", left: "70%" },
  { top: "32%", left: "35%" },
  { top: "34%", left: "30%" },
  { top: "36%", left: "45%" },
  { top: "38%", left: "60%" },
  { top: "40%", left: "75%" },
  { top: "44%", left: "42%" },
  { top: "46%", left: "28%" },
  { top: "48%", left: "42%" },
  { top: "50%", left: "58%" },
  { top: "52%", left: "72%" },
  { top: "56%", left: "28%" },
  { top: "58%", left: "35%" },
  { top: "60%", left: "50%" },
  { top: "62%", left: "65%" },
  { top: "65%", left: "30%" },
];


export default function StoryAnimation() {
  const component = useRef(null);
  const modalRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedCard ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCard]);

  // GSAP animations
  useGSAP(() => {
    const heading = component.current.querySelector(".heading");
    const cards = gsap.utils.toArray(".achievement-card-container");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: component.current,
        pin: true,
        start: "top top",
        end: "+=3500",
        scrub: 1,
      },
    });

    // Heading fade out
    tl.to(heading, { autoAlpha: 0, y: -50, ease: "power1.in" });

    // Cards enter from different directions
    cards.forEach((card, index) => {
      const directionX = index % 2 === 0 ? -1 : 1;
      const directionY = index % 3 === 0 ? -1 : 1;

      tl.from(
        card,
        {
          autoAlpha: 0,
          x: gsap.utils.random(200, 400) * directionX,
          y: gsap.utils.random(150, 300) * directionY,
          rotation: gsap.utils.random(-15, 15),
          scale: 0.7,
          duration: 1,
          ease: "power2.out",
        },
        "<0.2"
      );
    });

    // Floating + parallax
    cards.forEach((card) => {
      const speedFactor = 0.2 + Math.random() * 0.5;

      gsap.to(card, {
        x: "+=" + gsap.utils.random(-15, 15),
        y: "+=" + gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-3, 3),
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
      });

      gsap.to(card, {
        y: `+=${100 * speedFactor}`,
        scrollTrigger: {
          trigger: component.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3 * speedFactor,
        },
      });
    });

    // Cinematic ending: cards fly outward while fading and shrinking
    tl.to(
      cards,
      {
        autoAlpha: 0,
        x: () => gsap.utils.random(-500, 500),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-45, 45),
        scale: 0.5,
        duration: 1.5,
        stagger: { each: 0.1 },
        ease: "power2.inOut",
      },
      ">+=1"
    );
  }, { scope: component });

  // Modal animation
  useGSAP(() => {
    if (selectedCard) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedCard]);

  const handleCloseModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.9,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedCard(null),
    });
  };

  return (
    <>
      <div ref={component} className="relative  hero w-full text-white h-screen">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h2 className="heading text-5xl font-bold">My Journey</h2>

          {/* Cards */}
          <div className="absolute inset-0">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="achievement-card-container absolute cursor-pointer transition-transform duration-300"
                style={{
                  top: cardPositions[index % cardPositions.length].top,
                  left: cardPositions[index % cardPositions.length].left,
                  zIndex: hoveredIndex === index ? 50 : 10,
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedCard(item)}
              >
                <Card
                  className={`achievement-card bg-gray-800 text-white shadow-xl shadow-blue-500/20 rounded-xl ${sizeClasses[item.size]}`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-11/12 max-w-3xl overflow-hidden rounded-xl bg-gray-900 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <img
              src={selectedCard.imgSrc}
              alt={selectedCard.title}
              className="h-72 w-full object-cover"
            />
            <div className="p-8">
              <h2 className="mb-2 text-3xl font-bold">{selectedCard.title}</h2>
              <p className="text-lg text-gray-300">{selectedCard.details}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
