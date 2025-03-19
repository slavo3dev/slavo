import React, { useState, useEffect } from "react";
import { Notification } from "../Notification"; 
import { notificationStatus } from "lib/notificationStatus"; 

export const NotificationTest = () => {
  const [reqStatus, setReqStatus] = useState<"pending" | "success" | "error" | null>(null);

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqStatus(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  const sendPayload = async () => {
    setReqStatus("pending");


    setTimeout(() => {
      const success = true; // Set this to false to simulate an error response
      if (success) {
        setReqStatus("success");
      } else {
        setReqStatus("error");
      }
    }, 1500); 
  };

  const notification = notificationStatus(reqStatus);

  return (
    <div>
      <button
        onClick={sendPayload}
        className="py-2 px-4 text-sm text-white font-semibold bg-blue-400 hover:bg-blue-500 rounded"
      >
        Submit
      </button>

      {notification && (
        <Notification
          status={notification.status || "Status"}
          title={notification.title || "Title"}
          message={notification.message || "Message"}
        />
      )}
    </div>
  );
};
