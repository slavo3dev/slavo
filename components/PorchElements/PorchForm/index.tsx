import React, { useState, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { isValidHttpUrl } from "lib/constants";
import { Loader } from "@/components/ui/Loader";
import { PorchType } from "@/Types/PorchTypes";
import { trackEvent } from "lib/ga";
import { HiX } from "react-icons/hi";

interface PorchFormProps {
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchForm: React.FC<PorchFormProps> = ({ setPorchs, setShowForm }) => {
  const [text, setText] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [responseUpdate, setResponseUpdate] = useState<string>("");

  const { userInfo } = useContext(UserInfoContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (text && isValidHttpUrl(source)) {
      const payload = { text, source, email: userInfo?.email };
      setIsUploading(true);

      try {
        const response = await fetch("/api/createDailyUpdate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          setResponseUpdate(responseData.ticket);

          setPorchs((porchs: PorchType[]) => [responseData.newUpdate[0], ...porchs]);

          trackEvent({
            action: "click",
            category: "button",
            label: "new-porch-update-button",
            value: 1,
          });

          setTimeout(() => {
            setText("");
            setSource("");
            setIsUploading(false);
            setShowForm(false);
            setResponseUpdate("");
          }, 500);
        } else {
          console.error("Error: ", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Request failed: ", error);
      }
    } else {
      alert(
        `The submission was unsuccessful. Please ensure all text fields are filled correctly, and your URL is valid.\n\nsource: ${source}\ntext: ${text}`
      );
    }
  }

  return (
    <>
      {responseUpdate ? (
        <Loader title={responseUpdate} />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"
            >
              <HiX size={24} />
            </button>

            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800">Post your progress</h3>

              <textarea
                placeholder="Share your update with the world..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isUploading}
                rows={4}
                className="w-full resize-none border border-gray-300 rounded-md p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Provide your learning resource URL..."
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={isUploading}
                className={`w-full border ${
                  source.length > 0 && !isValidHttpUrl(source)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50"
                } rounded-md p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400`}
              />

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isUploading ? "Posting..." : "Submit Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PorchForm;
