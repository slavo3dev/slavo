import { GetStaticProps, NextPage } from "next";
import { useState, useCallback, MouseEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import supabase from "../lib/supabase";
import { Loader } from "@/components/ui/Loader";
import {
  HeadBasePage,
  PorchList,
  PorchHeader,
  PorchForm,
} from "@components";
import { PorchType } from "@/Types/PorchTypes";
import PorchUserButton from "@/components/PorchElements/PorchInteractivity";
import PorchUserDataForm from "@/components/PorchElements/PorchUserDataForm";
import { GoArrowLeft } from "react-icons/go";

interface PorchPageProps {
  initialPorchs: PorchType[];
}

const PorchPage: NextPage<PorchPageProps> = ({ initialPorchs }) => {
  const [showForm, setShowForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [porchList, setPorchs] = useState<PorchType[]>(initialPorchs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    initialPorchs.length === 100,
  );
  const [comments, setComments] = useState<[]>([]);

  const [position, setPosition] = useState({ x: 211, y: 196 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const loadMorePorchs = useCallback(async () => {
    try {
      const { data: newPorchs, error } = await supabase
        .from("porch")
        .select("*")
        .limit(100)
        .order("created_at", { ascending: false })
        .range(page * 100, (page + 1) * 100 - 1);

      if (error) {
        console.error("Error fetching data from Supabase:", error);
      } else if (newPorchs && Array.isArray(newPorchs)) {
        setPorchs((prevPorchs: any) => [...prevPorchs, ...newPorchs]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newPorchs.length === 100);
      }
    } catch (error) {
      console.error("Request failed: ", error);
    } finally {
      console.log("ALL Loaded");
    }
  }, [page]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <>
      <HeadBasePage
        title={
          "Share Your Daily Learning Journey - Career Change in Web Development"
        }
        description={
          "Join our community to share your daily learning updates and track your progress in web development. Engage with others on the same career change journey, get support, and stay motivated. Start your path to a bright future with Slavo.io!"
        }
      />
      <div className="p-10 text-slate-800">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <PorchUserButton
              showUserForm={showUserForm}
              setShowUserForm={setShowUserForm}
            />
            <p className="pl-2 pb-2">
              <GoArrowLeft />
            </p>
            <p className="pl-2 pb-2 text-xs">
              Check your{" "}
              <span className="font-bold text-blue-700">stats</span>{" "}
              and update your{" "}
              <span className="font-bold text-blue-700">goals!</span>
            </p>
          </div>
          <div className="">
            <PorchHeader
              showForm={showForm}
              setShowForm={setShowForm}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {showForm ? (
                <PorchForm
                  setPorchs={setPorchs}
                  setShowForm={setShowForm}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: dragging ? "grabbing" : "grab",
            transition: dragging ? "none" : "0.2 ease-out",
            zIndex: 50,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {showUserForm ? (
            <PorchUserDataForm setShowUserForm={setShowUserForm} />
          ) : null}
        </div>
        <InfiniteScroll
          dataLength={porchList.length}
          next={loadMorePorchs}
          hasMore={hasMore}
          loader={<Loader title="Loading more updates..." />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              Yay! You have seen it all
            </p>
          }
        >
          <PorchList porchs={porchList} setPorchs={setPorchs} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PorchPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data: porchs, error } = await supabase
    .from("porch")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return {
      props: {
        initialPorchs: [],
      },
    };
  }

  return {
    props: {
      initialPorchs: porchs,
    },
    revalidate: 60,
  };
};
