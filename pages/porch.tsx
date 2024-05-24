/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key, useContext } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";
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
      <>
        <HeadBasePage title={"Share your daily update and continue to Career Change: Learn Web Development for a Bright Future"} />
        <div className="p-10 text-slate-800">
            <Header showForm={showForm} setShowForm={setShowForm} />
            {showForm ? (
                <NewFactForm
                setPorchs={setPorchs}
                setShowForm={setShowForm}
                />
            ) : null}
            {isLoading ? (
                <Loader title="Please Wait... Loading..." />
            ) : (
                <FactList porchs={porchs} setPorchs={setPorchs} />
            )}
        </div>
    </>
 
  );
};

function Header({ showForm, setShowForm }: any) {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <header className="header">
        <div className="logo">
           <h2>Consistently conquer</h2>
         </div>

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => {
          userInfo?.email
            ? setShowForm((show: any) => !show)
            : alert("Please log-in or Verify Your email address");
        }}
      >
        {showForm ? "Close" : "Post Your Progress"}
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

    const { userInfo } = useContext(UserInfoContext);

  async function handleSubmit(e: { preventDefault: () => void }) {
    // 1. Prevent browser reload
    e.preventDefault();

    if (text && isValidHttpUrl(source)) {
      const payload = { text, source, email: userInfo?.email };
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

function FactList ( { porchs, setPorchs }: any ) {
  const { userInfo } = useContext(UserInfoContext);
  
    const sortPorchbyDate: [] = porchs.sort(
        (a: { created_at: string }, b: { created_at: string }) => {
        const aDate: Date = new Date(a.created_at);
        const bDate: Date = new Date(b.created_at);
        return bDate.getTime() - aDate.getTime();
        },
    );
    
  const learningDays = porchs.filter( ( porch: { email: string; } ) => porch.email === userInfo?.email ).length;
  return (
        <section className="py-1 sm:py-1 lg:py-1 border-y-4">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w- mx-auto overflow-hidden bg-gray-100 rounded-xl">
                <div className="px-4 py-5 sm:p-6">
                    <div>
                        <p className="text-lg font-bold text-gray-900">Daily Highlights</p>
                        <p className="mt-1 text-sm font-medium text-gray-500">Growth and Learning News</p>
                        { userInfo?.email ?  <p className="mt-5 text-lg font-medium text-gray-800">You have been learning for <b>{learningDays}</b> days!</p> : null }
                      </div>
                      <div className="mt-6 space-y-3">
                           {sortPorchbyDate.map((fact: { id: Key | null | undefined }) => (
                            <Fact key={fact.id} fact={fact} setPorchs={setPorchs} />
                            ))}
                      </div>   
                </div>
              </div>  
        </div>
    </section>
  );
}

function Fact({ fact, setPorchs }: any) {
  const [isUpdating, setIsUpdating] = useState(false);

    const { userInfo } = useContext(UserInfoContext);

    const date = new Date( fact.created_at );
    
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
    if (userInfo?.email) {
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
    : commentText.slice(0, 90);

  const handleMore = () => {
    setShowMore(true);
  };
    
  return (
    <>
          <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100">
              
          <div className="flex-1 py-5 px-2 sm:p-6">
          <p className="px-1 text-base">
            <b>Daily Update</b> [
            <span className="text-sm font-medium text-gray-900">{ formattedDate }</span>
            <span className="text-sm font-medium text-gray-900"> | </span>
            <span className="text-sm font-medium text-gray-900">{ formattedTime }</span> ] :
            <br /><br />
            {displayComment}
            {!showMore && commentText.length > 90 && (
              <button onClick={handleMore}>... read more</button>
            )}
            </p>
            <div className="py-5 px-2 mt-auto border-gray-100 sm:px-1">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<a href={`mailto:${fact.email}`} title={ fact.email}>
							<p className="text-sm font-medium text-gray-900">
                                <b>User Email:</b> { fact.email }
							</p>
						</a>
					</div>

					<a href={fact.source.includes("http") ? fact.source : `//${fact.source}`} title="" className="" role="button" target="_blank">
						<svg className="w-5 h-5 text-blue-300 transition-all duration-200 group-hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<line x1="17" y1="7" x2="7" y2="17"></line>
							<polyline points="8 7 17 7 17 16"></polyline>
						</svg>
					</a>
				</div>
			</div>

          <div className="p-1 text-sm text-gray-800 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300 ease-in-out">
            <a
              href={fact.source.includes("http") ? fact.source : `//${fact.source}`}
              target="_blank"
              className="text-sm hover:bg-sky-100 whitespace-normal break-words"
            >
             <b>Source:</b> {fact.source}
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