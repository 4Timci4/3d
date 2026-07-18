"use client";

import { useRef } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
  defaultOpen?: boolean;
}

function FaqItem({ question, answer, index, defaultOpen = false }: FaqItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isOpen = useRef(defaultOpen);
  const num = String(index + 1).padStart(2, "0");

  function toggle() {
    const el = bodyRef.current;
    const item = itemRef.current;
    const btn = btnRef.current;
    if (!el || !item || !btn) return;

    if (!isOpen.current) {
      isOpen.current = true;
      item.classList.add("faq-item--open");
      btn.setAttribute("aria-expanded", "true");

      // height:0 iken scrollHeight=0 olur; önce auto yap, ölç, geri al
      el.style.height = "auto";
      const fullHeight = el.scrollHeight;
      el.style.height = "0px";
      getComputedStyle(el).height; // reflow
      el.style.opacity = "1";
      el.style.height = `${fullHeight}px`;

      el.addEventListener("transitionend", (e) => {
        if (e.propertyName !== "height") return;
        el.style.height = "auto";
      }, { once: true });
    } else {
      isOpen.current = false;
      item.classList.remove("faq-item--open");
      btn.setAttribute("aria-expanded", "false");

      el.style.height = `${el.scrollHeight}px`;
      getComputedStyle(el).height; // reflow
      el.style.height = "0px";
      el.style.opacity = "0";
    }
  }

  return (
    <div ref={itemRef} className={`faq-item${defaultOpen ? " faq-item--open" : ""}`}>
      <button
        ref={btnRef}
        className="faq-summary"
        aria-expanded={defaultOpen}
        onClick={toggle}
        type="button"
      >
        <span>{num}</span>
        {question}
        <span className="faq-icon" aria-hidden="true">+</span>
      </button>

      <div
        ref={bodyRef}
        className="faq-body"
        style={{
          height: defaultOpen ? "auto" : "0px",
          opacity: defaultOpen ? 1 : 0,
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FaqList({ faqs }: { faqs: string[][] }) {
  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => (
        <FaqItem
          key={question}
          question={question}
          answer={answer}
          index={index}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}