/* eslint-disable indent */
import { VideoCard } from "@/components/index";
import { VideoContext } from "@/lib/context";
import { getVideos } from "@/lib/videos";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, SetStateAction } from "react";

const Video = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  const router = useRouter();
  const context = useContext(VideoContext);
  const selectVideos = context.videoLine;
  const channelVideos = getVideos(selectVideos);
  console.log(channelVideos);
  const filterVideos = channelVideos.filter((creator) => {
    const lowerTitleText = creator.title.toLowerCase();
    const lowerSearchInput = searchInput.toLowerCase();
    return (
      lowerTitleText && lowerTitleText.includes(lowerSearchInput)
    );
  });

  const url = `https://www.youtube.com/embed/${router.query.videoId}?origin=http://example.com&controls=1&rel=0&disablekb=1&modestbranding=1`;
  return (
    <>
      <div className="w-full flex-col py-16 md:py-12 overflow-sroll">
        <div className=" justify-center rounded-2xl  overflow-hidden flex   outline-0  ">
          <iframe
            className="h-[480px]"
            sandbox="allow-forms allow-scripts allow-presentation allow-pointer-lock allow-same-origin allow-top-navigation"
            id="ytplayer"
            width="80%"
            height=""
            allowFullScreen
            allow="autoplay"
            src={url}
          ></iframe>
        </div>
        <div className="flex mt-16">
          <input
            className="bg-white border border-gray-200 m-auto text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500  w-1/3 pl-3 p-2.5"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
        <div className=" grid sm:grid-cols-1 pt-16  md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {filterVideos.map(
            (
              video: {
                id: string;
                imgUrl: string;
                title: string;
                channelName: string;
              },
              // eslint-disable-next-line @typescript-eslint/ban-types
              idx: {},
            ) => {
              return (
                <Link
                  href={`/video/${video.id}`}
                  key={video.id + Math.random()}
                >
                  <VideoCard
                    id={idx}
                    videoURL={`/video/${video.id}`}
                    key={video.id}
                    imgUrl={video.imgUrl}
                    title={video.title}
                    name={video.channelName}
                  />
                </Link>
              );
            },
          )}
        </div>
      </div>
    </>
  );
};

export default Video;
