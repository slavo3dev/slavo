'use client'

import { useState, ChangeEvent, FormEvent } from "react";

export const Comments = () => {
  
    const [comment, setComment] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const commentValue = event.target.value;
      setComment(commentValue);
    };
  
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
          console.log(comment);
    };  

  return (
    <div className="flex justify-center">
        <div className="">
           <h3 className="text-xl font-bold ">Comments</h3>
           <form onSubmit={onSubmit} className="mt-8 flex gap-8">
             <input  onChange={onChange} type="text" placeholder="Add a comment" className="p-2 border-b focus:border-b-gray-700 w-full outline-none" />
             <button className="px-4 py-2 bg-green-500 rounded-lg text-white">Submit</button>
           </form>
        </div>
    </div>
  )
}
