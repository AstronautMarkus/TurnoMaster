import { useState } from "react";

export const useFaq = () => {
  const [faqs, setFaqs] = useState([
    { question: "What is TurnoMaster?", answer: "TurnoMaster is a scheduling tool.", isOpen: false },
    { question: "How do I use TurnoMaster?", answer: "You can use it to manage your schedules efficiently.", isOpen: false },
    { question: "Is TurnoMaster free?", answer: "Yes, TurnoMaster offers a free plan.", isOpen: false },
  ]);

  const toggleFaq = (index: number) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return { faqs, toggleFaq };
};
