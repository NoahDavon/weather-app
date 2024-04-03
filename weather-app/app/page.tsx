'use client'
import WeatherCard from "./components/WeatherCard";
import DetailsPanel from "./components/DetailsPanel";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className=" bg-white p-2 flex flex-col gap-2 h-[95vh] ">
      <div className="flex bg-slate-50 rounded-full w-full p-4 items-center">
        <SearchIcon/>
        <Input placeholder="Search for city..." border={"none"} _active={{border: 0}}/>
      </div>
      <DetailsPanel/>
      <div className="flex flex-col gap-2 w-full overflow-y-scroll basis-0 flex-grow">
        <WeatherCard/>
        <WeatherCard/>
        <WeatherCard/>
        <WeatherCard/>
        <WeatherCard/>
      </div>
    </div>
  );
}
