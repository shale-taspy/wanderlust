"use client";

import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export function DeleteDialogue({destination}) {
    const { destinationName, country, category, price, duration, date, imageUrl, description, _id } = destination;
    const handleDelete = async()=>{
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          },
        );
        
        const data = await res.json()
        redirect('/destinations')
        console.log(data)
    }
  return (
    <AlertDialog>
        <AlertDialog.Trigger>
            <button className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-500 rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors cursor-pointer">
                        <FiTrash2 className="text-xs" /> Delete
                    </button>
        </AlertDialog.Trigger>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>the {destinationName} destination </strong> and all of its
                data? This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Destination
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}