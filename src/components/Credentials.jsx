"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Arrow from '../assets/arrow.svg?react'; 

gsap.registerPlugin(ScrollTrigger);

const credentialsData = [
  { year: "2020", type: "Degree", title: "Ph.D. in Molecular Biology", source: "University of Science" },
  { year: "2022", type: "Publication", title: "A Study on Genomic Instability", source: "Journal of Cell Science" },
  { year: "2023", type: "Award", title: "Innovator of the Year", source: "National Research Foundation" },
  { year: "2024", type: "Publication", title: "Protein Misfolding in Neurodegenerative Diseases", source: "Nature Communications" },
];

export default function Credentials() {
  const component = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".story-item");
    const amount = items.length;

    // Set initial states
    gsap.set(".year-text", { autoAlpha: 0, y: 50 });
    gsap.set(".credential-card", { autoAlpha: 0, scale: 0.9 });
    
    const arrows = gsap.utils.toArray(".arrow-path");
    arrows.forEach(arrow => {
      const length = arrow.getTotalLength();
      gsap.set(arrow, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoAlpha: 0,
      });
    });

    // A master timeline to control the entire pinned sequence
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: component.current,
        start: "top top",
        end: () => `+=${amount * window.innerWidth}`, // Extend scroll duration for ending
        pin: true,
        scrub: 1,
      }
    });

    // Add the horizontal scroll to the master timeline
    masterTimeline.to(track.current, {
      xPercent: -100 * (amount - 1),
      ease: "none",
    });

    // Add the new ending animation to the master timeline
    masterTimeline.to(component.current, {
      scale: 0.85,
      autoAlpha: 0,
      ease: "power1.in",
    }, ">-=0.5"); // Start this animation slightly before the scroll ends

    // Animate each item's reveal as it scrolls into view
    items.forEach((item) => {
      const itemTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "left center",
          end: "center center",
          containerAnimation: masterTimeline,
          scrub: 1,
        }
      });

      // Refined sequence for a clearer storytelling flow
      itemTimeline
        .to(item.querySelector(".year-text"), { autoAlpha: 1, y: 0 })
        .to(item.querySelector(".arrow-path"), { autoAlpha: 1, strokeDashoffset: 0 }, ">-0.2") // Arrow starts drawing after year appears
        .to(item.querySelector(".credential-card"), { autoAlpha: 1, scale: 1 }, ">-0.3"); // Card appears as arrow finishes
    });

  }, { scope: component });

  return (
    // Add extra bottom padding to the parent container if needed, to see the scroll-out effect smoothly
    <div style={{ paddingBottom: "50vh" }}>
      <section ref={component} className="hero text-secondary-foreground relative h-screen overflow-hidden">
        <div ref={track} className="h-full flex relative" style={{ width: `${credentialsData.length * 100}%` }}>
          {credentialsData.map((item, index) => (
            <div key={index} className="story-item w-screen h-screen flex items-center justify-center p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 w-full max-w-7xl">
                <div className="year-container text-center lg:text-left">
                  <h2 className="year-text font-black text-8xl md:text-9xl lg:text-[12rem] text-primary opacity-0">
                    {item.year}
                  </h2>
                </div>
                <div className="details-container flex items-center justify-center lg:justify-start gap-4">
                  <Arrow className="arrow-svg w-24 md:w-48 text-border flex-shrink-0" />
                  <div className="credential-card w-full max-w-md lg:max-w-xl opacity-0">
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
                      <CardHeader>
                        <p className="text-base font-semibold text-primary">{item.type}</p>
                        <CardTitle className="text-2xl md:text-3xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground">{item.source}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}