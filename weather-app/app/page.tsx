import Image from "next/image";
import WeatherCard from "./components/WeatherCard";
import DetailsPanel from "./components/DetailsPanel";

export default function Home() {
  return (
    <div>
      <div className=" bg-white p-2 flex flex-col gap-2 w-full overflow-y-scroll">
        <WeatherCard/>
        <WeatherCard/>
        <WeatherCard/>
        <WeatherCard/>
        <WeatherCard/>
      </div>
      <DetailsPanel/>
    </div>
  );
}
