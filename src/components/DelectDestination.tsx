"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
type Destination = {
  _id: string;
};

export function DelectDestination({ data }: { data: Destination })  {
    const router = useRouter()
    const handleDelect = async ()=>{
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${data._id}`,{
        method: 'DELETE',
       })
       const result = await res.json()
       console.log(result)
       router.push("/destinations");
       router.refresh()
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-rose-300 rounded-md bg-white text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            Delect
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelect}>Delect</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
