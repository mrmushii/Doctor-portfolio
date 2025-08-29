"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);

const achievementsData = [
  { id: 1, title: "Board Certified in Internal Medicine", issuer: "American Board of Internal Medicine", year: "2020", imgSrc: "/certificate-1.jpg" },
  { id: 2, title: "Top Performer in Patient Care", issuer: "Chattogram Medical College Hospital", year: "2022", imgSrc: "/certificate-2.jpg" },
  { id: 3, title: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", year: "2021", imgSrc: "/certificate-3.jpg" },
  { id: 4, title: "Excellence in Medical Research", issuer: "National Healthcare Symposium", year: "2023", imgSrc: "/certificate-4.jpg" },
];

export default function AchievementsSection() {
  const component = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".achievement-card");

    gsap.set(cards.slice(1), { yPercent: 120, scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: component.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${(cards.length) * 600}`,
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      const prevCard = cards[index - 1];
      tl.add("gap", "+=0.5");
      tl.to(card, { yPercent: 0, scale: 1, duration: 1, ease: "power1.inOut" }, "gap");
      tl.to(prevCard, { scale: 0.9, yPercent: -10, duration: 1, ease: "power1.inOut" }, "gap");
    });
  }, { scope: component });

  useGSAP(() => {
    if (selectedCard) {
      const activeCard = document.querySelector(`.achievement-card[data-flip-id="${selectedCard.id}"]`);
      if (!activeCard) return;

      const state = Flip.getState(activeCard);
      const modal = document.querySelector(".modal-content");
      
      Flip.from(state, { target: modal, duration: 0.5, ease: "power2.inOut", scale: true });
    }
  }, { dependencies: [selectedCard] });

  const handleCardClick = (card) => setSelectedCard(card);

  const handleCloseModal = () => {
    if (!selectedCard) return;

    const modal = document.querySelector(".modal-content");
    if (!modal) return;

    const state = Flip.getState(modal);
    const activeCard = document.querySelector(`.achievement-card[data-flip-id="${selectedCard.id}"]`);
    
    Flip.from(state, {
      target: activeCard,
      duration: 0.5,
      ease: "power2.inOut",
      scale: true,
      onComplete: () => setSelectedCard(null),
    });
  };

  return (
    <section ref={component} className="certificate-stack-section  video min-h-[100vh] hero overflow-hidden">
      <div className="container mx-auto py-20">
        <h2 className="text-4xl font-bold pb-10 text-center text-gray-800">Certificates & Achievements</h2>
      </div>
      
      {/* CHANGE #1: Removed max-width and padding classes to make the container full-width */}
      <div className="cards-container relative w-full h-screen">
        {achievementsData.map((cert) => (
          <Card
            key={cert.id}
            data-flip-id={cert.id}
            className="achievement-card absolute inset-0 w-full h-[80vh] top-[10vh] cursor-pointer shadow-2xl rounded-none md:rounded-2xl flex flex-col items-center justify-center p-4 md:p-8 "
            onClick={() => handleCardClick(cert)}
          >
            {/* CHANGE #2: Added max-width here to keep text readable on large screens */}
            <CardHeader className="text-center w-full max-w-4xl mx-auto">
              <CardTitle className="text-3xl md:text-5xl font-bold text-gray-800">{cert.title}</CardTitle>
              <p className="mt-4 text-xl text-gray-500">{cert.issuer} - {cert.year}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedCard && (
        <div
          className="modal-backdrop fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div
            className="modal-content relative bg-white rounded-lg shadow-xl overflow-hidden p-4 max-w-4xl w-11/12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full text-black hover:bg-white/40 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <img src={selectedCard.imgSrc} alt={selectedCard.title} className="w-full h-auto object-contain max-h-[70vh] mb-4 rounded-md" />
            <div className="modal-text p-4">
              <h3 className="text-2xl font-bold">{selectedCard.title}</h3>
              <p className="text-lg">{selectedCard.issuer} - {selectedCard.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}