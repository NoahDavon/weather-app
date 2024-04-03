import { Divider, Image, Text } from '@chakra-ui/react'
import React from 'react'
import WMO from '../data/WMO'

type Props = {
    date?: string,
    location?: string,
    temp?: number,
    wind?: number,
    prec?: number,
    wmo?: number
}

export default function DetailsPanel({date, location, temp, wind, prec, wmo}: Props) {
  return (
    date?<div className='flex bg-blue-200 rounded-md items-center overflow-x-scroll p-4 gap-4 flex-shrink-0'>
        <div className='flex flex-col min-w-28'>
            <Text>{new Date(date??"").toLocaleDateString()}</Text>
            <Text>{location}</Text>
        </div>
        <Divider orientation="vertical" height={"40px"}/>
        <div className='flex items-center min-w-40'>
            <Image src={WMO[wmo].day.image} className=' -m-4'/>
            <div className='flex flex-col'>
                <Text overflowWrap={"normal"}>{WMO[wmo].day.description}</Text>
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