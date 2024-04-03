"use client";
import WeatherCard from "./components/WeatherCard";
import DetailsPanel from "./components/DetailsPanel";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Text,
  IconButton,
  Input,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import Fuse from "fuse.js";
import cities from "./data/cities";
export default function Home() {
  const options = {
    includeScore: false,
    keys: ["name"]
  }
  const fuse = new Fuse(cities, options);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState<{
    name: string;
    lat: string;
    lng: string;
    country: string;
    admin1: string;
    admin2: string;
}[]>();
  const [selectedCity, setSelectedCity] = useState({
    name: "London",
    lat: "51.50853",
    lng: "-0.12574",
    country: "GB",
    admin1: "ENG",
    admin2: "GLA",
  });
  async function getWeatherData(city : any) {
    return await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}4&longitude=${city.lng}&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max,wind_speed_10m_max`
    ).then((r) => r.json());
  }
  const { isLoading, data } = useQuery({
    queryKey: [selectedCity],
    queryFn: () => getWeatherData(selectedCity),
  });
  console.log(data);
  const [details, setDetails] = useState<{
    date?: string;
    temp?: number;
    wind?: number;
    prec?: number;
    wmo?: number;
    location?: string;
    isDay?: boolean;
  }>({
    date: undefined,
    temp: undefined,
    wind: undefined,
    prec: undefined,
    wmo: undefined,
    location: undefined,
    isDay: false,
  });
  return (
    <div className=" bg-white p-2 flex flex-col gap-2 h-[100vh] ">
      <Text className=' font-semibold text-slate-500 drop-shadow-md' fontSize={"xxx-large"}>{`${selectedCity.name}, ${selectedCity.country}`}</Text>
      <div className="flex bg-slate-50 rounded-full w-full p-4 items-center">
        <Popover isOpen={(search?.length??0) > 0}>
          <PopoverTrigger>
            <Input
              placeholder="Search for city..."
              border={"none"}
              value={q}
              onChange={(e)=> setQ(e.target.value)}
              _active={{ border: 0 }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <List>
                {search?.map(x => <ListItem key={x.lat.toString()+ x.lng.toString()}><button onClick={()=> {
                  setSelectedCity(x);
                  setQ(""),
                  setSearch(undefined)
                }}>{`${x.name}, ${x.country}`}</button></ListItem>)}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <IconButton as={SearchIcon} aria-label="search" size={"xs"} onClick={()=> setSearch(fuse.search(q).map(({item}) => item))}/>
      </div>

      <DetailsPanel {...details} />
      <Tabs
        variant={"soft-rounded"}
        colorScheme="blue"
        flexBasis={0}
        flexGrow={1}
        minHeight={0}
        overflowY={"scroll"}
      >
        <TabList justifyContent={"space-around"}>
          <Tab>Today</Tab>
          <Tab>Tomorrow</Tab>
          <Tab>7 Day</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-2 w-full overflow-y-scroll basis-0 flex-grow">
              {(data?.hourly?.time as string[])?.slice(0, 24).map((x, i) => (
                <WeatherCard
                  onClick={() =>
                    setDetails({
                      date: x,
                      temp: data.hourly.temperature_2m[i],
                      wind: data.hourly.wind_speed_10m[i],
                      prec: data.hourly.precipitation_probability[i],
                      wmo: data.hourly.weather_code[i],
                      location: `${selectedCity.name}, ${selectedCity.country}`,
                      isDay: true,
                    })
                  }
                  temp={data.hourly.temperature_2m[i]}
                  wmo={data.hourly.weather_code[i]}
                  date={x}
                  key={i.toString()}
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-2 w-full overflow-y-scroll basis-0 flex-grow">
              {(data?.hourly?.time as string[])?.slice(24, 48).map((x, i) => (
                <WeatherCard
                  onClick={() =>
                    setDetails({
                      date: x,
                      temp: data.hourly.temperature_2m[i + 24],
                      wind: data.hourly.wind_speed_10m[i + 24],
                      prec: data.hourly.precipitation_probability[i + 24],
                      wmo: data.hourly.weather_code[i + 24],
                      location: `${selectedCity.name}, ${selectedCity.country}`,
                      isDay: true,
                    })
                  }
                  temp={data.hourly.temperature_2m[i + 24]}
                  wmo={data.hourly.weather_code[i + 24]}
                  date={x}
                  key={(i + 24).toString()}
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-2 w-full overflow-y-scroll basis-0 flex-grow">
              {(data?.daily?.time as string[])?.map((x, i) => (
                <WeatherCard
                  isDaily
                  onClick={() =>
                    setDetails({
                      date: x,
                      temp: data.daily.temperature_2m_max[i],
                      wind: data.daily.wind_speed_10m_max[i],
                      prec: data.daily.precipitation_probability_max[i],
                      wmo: data.daily.weather_code[i],
                      location: `${selectedCity.name}, ${selectedCity.country}`,
                      isDay: true,
                    })
                  }
                  temp={data.daily.temperature_2m_max[i]}
                  wmo={data.daily.weather_code[i]}
                  date={x}
                  key={i.toString()}
                />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
