import { MainNavigation } from "@/components/index";

const Video = ()=>{

	const url= "https://www.youtube.com/embed/ubbE6gyBf8k?origin=http://example.com&controls=1&rel=0&disablekb=1&modestbranding=1";
	return(
		<>
			<MainNavigation />

			<div className="w-full h-screen flex-col py-16 md:py-12 overflow-sroll">
				<div className="player justify-center rounded-2xl md:h-4/6 overflow-hidden flex w-full  outline-0 ">
					<iframe
						sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
						id="ytplayer"
						width="80%"
						height=""
						allowFullScreen
						allow="autoplay"
						src={url}
					>

					</iframe>
				</div>

			</div>
		</>
	);

};

export default Video;