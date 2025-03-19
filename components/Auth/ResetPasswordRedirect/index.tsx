import { useRouter } from "next/router";

export const ResetPasswordRedirect = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Password Reset Email Sent!
        </h2>
        <p className="mt-2 text-gray-700">
          Please check your email <strong>{email}</strong> for further
          instructions.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};