"use client";

const ImageComponent = dynamic(() => import("@/components/imageComponent"));
import { Suspense, useEffect, useState } from "react";
import GalleryComponent from "@/components/gallery";
import GenereList from "@/components/genereList";
import SearchBar from "@/components/searchBar";
import Heading from "@/components/heading";
import Button from "@/components/button";
import { normalize } from "./fetchData";
import { fetchData } from "./fetchData";
import dynamic from "next/dynamic";
import Loading from "./loading";

export default function Home() {
  const [gameData, setGameData] = useState(null);
  const [searchText, setSearchText] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      searchText ? setGameData(await fetchData({ search: searchText })) : null;
      // setLoading(true);
    })();
  }, [searchText]);

  function handleSubmit(e) {
    let search = normalize(e.target.elements.search.value);
    e.preventDefault();
    if (search !== searchText && search !== "") {
      setSearchText(search);
    }
  }

  return (
    <>
      <main
        style={{
          "--image-url": `url(${
            gameData ? gameData.results[0].background_image : ""
          })`,
        }}
        className={`flex  flex-col bg-[image:var(--image-url)]`}>
        <div className="p-16 h-[100dvh]">
          <form
            className="flex gap-2 w-full justify-center"
            onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <SearchBar id={"search"} />
            <Button text={"search"} type={"submit"} />
          </form>
          <div className="flex mt-20">
            {gameData == null ? (
              <Heading>Hey there!</Heading>
            ) : (
              <div className="flex justify-between gap-10 w-full flex-col xl:flex-row">
                <div className="flex flex-col items-center xl:items-start">
                  <div className="w-[600px]">
                    <ImageComponent
                      src={gameData.results[0].background_image}
                      alt={gameData.results[0].slug}
                      width={600}
                      height={100}
                      className={""}
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
                    <span className="bg-violet-500 text-white p-1 rounded-md flex place-items-center">
                      Ratings: {gameData.results[0].rating} / 5
                    </span>
                  </div>
                </div>
                <div className="gallery-grid justify-center items-center xl:justify-end xl:items-start xl:max-h-[70dvh] xl:overflow-scroll w-full">
                  <GalleryComponent
                    data={gameData.results[0].short_screenshots}
                    name={gameData.results[0].slug}
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
