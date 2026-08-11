import React from 'react';
import DestinationCard from '../components/DestinationCard';

const DestinationsPage = async() => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
    );
    const destinations = await res.json()

    return (
        <div className=''>
            <h1 className='text-3xl font-bold mx-auto container mt-12 mb-8 text-cyan-500'>Explore All Destination</h1>
            <div className='grid grid-cols-3 mx-auto container gap-6'>
                {
                    destinations.map(destination=>
                    
                    <div key={destination._id}>
                        <DestinationCard destination={destination}></DestinationCard>
                    </div>)
                }
            </div>
        </div>
    );
};

export default DestinationsPage;