import { useState, useEffect } from "react";

export const QuoteFetcher = () => {
  const [currentQuote, setCurrentQuote] = useState<string | null>(null); 
  const [author, setAuthor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);  

  const getQuote = async () => {
    try {
      const response = await fetch("/api/get-quotes");

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();

      if (data && data.quote && data.author) {
        setCurrentQuote(data.quote);
        setAuthor(data.author);
        setError(null);
      } else {
        setError("No quote found");
      }
    } catch (error) {
      setError(`Error fetching quote: ${(error as Error).message}`);
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    getQuote();

    const interval = setInterval(() => {
      getQuote(); 
    }, 6000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="w-full flex flex-col justify-center mb-6">
      {loading ? (
        <p>Loading...</p> /* Show loading message while fetching */
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>  /* Show error if any */
      ) : (
        <div className="text-center">
          <h5 className="font-extralight text-lg italic">{`"${currentQuote}"`}</h5>
          <p className="text-sm">- {author}</p>
        </div>
      )}
    </div>
  );
};
