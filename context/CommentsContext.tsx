import React, { createContext, } from "react";
export interface Comment {
  id?: string;
  userInfo: string;
  message: string;
  sourceId: number | string;
}

export type CommentsContextValue = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

const defaultValue: CommentsContextValue = {
  comments: [],
  setComments: () => {},
};

const CommentsContext = createContext<CommentsContextValue>(defaultValue);
export default CommentsContext;