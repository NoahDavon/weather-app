
import React from 'react'
import WMO from '../data/WMO'
import { Image, Text, Button } from '@chakra-ui/react'

type Props = {
  temp : number,
  wmo: number, 
  date: string, 
  isDaily? : boolean,
  onClick: () => void;
}

export default function WeatherCard({temp, wmo, date, onClick, isDaily}: Props) {
  return (
    <button className=' bg-blue-400 w-full flex p-4 rounded-md items-center justify-between drop-shadow-md' onClick={onClick}>
        {<Text className=' font-semibold text-white drop-shadow-md' fontSize={"xx-large"}>{isDaily?(new Date(date)).toLocaleDateString([], {weekday:"short"}): (new Date(date)).toLocaleTimeString([], {hour: "numeric"})}</Text>}
        <Image className='drop-shadow-md -m-6' src={(WMO[wmo??0]).day.image}/>
        <Text className=' font-semibold text-white drop-shadow-md' fontSize={"xx-large"}>{`${temp}\u00b0`}</Text>
    </button>
  )
}