import { Divider, Image, Text } from '@chakra-ui/react'
import React from 'react'
import WMO from '../data/WMO'

type Props = {
    date?: string,
    location?: string,
    temp?: number,
    wind?: number,
    prec?: number,
    wmo?: number,
    isDay?: boolean
}

export default function DetailsPanel({date, location, temp, wind, prec, wmo, isDay}: Props) {
  return (
    date?<div className='flex bg-blue-200 rounded-md items-center overflow-x-scroll p-4 gap-4 flex-shrink-0 text-slate-500 drop-shadow-md font-semibold'>
        <div className='flex flex-col min-w-28'>
            <Text>{new Date(date??"").toLocaleDateString([], {weekday:"short", day: "2-digit", month:"short"})}</Text>
            {isDay&&<Text>{(new Date(date??"").toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}))}</Text>}
            <Text>{location}</Text>
        </div>
        <Divider orientation="vertical" height={"40px"}/>
        <div className='flex items-center min-w-40'>
            <Image src={WMO[wmo].day.image} className=' -m-4'/>
            <div className='flex flex-col'>
                <Text overflowWrap={"normal"} padding={"8px"}>{WMO[wmo].day.description}</Text>
                <Text>{`${temp}\u00b0C`}</Text>
            </div>
            
        </div>
        <Divider orientation="vertical" height={"40px"}/>
        <div className='flex flex-col min-w-32'>
            <Text>Precipitation: {prec}</Text>
            <Text>Wind speed: {wind}km/h</Text>
        </div>
    </div>:
    <></>
  )
}