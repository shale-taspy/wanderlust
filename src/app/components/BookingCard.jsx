'use client';
import { useState } from 'react';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { DateField, Label } from '@heroui/react';
import { authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

export const BookingCard = ({ destination }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [departureDate, setDepartureDate] = useState(null);

    // Destructured props matching your image
    const { price, _id, destinationName, imageUrl, country } = destination || {};

    const handleBooking = async () => {
        // bookingData object structure exactly as shown in your code
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            destinationId: _id,
            destinationName,
            price,
            imageUrl,
            country,
            departureDate: departureDate ? new Date(departureDate) : null,
        };
        //Token Verification in client component
            const {data:tokenData} = await authClient.token()
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(bookingData),
              },
            );
        const data = await res.json()
        toast.success("You booked successfully", {
                        position: "bottom-right"
                })
    };

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md space-y-6 sticky top-6">
            <div>
                <span className="text-xs text-slate-400 font-medium block mb-1">Starting from</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#11A4C4]">${price}</span>
                </div>
                <span className="text-xs text-slate-400 font-normal">per person</span>
            </div>

            {/* Date Picker using HeroUI DateField */}
            <div className="space-y-2">
                <DateField 
                    value={departureDate} 
                    onChange={setDepartureDate} 
                    className="w-full" 
                    name="date"
                >
                    <Label className="text-xs font-medium text-slate-600 mb-1 block">Date</Label>
                    <DateField.Group className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm flex items-center">
                        <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>
            </div>

            <button 
                onClick={handleBooking}
                className="w-full py-3 px-4 bg-[#11A4C4] hover:bg-[#0e8da9] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
                <span>Book Now</span>
                <FiArrowRight />
            </button>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <FiCheck className="text-emerald-500" />
                    <span>Free cancellation up to 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiCheck className="text-emerald-500" />
                    <span>Travel insurance included</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiCheck className="text-emerald-500" />
                    <span>24/7 customer support</span>
                </div>
            </div>
        </div>
    );
};