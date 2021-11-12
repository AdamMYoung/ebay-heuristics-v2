import { useEffect, useMemo, useState } from "react";
import { useEbay } from "../providers/EbayProvider";

export type OrderListing = {
    postalCode: string
    username: string
    date: Date
    itemsOrdered: string[]
}

export const useOrderListings = () => {
    const [orders, setOrders] = useState<OrderListing[]>();
    const { isAuthenticated, eBay } = useEbay();

    //TODO Iterate through all pages, then transform data.
    useEffect(() => {
        if (isAuthenticated) {
            eBay.sell.fulfillment.getOrders({ limit: 200 }).then((res) => {
                const listings: OrderListing[] = res.orders.map((order) => ({
                    postalCode: order.fulfillmentStartInstructions[0].finalDestinationAddress.postalCode,
                    username: order.buyer.username,
                    date: order.creationDate,
                    itemsOrdered: order.lineItems.map((item) => item.title)
                }));

                setOrders(listings);
            });
        }

    }, [isAuthenticated, eBay]);

    return orders

}