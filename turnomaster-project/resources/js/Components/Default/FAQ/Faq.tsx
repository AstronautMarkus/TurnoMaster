import React from "react";
import { useFaq } from "./useFaq";

const Faq = () => {
  const { faqs, toggleFaq } = useFaq();

  return (
    <div className="w-4/5 mx-auto p-6">
      <div className="space-y-4">
        {faqs.map((faq:any, index:any) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {faq.isOpen ? "-" : "+"}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${faq.isOpen ? "max-h-screen" : "max-h-0"}`}
            >
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
