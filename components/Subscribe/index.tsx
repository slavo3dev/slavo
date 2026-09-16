import { FC, FormEvent, useState } from "react";
import axios from "axios";
import { Modal } from "../Modal";
import { validateEmail } from "@/lib/helpers/validateEmail";
import { ModalButton } from "../Modal/modalButton";

type SubmitState = "idle" | "loading" | "success" | "error";

export const Subscribe: FC = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const closeSubscribe = () => {
    localStorage.setItem("subscribeOpen", JSON.stringify(false));
    setIsModalOpen(false);
  };

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setState("error");
      return;
    }

    setErrorMsg("");
    setState("loading");

    try {
      await axios.post("/api/subscribe", { email });
      setState("success");
      setEmail("");
      setTimeout(() => {
        setState("idle");
        closeSubscribe();
      }, 4000);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      setState("error");
      setErrorMsg("We could not complete your signup. Please try again.");
    }
  };

  return (
    <>
      <ModalButton
        setIsModalOpen={setIsModalOpen}
        localStorageKey="subscribeOpen"
        storageValue={isModalOpen}
        className="mx-auto block rounded-md bg-blue-800 px-2 py-2 text-xs text-white transition hover:bg-blue-900 md:ml-0 md:px-5 md:py-2 md:text-sm"
      />
      {isModalOpen ? (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
      ) : null}
      <Modal
        isOpen={isModalOpen}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-[#102a43] shadow-lg"
      >
        <div className="flex justify-end pr-2">
          <button
            type="button"
            className="px-2 pt-2 text-xl text-white"
            aria-label="Close newsletter signup"
            onClick={closeSubscribe}
          >
            X
          </button>
        </div>
        <div className="mx-auto w-5/6 max-w-xl text-center sm:w-full">
          <h2 className="mb-4 mt-4 text-2xl font-bold text-white sm:text-3xl">
            Keep learning with <span className="text-blue-200">Slavo</span>
          </h2>
          <p className="mb-8 text-blue-100">
            Occasional notes on AI, technology, and building.
          </p>
          {state === "success" ? (
            <p className="pb-8 text-xl text-white">
              You are subscribed to Slavo learning notes.
            </p>
          ) : (
            <form
              className="flex flex-wrap justify-center gap-3 p-6"
              onSubmit={handleSubscribe}
            >
              <label className="flex w-full items-center rounded-md border border-blue-300 bg-blue-800 px-3 md:w-2/3">
                <span className="sr-only">Email address</span>
                <input
                  className="w-full bg-blue-800 py-4 pl-3 font-semibold leading-none text-white outline-none placeholder:text-blue-100"
                  type="email"
                  placeholder="Type your e-mail"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                />
              </label>
              <button
                className="w-full rounded-md border border-blue-300 bg-white px-8 py-4 text-xs font-semibold text-blue-900 transition hover:bg-blue-100 disabled:opacity-60 md:w-auto"
                type="submit"
                disabled={state === "loading"}
              >
                {state === "loading" ? "Signing up..." : "Sign Up"}
              </button>
              {errorMsg ? (
                <p className="w-full pt-2 text-sm text-blue-100" role="alert">
                  {errorMsg}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </Modal>
    </>
  );
};
