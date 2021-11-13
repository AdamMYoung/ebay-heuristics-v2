import React, { FC, useContext } from "react"

import { GeocodedOrderListing, useGeocodedOrderListings } from "../hooks/useGeocodedOrderListings"


type OrderContextOptions = {
    orders: GeocodedOrderListing[]
    isLoaded: boolean
}

const OrderContext = React.createContext<OrderContextOptions>({
    orders: [],
    isLoaded: false
})

export const useOrders = () => useContext(OrderContext)

export const OrderProvider: FC = ({ children }) => {
    const { isLoaded, orders } = useGeocodedOrderListings()

    return <OrderContext.Provider value={{ orders, isLoaded }}>
        {children}
    </OrderContext.Provider>
}

