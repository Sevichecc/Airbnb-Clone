import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservation";
import ClientOnly from "../components/ClientOnly"
import EmptyState from '@/app/components/EmptyState';
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>)
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you haven't reserver any trips." />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default TripsPage