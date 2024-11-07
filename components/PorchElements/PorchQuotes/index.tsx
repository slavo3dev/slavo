import React, { useState, useEffect } from "react";

const quotes = [
  {
    text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come.",
    author: "Dwayne Johnson",
  },
  {
    text: "Opportunities don't happen, you create them.",
    author: "Chris Grosser",
  },
  {
    text: " Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
];

const QuoteSwitcher = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuote((prev) => {
        const currentIndex = quotes.indexOf(prev);
        const nextIndex = (currentIndex + 1) % quotes.length;
        return quotes[nextIndex];
      });
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center mb-6">
      <h5 className="font-extralight text-center text-lg italic">
        {currentQuote.text}
      </h5>
      <p className="text-center font-bold">
        <span className="italic font-extralight">- </span>
        {currentQuote.author}
      </p>
    </div>
  );
};

export default QuoteSwitcher;
