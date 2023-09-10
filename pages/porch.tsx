/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key, useContext } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserInfoContext from "@/context/UserInfoContext";
import { isValidHttpUrl } from "@/lib/constants";
import { Loader } from "@/components/ui/Loader";
import { HeadBasePage } from "../components";

const PorchPage: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [porchs, setPorchs] = useState([]);
  const [ isLoading, setIsLoading ] = useState( false );
    

  useEffect(function () {
    async function getPorchs() {
      setIsLoading(true);

      const query = supabase.from("porch").select("*");

      const { data: porchs, error }: any = await query
        .order("excellent", { ascending: false })
        .limit(1000);

      if (!error) setPorchs(porchs);
      else alert("There was a problem getting data");
      setIsLoading(false);
    }
    getPorchs();
  }, []);

  return (
    <div className="p-10 text-slate-800">
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          setPorchs={setPorchs}
          setShowForm={setShowForm}
        />
      ) : null}
      {isLoading ? (
        <Loader title="Please Wiat... Loading..." />
      ) : (
        <FactList porchs={porchs} setPorchs={setPorchs} />
      )}
    </div>
  );
};

function Header({ showForm, setShowForm }: any) {
  const appTitle = "Daily Update";
    const { user } = useUser();
    const { userInfo } = useContext(UserInfoContext);

  return (
    <header className="header">
      <div className="logo">
        <h1>{appTitle}</h1>
      </div>

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => {
          user?.email_verified || userInfo?.email
            ? setShowForm((show: any) => !show)
            : alert("Please log-in or Verify Your email address");
        }}
      >
        {showForm ? "Close" : "Share Your Work"}
      </button>
    </header>
  );
}

function NewFactForm({ setPorchs, setShowForm }: any) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [responseUpdate, setResponseUpdate] = useState("");
  // const textLength = text.length;

    const { user } = useUser();
    const { userInfo } = useContext(UserInfoContext);

  async function handleSubmit(e: { preventDefault: () => void }) {
    // 1. Prevent browser reload
    e.preventDefault();

    if (text && isValidHttpUrl(source)) {
      const payload = { text, source, email: user?.email || userInfo?.email };
      setIsUploading(true);

      try {
        const response = await fetch("api/createDailyUpdate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          setResponseUpdate(responseData.ticket);
          setPorchs((porchs: any) => [
            responseData.newUpdate[0],
            ...porchs,
          ]);

          setTimeout(() => {
            setText("");
            setSource("");
            setIsUploading(false);
            setShowForm(false);
            setResponseUpdate("");
          }, 1500);
        } else {
          console.error(
            "Error: ",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        // Handle any other errors (e.g., network errors)
        console.error("Request failed: ", error);
      }
    }

    if (!text || !isValidHttpUrl(source)) {
      alert(`The submission was unsuccessful. Please ensure all text fields are filled correctly, and your URL is valid. Double-check your entries and try again.!\n Your input: \n source: ${source}\n text: ${text}`);
    }
  }

  return (
    <>
      {responseUpdate ? (
        <>
          <Loader title={responseUpdate} />
        </>
      ) : (
        <form
          className="fact-form bg-sky-600"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-gray-200 text-gray-700 appearance-none border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Share your update with the world..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isUploading}
          />
          {/* <span className="text-gray-100">{300 - textLength}</span> */}
          <input
            className={!isValidHttpUrl(source) && source.length > 0 ? "bg-red-200 text-gray-700 border-red-800 border-2"  : "bg-gray-200 text-gray-700 "}
            value={source}
            type="text"
            placeholder="Share learning source..."
            onChange={(e) => setSource(e.target.value)}
            disabled={isUploading}
          />
          <button
            className="bg-slate-100 hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-3 px-4 border border-r-2 border-blue-500 rounded shadow-md shadow-slate-300"
            disabled={isUploading }
          >
            {" "}
            Update
          </button>
        </form>
      )}
    </>
  );
}

function FactList({ porchs, setPorchs }: any) {
  const sortPorchbyDate: [] = porchs.sort(
    (a: { created_at: string }, b: { created_at: string }) => {
      const aDate: Date = new Date(a.created_at);
      const bDate: Date = new Date(b.created_at);
      return bDate.getTime() - aDate.getTime();
    },
  );

  return (
    <section className="grid md:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-1">
      {sortPorchbyDate.map((fact: { id: Key | null | undefined }) => (
        <Fact key={fact.id} fact={fact} setPorchs={setPorchs} />
      ))}
    </section>
  );
}

function Fact({ fact, setPorchs }: any) {
  const [isUpdating, setIsUpdating] = useState(false);

    const { user } = useUser();
    const { userInfo } = useContext(UserInfoContext);

  const date = new Date(fact.created_at);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const formattedTime = `${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  async function handleVote(columnName: string) {
    if (user?.email_verified || userInfo?.email) {
      setIsUpdating(true);
      const response: any = await fetch("api/createDailyUpdate", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: fact.id,
          vote: fact[columnName] + 1,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setPorchs((porchs: any[]) =>
          porchs.map((f: { id: any }) =>
            f.id === fact.id ? responseData.newUpdate[0] : f,
          ),
        );
        setIsUpdating(false);
      }
    } else {
      alert("Please Login or Verify email address");
    }
  }

  const commentText = fact.text;

  const [showMore, setShowMore] = useState(false);

  const displayComment = showMore
    ? commentText
    : commentText.slice(0, 60);

  const handleMore = () => {
    setShowMore(true);
  };

  return (
    <>
      <HeadBasePage
        title={
          "Share your daily update and continue to Career Change: Learn Web Development for a Bright Future"
        }
      />
      <div className="max-w-sm md:h-96 relative md: static overflow-hidden md:overflow-scroll rounded  shadow-lg bg-blue-800 hover:bg-slate-600 transition-duration: 900ms; text-slate-100">
        <div className="p-4">
          <div className="p-2 bg-yellow-300 overflow-scroll text-gray-800 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300 ease-in-out text-sm">
            <p className="text-yellow">
              Date: {formattedDate} <br /> Time: {formattedTime}
            </p>
            <p>
              <a
                href={`mailto:${fact.email}`}
                className="underline-offset-1 hover:bg-sky-100 text-sm"
                target="_blank"
              >
                User: {fact.email}
              </a>
            </p>
          </div>
          <p className="text-slate-50 text-base p-2">
            Learning Update: <br />
            {displayComment}
            {!showMore && commentText.length > 60 && (
              <button onClick={handleMore}>... read more</button>
            )}
          </p>

          <div className="p-2 text-sm bg-yellow-300 text-gray-800 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300 ease-in-out">
            <a
              href={fact.source.includes("http") ? fact.source : `//${fact.source}`}
              target="_blank"
              className="text-sm hover:bg-sky-100 whitespace-normal break-words"
            >
              Source: {fact.source}
            </a>
          </div>

          <div className="p-2">
            <button
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              onClick={() => handleVote("excellent")}
              disabled={isUpdating}
            >
              🤯 👍 {fact.excellent}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PorchPage;
