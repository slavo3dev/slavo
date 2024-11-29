import { useState, useEffect } from "react";

export const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    
    const getQuote = async  () => {

      const apiKey = process.env.NEXT_PUBLIC_NET_NINJA_API_KEY;

      if (!apiKey) {
        console.error('API key is not defined. Please set the NEXT_PUBLIC_NET_NINJA_API_KEY environment variable.');
        return;
      }

      try {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=computers", {
          method: 'GET',
          headers: {
            'x-api-key': apiKey, 
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch the quote');
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setCurrentQuote(data[0]);
        } else {
          console.error('No quotes found or data is not in expected format');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    getQuote()

  }, [])

  return (
    <div className="w-full flex flex-col justify-center mb-6">
         {currentQuote ? (
        <>
          <h5 className="font-extralight text-center text-lg italic">{currentQuote.quote}</h5>
          <p className="text-center font-bold italic">{currentQuote.author}</p>
        </>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};
