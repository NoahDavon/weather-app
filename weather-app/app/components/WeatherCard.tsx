
import React from 'react'
import WMO from '../data/WMO'
import { Image, Text } from '@chakra-ui/react'

type Props = {}

export default function WeatherCard({}: Props) {
  return (
    <div className=' bg-blue-400 w-full flex p-4 rounded-md items-center justify-between drop-shadow-md'>
        <Image className='drop-shadow-md' src={WMO[0].day.image}/>
        <Text className=' font-semibold text-white drop-shadow-md' fontSize={"xx-large"}>{`24\u00b0`}</Text>
    </div>
  )
}