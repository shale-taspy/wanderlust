    import React from 'react';
    import { auth } from '../lib/auth';
    import { headers } from 'next/headers';
    import Image from 'next/image';
    import { Button } from '@heroui/react';
    import { BookingDelete } from '../components/BookingDelete';

    const MyBookingsPage = async () => {
    //Token verification in server Component
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });
    //userBased API call
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    const user = session?.user;
    //userBased API using
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const bookings = await res.json();

    return (
        <div className="max-w-7xl mx-auto mt-12">
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <div className="font-medium mt-4 space-y-4">
            {bookings.map((booking) => (
            <div className="flex gap-5 border p-5 min-w-3xl" key={booking._id}>
                <Image
                src={booking.imageUrl}
                alt={booking.destinationName}
                height={300}
                width={260}
                ></Image>
                <div>
                <h1 className="text-xl font-bold">{booking.destinationName}</h1>
                <p className="text-base">
                    {new Date(booking.departureDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    })}
                </p>
                <p>Booking ID: {booking._id}</p>
                <p className="text-base font-medium text-cyan-600">
                    ${booking.price}
                </p>
                <BookingDelete bookingId={booking._id}></BookingDelete>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };;

    export default MyBookingsPage;