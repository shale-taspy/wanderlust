"use client";

import {AlertDialog, Button} from "@heroui/react";
import toast from "react-hot-toast";
import { FaTrashCan } from 'react-icons/fa6';
export function BookingDelete({bookingId}) {
  //Cancel the booking function
  const handleCancelBooking = async()=>{
    const res = await fetch(`http://localhost:7000/booking/${bookingId}`, {
      method:'DELETE',
      headers:{
        'content-type':'application/json'
      }
    })
    const data = await res.json()
    window.location.reload()
     toast.danger("Booking Canceled")

  }
  return (
    <AlertDialog>
      <Button className={'rounded-none border-red-600 text-red-500 mt-2'} variant='outline'><FaTrashCan></FaTrashCan> Cancel</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel the booking and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleCancelBooking} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}