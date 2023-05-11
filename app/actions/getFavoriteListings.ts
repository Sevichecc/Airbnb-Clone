import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
  try {
    const currenUser = await getCurrentUser()
    if (!currenUser) {
      return []
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currenUser.favoriteIds || [])]
        }
      }
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString()
    }))

    return safeFavorites
  }
  catch (error: any) {
    throw new Error(error)
  }
}
