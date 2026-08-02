import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const Navbar = () => {
    return (
        <nav className='flex justify-between bg-white p-3 items-center text-center'>
            <ul className='flex gap-5 text-base font-medium'>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/destinations'}>Destinations</Link></li>
                <li><Link href={'/my-bookings'}>My Bookings</Link></li>
                <li><Link href={'/admin'}>Admin</Link></li>
                <li><Link href={'/add-destination'}>Add Destination</Link></li>
            </ul>
            <div>
                <Image
                src={'/assets/Wanderlast.png'}
                width={150}
                height={200}
                alt='WonderLast'
                className='mr-70'
                /> 
            </div>
            
            <ul className='flex gap-5 text-base font-medium'>
                <li><Link href={'/profile'}>Profile</Link></li>
                <li><Link href={'/auth/login'}>Login</Link></li>
                <li><Link href={'/auth/signup'}>SignUp</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;