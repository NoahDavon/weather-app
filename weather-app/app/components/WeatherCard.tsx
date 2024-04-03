
import React from 'react'
import WMO from '../data/WMO'
import { Image, Text, Button } from '@chakra-ui/react'

type Props = {
  temp : number,
  wmo: number, 
  date: string, 
  onClick: () => void;
}

export default function WeatherCard({temp, wmo, date, onClick}: Props) {
  return (
    <button className=' bg-blue-400 w-full flex p-4 rounded-md items-center justify-between drop-shadow-md' onClick={onClick}>
        <Text className=' font-semibold text-white drop-shadow-md' fontSize={"xx-large"}>{(new Date(date)).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</Text>
        <Image className='drop-shadow-md -m-6' src={(WMO[wmo]).day.image}/>
        <Text className=' font-semibold text-white drop-shadow-md' fontSize={"xx-large"}>{`${temp}\u00b0`}</Text>
    </button>
  )
}