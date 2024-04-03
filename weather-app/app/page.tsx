import Image from "next/image";
import WeatherCard from "./components/WeatherCard";

export default function Home() {
  return (
    <div className=" bg-white p-2 flex flex-col gap-2 w-full h-full overflow-y-scroll">
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
    </div>
  );
}
