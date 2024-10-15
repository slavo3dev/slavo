'use client'

import { useState, ChangeEvent, FormEvent } from "react";

export const Comments = () => {
  
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<string>("");

    const countWords = (text: string): number => {
        return text.trim().split(/\s+/).length;
      };

      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const commentValue = event.target.value;
        const wordCount = countWords(commentValue);
  
        if (wordCount <= 96) {
          setComment(commentValue);
          setError(""); // Clear any previous errors
        } else {
          setError("Comment cannot exceed 96 words.");
        }
      };
  
      const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (countWords(comment) > 96) {
          setError("Comment cannot exceed 96 words.");
          return;
        }
        console.log(comment);
        setComment(""); // Clear the input after submission
      };  
   

  return (
    <div className="flex justify-center pt-10">
        <div className="">
           <h3 className="text-lg font-bold text-gray-900">Comments</h3>
           <form onSubmit={onSubmit} className="mt-8 flex gap-8">
             <input  value={comment} onChange={onChange} type="text" placeholder="Add a comment" className="p-2 border-b focus:border-b-gray-700 w-full outline-none" />
             <button className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded">Submit</button>
           </form>
           {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    </div>
  )
}