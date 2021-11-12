import axios from "axios"
import { useEffect, useState } from "react"
import { chunk } from "../utils/array"
import { OrderListing, useOrderListings } from "./useOrderListings"

const REQUEST_BATCH_SIZE = 100

type GeocodedOrderListing = OrderListing & {
    lat: number
    lng: number
}

export const useGeocodedOrderListings = (): GeocodedOrderListing[] => {
    const [geocodedOrderListings, setGeocodedOrderListings] = useState<GeocodedOrderListing[]>([])
    const orderListings = useOrderListings()

    //TODO Geocode postal addresses of orders.
    useEffect(() => {
        if (orderListings && orderListings.length > 0) {
            const batches = chunk(orderListings, REQUEST_BATCH_SIZE)

            batches.forEach(async batch => {
                const postcodes = batch.map(orderListing => orderListing.postalCode)
                const geoCodedPostcode = await axios.post(`https://api.postcodes.io/postcodes`, { postcodes: postcodes.join(",") })
                    .then(res => res.data.result)

                const mappedBatches = batch.map((entry, index) => ({
                    ...entry,
                    lat: geoCodedPostcode[index].result.latitude,
                    lng: geoCodedPostcode[index].result.longitude
                }))

                setGeocodedOrderListings(existingOrders => [...existingOrders, ...mappedBatches])
            })
        }
    }, [orderListings, setGeocodedOrderListings])

    return geocodedOrderListings


}