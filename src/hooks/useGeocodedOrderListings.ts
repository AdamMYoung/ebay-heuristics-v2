import { useEffect, useState } from "react"
import { OrderListing, useOrderListings } from "./useOrderListings"


type GeocodedOrderListing = OrderListing & {
    lat: number
    lng: number
}

export const useGeocodedOrderListings = (): GeocodedOrderListing[] => {
    const [geocodedOrderListings, setGeocodedOrderListings] = useState<GeocodedOrderListing[]>([])
    const orderListings = useOrderListings()

    //TODO Geocode postal addresses of orders.
    useEffect(() => {

    }, [orderListings])

    return geocodedOrderListings


}