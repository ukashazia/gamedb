"use client";

import Button from "@/components/button";
import Heading from "@/components/heading";
import React from "react";
const ImageComponent = React.lazy(() => import("@/components/imageComponent"));
import SearchBar from "@/components/searchBar";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import GalleryComponent from "@/components/gallery";
import RAWG_API_KEY from "@/config";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [gameData, setGameData] = useState(null);
  // useEffect(() => {
  //   // setGameData(fetchData({ search: "" }));
  // }, [searchText]);
  return (
    <main
      style={{
        "--image-url": `url(${
          gameData ? gameData.results[0].background_image : ""
        })`,
      }}
      className={`flex min-h-screen flex-col bg-[image:var(--image-url)]`}>
      <div className="p-16 h-screen">
        <div className="flex gap-2 w-full justify-center">
          <SearchBar
            onInput={(e) => setSearchText(e.target.value)}
            onKeyDown={async (e) => {
              e.key === "Enter"
                ? setGameData(await fetchData({ search: searchText }))
                : null;
            }}
          />
          <Button
            text={"search"}
            onClick={async () =>
              setGameData(await fetchData({ search: searchText }))
            }
          />
        </div>
        <div className="flex mt-20">
          {gameData == null ? (
            <Heading text={"Hey there!"} />
          ) : (
            <div className="flex justify-between gap-10 w-full flex-col xl:flex-row">
              <div className="flex flex-col items-center xl:items-start">
                <div className="w-[600px]">
                  <Suspense fallback={<Loading />}>
                    <ImageComponent
                      src={gameData.results[0].background_image}
                      alt={gameData.results[0].slug}
                      width={600}
                      height={100}
                      className={
                        "hover:scale-105 transition-transform transition-300"
                      }
                    />
                  </Suspense>
                </div>
                <div className="flex justify-between items-center mt-5 gap-3 w-full">
                  <Heading
                    text={gameData.results[0].name}
                    className={"text-white"}
                  />
                  <span className="bg-violet-500 text-white p-1 rounded-md flex place-items-center">
                    Ratings: {gameData.results[0].rating} / 5
                  </span>
                </div>
              </div>
              <div className="gallery-grid justify-center items-center xl:justify-end xl:items-start max-h-[70dvh] overflow-scroll w-full">
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
  );
}

async function fetchData(params) {
  let baseUrl = "https://api.rawg.io/api/games";
  const key = RAWG_API_KEY;
  console.log(key);

  let options = {
    key: key,
    page: 1,
    page_size: 1,
    search: params.search.trim().toLowerCase().replace(/\s+/g, "-"),
  };

  const queryString = Object.keys(options)
    .map((key) => `${key}=${options[key]}`)
    .join("&");

  baseUrl = `${baseUrl}?${queryString}`;

  const resp = await fetch(baseUrl);
  const data = await resp.json();
  console.log(data);
  return data;
}
