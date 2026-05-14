import { GetStaticProps, NextPage } from "next";
import { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import supabase from "../../lib/supabase";
import { Loader } from "@/components/ui/Loader";
import {
  HeadBasePage,
  PorchList,
  PorchHeader,
  PorchForm,
} from "@components";
import { PorchType } from "@/Types/PorchTypes";

const InfiniteScrollComponent = InfiniteScroll as any;

interface PorchPageProps {
  initialPorchs: PorchType[];
}

const PAGE_SIZE = 100;

const PorchPage: NextPage<PorchPageProps> = ({ initialPorchs }) => {
  const [showForm, setShowForm] = useState(false);
  const [porchList, setPorchs] = useState<PorchType[]>(initialPorchs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    initialPorchs.length === PAGE_SIZE,
  );

  const loadMorePorchs = useCallback(async () => {
    try {
      const { data: newPorchs, error } = await supabase
        .from("porch")
        .select("*")
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (error) {
        console.error("Error fetching data from Supabase:", error);
        return;
      }

      if (newPorchs && Array.isArray(newPorchs)) {
        setPorchs((prevPorchs) => [...prevPorchs, ...newPorchs]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newPorchs.length === PAGE_SIZE);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }, [page]);

  return (
    <>
      <HeadBasePage
        title="Share Your Daily Learning Journey - Career Change in Web Development"
        description="Join our community to share your daily learning updates and track your progress in web development. Engage with others on the same career change journey, get support, and stay motivated. Start your path to a bright future with Slavo.io!"
      />

      <main className="relative min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
        {showForm && (
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        )}

        <div className="mx-auto max-w-5xl">
          <PorchHeader
            showForm={showForm}
            setShowForm={setShowForm}
          />

          {showForm && (
            <div className="relative z-50 mb-8 flex justify-center">
              <PorchForm
                setPorchs={setPorchs}
                setShowForm={setShowForm}
              />
            </div>
          )}

          <InfiniteScrollComponent
            dataLength={porchList.length}
            next={loadMorePorchs}
            hasMore={hasMore}
            loader={<Loader title="Loading more updates..." />}
            endMessage={
              <p className="py-8 text-center text-sm font-medium text-slate-500">
                Yay! You have seen it all
              </p>
            }
          >
            <PorchList porchs={porchList} setPorchs={setPorchs} />
          </InfiniteScrollComponent>
        </div>
      </main>
    </>
  );
};

export default PorchPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data: porchs, error } = await supabase
    .from("porch")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (error) {
    console.error("Error fetching data from Supabase:", error);

    return {
      props: {
        initialPorchs: [],
      },
      revalidate: 60,
    };
  }

  return {
    props: {
      initialPorchs: porchs ?? [],
    },
    revalidate: 60,
  };
};
