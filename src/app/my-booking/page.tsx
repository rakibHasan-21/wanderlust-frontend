import BookCard from "@/components/bookCard/BookCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type Booking = {
  _id: string;
  userName: string;
  email: string;
  image?: string;
  destinationName: string;
  country: string;
  price: string;
  duration: string;
  departureDate?: string;
  selectedDate: string;
  bookingDate: string;
};

const MyBooking = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-[1180px] px-4 py-10">
        <h2 className="text-xl font-semibold">Please sign in</h2>

        <p className="mt-2 text-gray-500">Sign in to view your bookings.</p>
      </div>
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${user.email}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const result: Booking[] = await res.json();

  return (
<section className="min-h-screen bg-gray-50">
  <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        My Bookings
      </h2>

      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        Manage and view your upcoming travel plans
      </p>
    </div>

    {result.length > 0 ? (
      <div className="flex flex-col gap-5">
        {result.map((book) => (
          <BookCard key={book._id} booking={book} />
        ))}
      </div>
    ) : (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          No bookings yet
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Your travel bookings will appear here.
        </p>
      </div>
    )}
  </div>
</section>
  );
};

export default MyBooking;
