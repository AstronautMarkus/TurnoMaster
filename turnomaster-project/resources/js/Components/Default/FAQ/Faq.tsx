import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  list: FaqItem[];
};

const Faq: React.FC<FaqProps> = ({ list }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-4/5 mx-auto p-6">
      <div className="space-y-4">
        {list.map((faq, index) => (
          <div
            key={index}
            className="border p-4 bg-white cursor-pointer hover:shadow-md transition transform hover:scale-105"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {openIndexes.includes(index) ? "-" : "+"}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndexes.includes(index) ? "max-h-screen" : "max-h-0"}`}
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
