import { GetStaticProps, NextPage } from "next";
import { useState, useCallback, MouseEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/components/ui/Loader";
import {
  HeadBasePage,
  PorchList,
  PorchHeader,
  PorchForm,
} from "@components";
import { PorchType } from "@/Types/PorchTypes";
import { API_BASE_URL } from "@/lib/apiUrl";

const InfiniteScrollComponent = InfiniteScroll as any;

interface PorchPageProps {
  initialPorchs: PorchType[];
}

const PorchPage: NextPage<PorchPageProps> = ({ initialPorchs }) => {
  const [showForm, setShowForm] = useState(false);
  const [porchList, setPorchs] = useState<PorchType[]>(initialPorchs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    initialPorchs.length === 100,
  );
  const [position, setPosition] = useState({ x: 211, y: 196 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const PAGE_SIZE = 100;

  const loadMorePorchs = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/porch?page=${page}&limit=${PAGE_SIZE}`,
      );

      if (!res.ok) throw new Error("Failed to fetch more porchs");

      const { data } = await res.json();

      setPorchs((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Load more failed:", error);
    }
  }, [page]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === "SELECT") return;
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
      <div className="relative p-10 text-slate-800">
        {showForm && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" />
        )}
        <div className="flex flex-col">
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
            transition: dragging ? "none" : "0.2s ease-out",
            zIndex: 50,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></div>
        <InfiniteScrollComponent
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
        </InfiniteScrollComponent>
      </div>
    </>
  );
};

export default PorchPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/porch`);
    if (!res.ok) throw new Error("Failed to fetch porchs");
    const data = await res.json();

    return {
      props: {
        initialPorchs: data.data || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        initialPorchs: [],
      },
      revalidate: 60,
    };
  }
};
