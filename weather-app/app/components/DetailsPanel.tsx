import { Divider, Image, Text } from '@chakra-ui/react'
import React from 'react'
import WMO from '../data/WMO'

type Props = {}

export default function DetailsPanel({}: Props) {
  return (
    <div className='flex bg-blue-200 rounded-md items-center overflow-x-scroll p-4 gap-4'>
        <div className='flex flex-col'>
            <Text>Thu, Mar 7</Text>
            <Text>London, UK</Text>
        </div>
        <Divider orientation="vertical"/>
        <div className='flex items-center'>
            <Image src={WMO[0].day.image} className=' -m-4'/>
            <div className='flex flex-col'>
                <Text>{WMO[0].day.description}</Text>
                <Text>{`24\u00b0C`}</Text>
            </div>
            
        </div>
        <Divider orientation="vertical"/>
        <div className='flex flex-col'>
            <Text>Precipitation: 1%</Text>
            <Text>Wind speed: 57km/h</Text>
        </div>
    </div>
  )
}