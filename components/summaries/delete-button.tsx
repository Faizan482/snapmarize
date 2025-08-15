"use client"
import { Loader, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { useState, useTransition } from "react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import toast from "react-hot-toast";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition()
  //handle the delete
  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId })
      if (!result.success) {
        toast.error("Failed to delete summary. Please try again.");
      }
      setOpen(false);
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="text-gray-400 bg-gray-50 border border-gray-200  hover:text-rose-600 hover:bg-rose-50 ">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white shadow-lg rounded-lg p-6">
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" className=" bg-gray-50 border border-gray-200  hover:text-gray-600 hover:bg-gray-100 " onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" className=" bg-gray-900 border  hover:bg-gray-600 " onClick={handleDelete}>
            {isPending ? <Loader size={12} /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
}
