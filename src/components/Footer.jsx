"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { X, Linkedin, Twitter, Facebook } from "lucide-react";

gsap.registerPlugin(Flip);

export default function Footer() {
  const component = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  useGSAP(
    () => {
      const formWrapper = component.current;
      const formContent = formWrapper.querySelector(".form-content");
      const state = Flip.getState([formWrapper, formContent]);

      const animatedElements = gsap.utils.toArray(".anim-element");

      if (isFormOpen) {
        formWrapper.classList.add("active");

        Flip.from(state, {
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.fromTo(
              animatedElements,
              { autoAlpha: 0, y: 30 },
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.07,
                duration: 0.5,
                ease: "power2.out",
              }
            );
          },
        });
      } else {
        if (animatedElements.length > 0) {
          // Fade out elements first
          gsap.to(animatedElements, {
            autoAlpha: 0,
            y: 30,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              formWrapper.classList.remove("active");

              // Then restore Flip state to original layout
              Flip.from(state, {
                duration: 0.7,
                ease: "power2.inOut",
              });
            },
          });
        } else {
          // Fallback if no elements
          formWrapper.classList.remove("active");
          Flip.from(state, {
            duration: 0.7,
            ease: "power2.inOut",
          });
        }
      }
    },
    { dependencies: [isFormOpen] }
  );

  return (
    <div>
      <footer ref={component} className="contact-footer">
        <div className="form-content">
          {!isFormOpen && (
            <button onClick={handleToggleForm} className="contact-button">
              Contact Me
            </button>
          )}
          {isFormOpen && (
            <div className="form-container">
              <button
                onClick={handleToggleForm}
                className="close-button anim-element"
                aria-label="Close form"
              >
                <X size={24} />
              </button>
              <h2 className="form-title anim-element">Get in Touch</h2>
              <p className="form-subtitle anim-element">
                Let's build something great together.
              </p>
              <form className="contact-form">
                <div className="form-field anim-element">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field anim-element">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="form-field anim-element">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="I have an idea for a project..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-button anim-element">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </footer>

      {/* Always visible */}
      <div className="social-links">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="X"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Facebook"
        >
          <Facebook size={24} />
        </a>
      </div>

      <p className="copyright-text">
        &copy; {new Date().getFullYear()} Your Name. All Rights Reserved.
      </p>
    </div>
  );
}