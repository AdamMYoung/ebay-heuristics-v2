import eBayApi from "@hendt/ebay-api/lib";
import { useEffect, useState } from "react";
import { useEbay } from "../providers/EbayProvider";

const BATCH_SIZE = 200

export type OrderItem = {
    title: string;
    cost: string;
}

export type OrderListing = {
    postalCode: string
    username: string
    date: Date
    address: string
    itemsOrdered: OrderItem[]
}

const getOrders = async (ebay: eBayApi, skip: number = 0) => {
    return await ebay.sell.fulfillment.getOrders({ limit: BATCH_SIZE, offset: skip }).then((res) => {
        const listings: OrderListing[] = res.orders.map((order: any) => ({
            address: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.addressLine1,
            postalCode: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.postalCode,
            username: order.buyer.username,
            date: order.creationDate,
            itemsOrdered: order.lineItems.map((item: any) => ({ title: item.title, cost: item.lineItemCost.value }))
        }));

        return { hasMore: !!res.next, listings };
    });
}

export const useOrderListings = () => {
    const [orders, setOrders] = useState<OrderListing[]>();
    const { isAuthenticated, eBay } = useEbay();

    useEffect(() => {
        const exec = async () => {
            if (isAuthenticated) {
                let hasMore = true;
                let skip = 0;
                const orders: OrderListing[] = []

                while (hasMore) {
                    const { listings, hasMore: hasMoreOrders } = await getOrders(eBay, skip)

                    orders.push(...listings);
                    skip += BATCH_SIZE;
                    hasMore = hasMoreOrders;
                }

                setOrders(orders)
            }
        }
        exec()

    }, [isAuthenticated, eBay]);

    return orders

}