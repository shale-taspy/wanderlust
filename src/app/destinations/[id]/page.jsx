import { DeleteDialogue } from "@/app/components/DeleteDialogue";
import { EditModal } from "@/app/components/EditModal";
import { BookingCard } from "@/app/components/BookingCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FiArrowLeft,
  FiMapPin,
  FiStar,
  FiCalendar,
  FiCheck,
} from "react-icons/fi";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  // 1. Get Token
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token;

  // 2. Pass Token in Authorization Header & Append ID
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://wanderlust-server-sage-six.vercel.app";

  const res = await fetch(`${baseUrl}/destination/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-500">
        Destination not found or unauthorized.
      </div>
    );
  }

  const destination = await res.json();

  if (!destination || destination.message) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-500">
        Destination not found.
      </div>
    );
  }

  const { destinationName, country, duration, imageUrl, description } =
    destination;

  // 3. Fallback image in case imageUrl is missing
  const bannerImage =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "https://placehold.co/1200x800?text=No+Image+Available";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-slate-800">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <FiArrowLeft /> Back to Destinations
        </Link>
        <div className="flex items-center gap-3">
          <EditModal destination={destination} />
          <DeleteDialogue destination={destination} />
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-[380px] md:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-sm">
        <Image
          src={bannerImage}
          alt={destinationName || "Destination Banner"}
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
            <h1 className="text-4xl font-semibold text-slate-900 mb-4">
              {destinationName}
            </h1>

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
              {description ||
                "Discover the magic with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
            </p>
          </div>

          {/* Highlights Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-slate-900">Highlights</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {description ||
                "Discover the magic with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
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
        <BookingCard destination={destination} />
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
