'use client'

import { useCallback, useState } from "react"
import { SafeListing, SafeUser } from "../types"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from '../components/Heading';
import ListingCard from "../components/listings/ListingCard"

interface ProperitiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null
}

const ProperitiesClient: React.FC<ProperitiesClientProps> = ({
  listings,
  currentUser
}) => {
  const [deletingId, setDetetingId] = useState('')
  const router = useRouter()

  const onCancel = useCallback((id: string) => {
    setDetetingId(id)

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Properties deleted')
        router.refresh()
      })
      .catch((error => toast.error(error?.response?.data?.error)))
      .finally(() => setDetetingId(''))

  }, [router])

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
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
        {listings.map((listing) =>
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        )
        }
      </div>
    </Container>
  )
}
export default ProperitiesClient