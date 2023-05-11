'use client'

import { useCallback, useState } from "react"
import { SafeReservation, SafeUser } from "../types"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from '../components/Heading';
import ListingCard from "../components/listings/ListingCard"


interface TripsClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const [deletingId, setDetetingId] = useState('')
  const router = useRouter()

  const onCancel = useCallback((id: string) => {
    setDetetingId(id)

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled')
        router.refresh()
      })
      .catch((error => toast.error(error?.response?.data?.error)))
      .finally(() => setDetetingId(''))

  }, [router])

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
          mt-10
          grid
          gird-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          ">
        {reservations.map((reservation: any) =>
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        )
        }
      </div>
    </Container>
  )
}
export default TripsClient