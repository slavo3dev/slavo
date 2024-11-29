import { useState, useEffect } from "react";

const quotes = [
  { id: 1,
    text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come.",
    author: "Dwayne Johnson",
  },
  {
    id: 2,
    text: "Opportunities don't happen, you create them.",
    author: "Chris Grosser",
  },
  {
    id: 3,
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    id: 4,
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
];

export const Quotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  const currentQuote = quotes[currentIndex];

  return (
    <div key={currentQuote.id} className="w-full flex flex-col justify-center mb-6">
      <h5 className="font-extralight text-center text-lg italic">{currentQuote.text}</h5>
      <p className="text-center font-bold italic">{currentQuote.author}</p>
    </div>
  );
};
