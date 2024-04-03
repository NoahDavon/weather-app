"use client";
import WeatherCard from "./components/WeatherCard";
import DetailsPanel from "./components/DetailsPanel";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import cities from "./data/cities";
export default function Home() {
  
  // const [selectedCity, setSelectedCity] = useState(
  //   cities.find((x) => x.name == "London")
  // );
  async function getWeatherData(city = null) {
    return await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=35.6854&longitude=139.7531&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max,wind_speed_10m_max`
    ).then(r => r.json());
  }
  const { isLoading, data } = useQuery({
    queryKey: ["selectedCity"],
    queryFn: () => getWeatherData(),
  });
  console.log(data)
  const [details, setDetails] = useState<{
    date?: string,
    temp?: number,
    wind?: number,
    prec?: number,
    wmo?: number,
    location?: string
  }>({
    date: undefined,
    temp: undefined,
    wind: undefined,
    prec: undefined,
    wmo: undefined,
    location: undefined
  })
  return (
    <div className=" bg-white p-2 flex flex-col gap-2 h-[100vh] ">
      <div className="flex bg-slate-50 rounded-full w-full p-4 items-center">
        <SearchIcon />
        <Input
          placeholder="Search for city..."
          border={"none"}
          _active={{ border: 0 }}
        />
      </div>
      <DetailsPanel {...details}  />
      <Tabs variant={"soft-rounded"} colorScheme="blue" flexBasis={0} flexGrow={1} minHeight={0} overflowY={"scroll"}>
        <TabList justifyContent={"space-around"}>
          <Tab>Today</Tab>
          <Tab>Tomorrow</Tab>
          <Tab>7 Day</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-2 w-full overflow-y-scroll basis-0 flex-grow">
              {(data?.hourly?.time as string[])?.slice(0,24).map((x, i) => <WeatherCard onClick={()=> setDetails({
                date: x,
                temp: data.hourly.temperature_2m[i],
                wind: data.hourly.wind_speed_10m[i],
                prec: data.hourly.precipitation_probability[i],
                wmo: data.hourly.weather_code[i],
                location: "London, UK"
              })} temp={data.hourly.temperature_2m[i]} wmo={data.hourly.weather_code[i]} date={x} key={i.toString()}/>)}
            </div>
          </TabPanel>
          <TabPanel>
          <div className="flex flex-col gap-2 w-full overflow-y-scroll basis-0 flex-grow">
              {(data?.hourly?.time as string[])?.slice(24,48).map((x, i) => <WeatherCard onClick={()=> setDetails({
                date: x,
                temp: data.hourly.temperature_2m[i+24],
                wind: data.hourly.wind_speed_10m[i+24],
                prec: data.hourly.precipitation_probability[i+24],
                wmo: data.hourly.weather_code[i+24],
                location: "London, UK"
              })} temp={data.hourly.temperature_2m[i+24]} wmo={data.hourly.weather_code[i+24]} date={x} key={(i+24).toString()}/>)}
            </div>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
