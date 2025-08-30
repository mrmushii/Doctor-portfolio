"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Twitter, Facebook, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StaticFooter() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate elements into view when the footer enters the viewport
      gsap.from(".footer-element", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Start animation when the top of the footer is 85% from the top of the viewport
          toggleActions: "play none none none", // Play the animation once and don't reverse
        },
        autoAlpha: 0, // Fade in
        y: 40,        // Slide up
        stagger: 0.1, // Animate elements one by one
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef } // Scope animations to this component
  );

  return (
    <footer ref={containerRef} className=" text-gray-300 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around gap-8 mb-8">
          {/* Column 1: Brand/Name */}
          <div className="footer-element">
            <h3 className="text-xl font-bold text-white mb-4">Your Name</h3>
            <p className="text-sm">
              A passionate developer creating modern and responsive web applications.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-element">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          

          {/* Column 4: Contact Info */}
          <div className="footer-element">
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <a href="mailto:contact@example.com" className="flex items-center space-x-2 hover:text-white transition-colors">
              <Mail size={20} />
              <span>auvrireme@gmail.com</span>
            </a>
          </div>
        </div>

        <hr className="border footer-element mb-5" />

        <p className="text-center text-sm mt-8 footer-element pb-6">
          
        </p>
      </div>
    </footer>
  );
}