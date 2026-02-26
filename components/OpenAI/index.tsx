import axios from "axios";
import { useMemo, useState, FC } from "react";
import { Loader } from "../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { customRenderers } from "lib/formatText";

type Persona = "mica" | "ari" | "mimi";

// ✅ detects if something is a React element (has $$typeof)
function isReactElementLike(v: any): boolean {
  return !!v && typeof v === "object" && "$$typeof" in v;
}

// ✅ ReactMarkdown expects a plain object map, NOT a React element
function safeMarkdownComponents(v: any) {
  if (!v) return undefined;
  if (isReactElementLike(v)) return undefined;
  if (Array.isArray(v)) return undefined;
  if (typeof v !== "object") return undefined;
  return v;
}

export const OpenAI: FC = () => {
  const [aiRes, setAiRes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionInput, setQuestionInput] = useState<string>("");
  const [persona, setPersona] = useState<Persona>("mica");
  const [errMsg, setErrMsg] = useState<string>("");

  const canSend = questionInput.trim().length >= 5;

  const personaLabel = useMemo(() => {
    switch (persona) {
      case "mica":
        return "Mica — Senior Lead Software Engineer (Technical)";
      case "ari":
        return "Ari — Self-Help Coach / Psychologist (Habits + Mindset)";
      case "mimi":
        return "Mimi — Career Coach (Tech Career)";
      default:
        return "Mentor";
    }
  }, [persona]);

  // ✅ only pass valid components map to ReactMarkdown
  const mdComponents = useMemo(
    () => safeMarkdownComponents(customRenderers),
    [],
  );

  const handleApiAI = async () => {
    setErrMsg("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/answerByAi", {
        questionInput,
        persona,
      });
      const answer = res?.data?.answer;
      setAiRes(
        typeof answer === "string"
          ? answer
          : JSON.stringify(answer, null, 2),
      );
    } catch (error) {
      setErrMsg(
        "We're sorry — we're having trouble retrieving an answer right now.\nPlease try again in a moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const responseUI = errMsg ? (
    <div className="text-gray-700 text-base p-6 whitespace-pre-line">
      {errMsg}
    </div>
  ) : (
    <div className="text-gray-700 text-base p-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // ✅ IMPORTANT: only pass if valid
        components={mdComponents}
        linkTarget="_blank"
      >
        {aiRes || "Ask something to get started."}
      </ReactMarkdown>
    </div>
  );

  return (
    <div
      className="lg:flex rounded lg:max-w-full sm:max-w-full md:max-w-full"
      id="openai"
    >
      <div className="bg-white shadow-inner rounded px-6 pt-6 pb-6 w-full lg:max-w-full">
        <div className="mb-5 flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Ari Mentor
            </h2>
            <p className="text-gray-600 mt-1">
              Choose a mode and ask anything about engineering,
              habits, or your career.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Mode
              <select
                className="mt-2 block bg-white border-2 border-blue-500 text-gray-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:border-blue-700 w-full md:w-[420px]"
                value={persona}
                onChange={(e) =>
                  setPersona(e.target.value as Persona)
                }
              >
                <option value="mica">
                  Mica — Senior Lead Engineer (Technical)
                </option>
                <option value="ari">
                  Ari — Self-Help Coach (Habits/Mindset)
                </option>
                <option value="mimi">
                  Mimi — Career Coach (Tech Career)
                </option>
              </select>
            </label>

            <div className="text-sm text-gray-500 md:text-right">
              Active:{" "}
              <span className="font-semibold text-gray-800">
                {personaLabel}
              </span>
            </div>
          </div>

          <textarea
            id="mentor-editor"
            rows={8}
            className="shadow appearance-none block w-full py-3 px-3 text-sm text-gray-800 bg-blue-50 focus:ring-0 border rounded focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400"
            placeholder="Ask anything…"
            required
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              className="text-base border-2 border-gray-300 text-gray-700 bg-white rounded-lg font-medium hover:bg-gray-50 mt-1 px-4 py-2"
              type="button"
              onClick={() => {
                setQuestionInput("");
                setAiRes("");
                setErrMsg("");
              }}
              disabled={isLoading}
            >
              Clear
            </button>

            <button
              className="text-base border-2 border-blue-500 text-gray-700 bg-white rounded-lg font-medium focus:ring-4 focus:ring-blue-200 hover:bg-blue-500 hover:text-white mt-1 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={isLoading || !canSend}
              onClick={handleApiAI}
            >
              {isLoading ? "Thinking..." : "Ask Ari Mentor"}
            </button>
          </div>
        </div>

        {isLoading ? <Loader title={"Please wait…"} /> : responseUI}
      </div>
    </div>
  );
};
