import { Divider, Image, Text } from '@chakra-ui/react'
import React from 'react'
import WMO from '../data/WMO'

type Props = {}

export default function DetailsPanel({}: Props) {
  return (
    <div className='flex bg-blue-200 rounded-md items-center overflow-x-scroll p-4 gap-4'>
        <div className='flex flex-col min-w-28'>
            <Text>Thu, Mar 7</Text>
            <Text>London, UK</Text>
        </div>
        <Divider orientation="vertical" height={"40px"}/>
        <div className='flex items-center min-w-40'>
            <Image src={WMO[0].day.image} className=' -m-4'/>
            <div className='flex flex-col'>
                <Text overflowWrap={"normal"}>{WMO[99].day.description}</Text>
                <Text>{`24\u00b0C`}</Text>
            </div>
            
        </div>
        <Divider orientation="vertical" height={"40px"}/>
        <div className='flex flex-col min-w-32'>
            <Text>Precipitation: 1%</Text>
            <Text>Wind speed: 57km/h</Text>
        </div>
    </div>
  )
}