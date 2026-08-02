import { DeleteDialogue } from '@/app/components/DeleteDialogue';
import { EditModal } from '@/app/components/EditModal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowLeft, FiEdit, FiTrash2, FiMapPin, FiStar, FiCalendar, FiCheck, FiArrowRight } from 'react-icons/fi';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:7000/destination/${id}`, { cache: 'no-store' });
    const destination = await res.json();
    
    const { destinationName, country, category, price, duration, date, imageUrl, description, _id } = destination;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 text-slate-800">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between mb-6">
                <Link href="/destinations" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                    <FiArrowLeft /> Back to Destinations
                </Link>
                <div className="flex items-center gap-3">
                    {/* Edit button */}
                    <EditModal destination={destination}></EditModal>
                    {/* Delete button */}
                    <DeleteDialogue destination={destination}></DeleteDialogue>
                </div>
            </div>

            {/* Banner Image */}
            <div className="relative w-full h-[380px] md:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-sm">
                <Image
                    src={imageUrl}
                    alt={destinationName || 'Destination Banner'}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Left Column (Details) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Details */}
                    <div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-2">
                            <FiMapPin className="text-slate-400" />
                            <span>{country}</span>
                        </div>
                        <h1 className="text-4xl font-semibold text-slate-900 mb-4">{destinationName}</h1>
                        
                        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
                            <div className="flex items-center gap-1.5">
                                <FiStar className="text-amber-500 fill-amber-500" />
                                <span className="font-bold text-slate-900">4.9</span>
                                <span className="text-slate-400">(234 reviews)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FiCalendar className="text-slate-400" />
                                <span>{duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-medium text-slate-900">Overview</h2>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {description || 'Discover the magic with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.'}
                        </p>
                    </div>

                    {/* Highlights Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-medium text-slate-900">Highlights</h2>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {description || 'Discover the magic with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <FiCheck className="text-emerald-500 shrink-0" />
                                <span>Luxury beachfront accommodation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheck className="text-emerald-500 shrink-0" />
                                <span>Visit Uluwatu Temple at sunset</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheck className="text-emerald-500 shrink-0" />
                                <span>Traditional Balinese spa treatment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheck className="text-emerald-500 shrink-0" />
                                <span>Private beach dinner experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheck className="text-emerald-500 shrink-0" />
                                <span>Sunrise trek to Mount Batur</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Booking Card Sidebar) */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md space-y-6 sticky top-6">
                    <div>
                        <span className="text-xs text-slate-400 font-medium block mb-1">Starting from</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-[#11A4C4]">${price}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-normal">per person</span>
                    </div>

                    {/* Date Input Display */}
                    <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 border border-slate-100 font-medium">
                        {date || '05/15/2026'}
                    </div>

                    {/* Action Button */}
                    <button className="w-full py-3 px-4 bg-[#11A4C4] hover:bg-[#0e8da9] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer">
                        <span>Book Now</span>
                        <FiArrowRight />
                    </button>

                    {/* Benefits List */}
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
            </div>
        </div>
    );
};

export default DestinationDetailsPage;