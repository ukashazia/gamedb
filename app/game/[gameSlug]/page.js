"use client";

import ImageComponent from "@/components/imageComponent";
import GalleryComponent from "@/components/gallery";
import { normalize, fetchData } from "./fetchData";
import GenereList from "@/components/genereList";
import { useEffect, useState } from "react";
import Heading from "@/components/heading";

export default function Page(props) {
  const [gameData, setGameData] = useState(null);
  useEffect(() => {
    (async () => {
      const routeParams = normalize(props.params.gameSlug);
      setGameData(
        await fetchData({ search: props.searchValue || routeParams })
      );
    })();
  }, [props.searchValue, props.params.gameSlug]);

  return (
    <>
      <main className={`flex w-full flex-col`}>
        <div
          style={{
            "--image-url": `url(${
              gameData ? gameData.results[0].background_image : ""
            })`,
          }}
          className={`fixed -z-10 top-0 h-screen w-full bg-[image:var(--image-url)] bg-cover bg-no-repeat `}>
          <div
            className={`w-full h-full ${
              gameData ? "gradient-overlay" : "dark:bg-slate-900"
            }`}></div>
        </div>
        <div className={`px-16 my-8`}>
          <div className="flex">
            {!gameData ? (
              <Heading className={"dark:text-white"}>Loading...</Heading>
            ) : (
              <div className="flex justify-between gap-10 w-full flex-col xl:flex-row">
                <div className="flex flex-col items-center xl:w-1/2 xl:items-start">
                  <div className="w-full h-[400px] relative">
                    <ImageComponent
                      key={gameData.results[0].id}
                      src={gameData.results[0].background_image || ""}
                      alt={gameData.results[0].slug}
                      fill={true}
                      className={"object-cover object-top"}
                      priority
                    />
                  </div>
                  <div className="flex flex-wrap justify-between items-center mt-5 gap-3 w-full">
                    <div className="flex flex-col gap-2">
                      <Heading className={"text-white"}>
                        {gameData.results[0].name}
                      </Heading>
                      <ul className="flex gap-2">
                        <GenereList
                          data={gameData.results[0].genres}
                          elementsClass={
                            "text-white text-xs shadow-md rounded-md px-2 py-1  bg-gray-900 flex place-content-center"
                          }
                        />
                      </ul>
                    </div>
                    <span className="bg-black border border-gray-800 text-white p-1 rounded-md flex place-items-center">
                      Ratings: {gameData.results[0].rating} / 5
                    </span>
                  </div>
                  <div className="text-white mt-5">
                    <p>{gameData.description_raw}</p>
                  </div>
                </div>
                <div className="gallery-grid xl:w-1/2 justify-center items-center xl:justify-end xl:items-start  w-full">
                  <GalleryComponent
                    data={gameData.results[0].short_screenshots}
                    name={gameData.results[0].slug}
                    key={gameData.results[0].slug}
                    itemsWrapperClass={""}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
