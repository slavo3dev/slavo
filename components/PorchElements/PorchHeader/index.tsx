import { useContext, useState, useEffect } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { LoginModal } from "@/components/Auth/LoginPopup";
import { QuoteFetcher } from "@/components/Quotes";

interface PorchHeaderProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchHeader: React.FC<PorchHeaderProps> = ({ showForm, setShowForm }) => {
  const { userInfo } = useContext(UserInfoContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const isAuth = !!userInfo?.email;

  const handleButtonClick = () => {
    if (isAuth) {
      setShowForm((prev) => !prev);
    } else {
      setShowLoginPopup(true);
    }
  };

  useEffect(() => {
    if (isAuth) {
      setShowLoginPopup(false);
    }
  }, [isAuth]);

  return (
    <header className="flex flex-col mt-2 space-y-6">
      {/* Quotes */}
      <div className="w-full flex justify-center">
        <QuoteFetcher />
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleButtonClick}
          className="flex items-center py-2 mt-3 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          <span className="font-medium">Post your progress</span>
        </button>
      </div>

      {/* Login Modal */}
      {showLoginPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl p-6">
            <LoginModal isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
          </div>
        </>
      )}
    </header>
  );
};

export default PorchHeader;
