import React, { FC, useContext } from "react"

import { GeocodedOrderListing, useGeocodedOrderListings } from "../hooks/useGeocodedOrderListings"


type OrderContextOptions = {
    orders: GeocodedOrderListing[]
    isLoading: boolean
}

const OrderContext = React.createContext<OrderContextOptions>({
    orders: [],
    isLoading: true
})

export const useOrders = () => useContext(OrderContext)

export const OrderProvider: FC = ({ children }) => {
    const orders = useGeocodedOrderListings()

    return <OrderContext.Provider value={{ orders, isLoading: !orders }}>
        {children}
    </OrderContext.Provider>
}

