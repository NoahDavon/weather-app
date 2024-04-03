'use client'
import WeatherCard from "./components/WeatherCard";
import DetailsPanel from "./components/DetailsPanel";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import cities from "./data/cities";
export default function Home() {
  const [selectedCity, setSelectedCity] = useState(cities.find(x => x.name == "London"));
  async function getWeatherData(city = selectedCity){
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city?.lat}&longitude=${city?.lng}.7531&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max`)
  }
  const {isLoading, data} = useQuery({
    queryKey: [selectedCity],
    queryFn: () => getWeatherData(selectedCity),
  })
  return (
    <div className=" bg-white p-2 flex flex-col gap-2 h-[100vh] ">
      <div className="flex bg-slate-50 rounded-full w-full p-4 items-center">
        <SearchIcon/>
        <Input placeholder="Search for city..." border={"none"} _active={{border: 0}}/>
      </div>
      <DetailsPanel/>
      <Tabs variant={"soft-rounded"} colorScheme="blue">
        <TabList justifyContent={"space-around"}>
          <Tab>
            Today
          </Tab>
          <Tab>
            Tomorrow
          </Tab>
          <Tab>
            7 Day
          </Tab>
        </TabList>
      </Tabs>
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
