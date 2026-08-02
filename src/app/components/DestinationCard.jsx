import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { TfiArrowTopRight } from 'react-icons/tfi';
import {Button} from "@heroui/react";

const DestinationCard = ({ destination }) => {
    const { destinationName, country, category, price, duration, date, imageUrl, description, _id } = destination;
    
    return (
        <div className="bg-base-200 items-center mb-4 rounded-xl overflow-hidden">
            <div className="relative w-full h-56">
                <Image
                    src={imageUrl}
                    alt={destinationName || 'Destination image'}
                    fill
                    className="object-cover rounded-t-xl"
                />
            </div>
            <div className="card-body">
                <h2 className="card-title flex gap-1.5 items-center text-base font-normal mt-3"><FiMapPin />{country}</h2>
                <div className='flex justify-between text-base font-bold text-black mt-2'>
                    <p>{destinationName}</p>
                    <p>${price}/Person</p>
                </div>
                <p className='flex gap-2 items-center font-medium text-base mt-2'><IoCalendarNumberOutline />{duration}</p>
                <div className="card-actions justify-end">
                    <Link href={`/destinations/${_id}`}><Button variant='tertiary' className="cursor-pointer flex gap-2 items-center mt-3 p-4 font-semibold text-base">Book now <TfiArrowTopRight /></Button></Link>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;