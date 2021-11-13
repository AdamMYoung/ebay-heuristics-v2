import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { chunk } from "../utils/array"
import { OrderListing, useOrderListings } from "./useOrderListings"

const REQUEST_BATCH_SIZE = 100

export type GeocodedOrderListing = OrderListing & {
    lat: number
    lng: number
}

export const useGeocodedOrderListings = () => {
    const [geocodedOrderListings, setGeocodedOrderListings] = useState<GeocodedOrderListing[]>([])
    const orderListings = useOrderListings()

    useEffect(() => {
        if (orderListings && orderListings.length > 0) {
            const batches = chunk(orderListings, REQUEST_BATCH_SIZE)

            batches.forEach(async batch => {
                const postcodes = batch.map(orderListing => orderListing.postalCode)
                const geoCodedPostcode = await axios.post(`https://api.postcodes.io/postcodes`, { postcodes })
                    .then(res => res.data.result)

                const mappedBatches = batch.map((entry, index) => ({
                    ...entry,
                    lat: geoCodedPostcode[index].result?.latitude ?? 0,
                    lng: geoCodedPostcode[index].result?.longitude ?? 0
                }))

                setGeocodedOrderListings(existingOrders => [...existingOrders, ...mappedBatches])
            })
        }
    }, [orderListings, setGeocodedOrderListings])

    const isLoaded = useMemo(() => geocodedOrderListings.length === orderListings?.length, [geocodedOrderListings, orderListings])

    return { orders: geocodedOrderListings, isLoaded }
}