'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { authClient } from '../lib/auth-client';
import {Avatar, Button} from "@heroui/react";

const Navbar = () => {
    const { 
        data: session, 
    } = authClient.useSession() 
    
    const user = session?.user

    const handleSignOut= async()=>{
        await authClient.signOut();
    }

    return (
      <nav className="flex justify-between bg-white p-3 items-center text-center">
        <ul className="flex gap-5 text-base font-medium">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/destinations"}>Destinations</Link>
          </li>
          <li>
            <Link href={"/my-bookings"}>My Bookings</Link>
          </li>
          <li>
            <Link href={"/admin"} prefetch={false}>
              Admin
            </Link>
          </li>
          <li>
            <Link href={"/add-destination"}>Add Destination</Link>
          </li>
        </ul>
        <div>
          <Image
            src={"/assets/Wanderlast.png"}
            width={150}
            height={200}
            alt="WonderLast"
            className="mr-70"
          />
        </div>

        <ul className="flex items-center gap-5 text-base font-medium">
          <li>
            <Link href={"/profile"} prefetch={false}>
              Profile
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Avatar size="md">
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt="Large Avatar"
                    src={user?.image}
                  />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </li>
              <li>
                <Button
                  onClick={handleSignOut}
                  variant="danger"
                  className={"rounded-none"}
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/auth/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/auth/signup"}>SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
};

export default Navbar;