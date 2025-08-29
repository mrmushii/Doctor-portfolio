"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

// Sample credentials data
const credentialsData = [
  { type: "Degree", title: "Ph.D. in Molecular Biology", source: "University of Science, 2020" },
  { type: "Publication", title: "A Study on Genomic Instability", source: "Journal of Cell Science, 2022" },
  { type: "Award", title: "Innovator of the Year", source: "National Research Foundation, 2023" },
  { type: "Degree", title: "M.Sc. in Biochemistry", source: "State Medical College, 2016" },
  { type: "Publication", title: "Protein Misfolding in Neurodegenerative Diseases", source: "Nature Communications, 2024" },
  { type: "Grant", title: "Research Grant for AI in Medicine", source: "Health Innovation Fund, 2025" },
];

export default function Credentials() {
  const component = useRef(null);

  useGSAP(() => {
    // Set initial state for all items
    gsap.set(".credential-item", { x: -50, autoAlpha: 0 });

    // Use ScrollTrigger.batch for efficient, staggered animations
    ScrollTrigger.batch(".credential-item", {
      onEnter: batch => {
        gsap.to(batch, {
          x: 0,
          autoAlpha: 1,
          stagger: 0.15,
          ease: "power2.out",
          overwrite: true,
        });
      },
      onLeaveBack: batch => {
        gsap.to(batch, {
          x: -50,
          autoAlpha: 0,
          stagger: 0.1,
          ease: "power2.in",
          overwrite: true
        });
      },
      start: "top 85%", // Trigger when the top of the item hits 85% from the top of the viewport
    });
  }, { scope: component });

  return (
    <section ref={component} className=" hero text-secondary-foreground py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Credentials & Accomplishments</h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {credentialsData.map((item, index) => (
            <Card key={index} className="credential-item bg-card">
              <CardHeader>
                <p className="text-sm font-semibold text-primary">{item.type}</p>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}