"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-[var(--color-border)] rounded-xl overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-[var(--color-text)] hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
