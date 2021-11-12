import { Stack, Heading, Button, Text, Spinner, HStack, useColorMode, Divider, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { useEbay } from '../providers/EbayProvider';
import { useOrders } from '../providers/OrderProvider';

export const Navigation = () => {
	const [hideDetails, setHideDetails] = useState(false);
	const { colorMode } = useColorMode()
	const { isAuthenticated, login } = useEbay();
	const { isLoading, orders } = useOrders()

	const amountEarned = orders.reduce((acc, order) => acc + order.itemsOrdered.reduce((list, item) => list + parseFloat(item.cost), 0), 0)

	const itemsSold = useMemo(() => orders.reduce<string[]>((acc, order) => {
		const items = order.itemsOrdered.map(i => i.title)

		acc.push(...items)
		return acc
	}, []), [orders])

	const groupedItems = useMemo(() => {
		return itemsSold.reduce((prev, item) => {
			if (item in prev) {
				prev[item]++;
			}
			else {
				prev[item] = 1;
			}
			return prev;
		}, {} as { [key: string]: number })
	}, [itemsSold])


	return (
		<Stack
			pointerEvents="auto"
			spacing="4"
			bg={colorMode === "dark" ? "gray.800" : "white"}
			p="4"
			rounded="md"
			shadow="md"
		>
			<Heading size="md">eBay Heuristics V2</Heading>

			<Button disabled={isAuthenticated} onClick={login}>{!isAuthenticated ? "Login to eBay" : "Logged in"}</Button>

			{isAuthenticated && isLoading && <HStack><Spinner /><Text>Loading order data...</Text></HStack>}
			{!hideDetails && isAuthenticated && !isLoading && <>
				<Stack spacing="2">
					<Heading size="md" fontWeight="bold">Stats</Heading>
					<Text>Over the past 90 days, you have:</Text>
					<Text>Had <b>{orders.length}</b> orders</Text>
					<Text>Earned <b>£{amountEarned}</b></Text>
					<Divider />
					<Text>Breakdown:</Text>
					<VStack maxH="32" overflow="none" overflowY="auto">
						{Object.keys(groupedItems).map(key => <Text>Sold {groupedItems[key]} of {key}</Text>)}
					</VStack>
				</Stack>
				<Button onClick={() => setHideDetails(visible => !visible)}>{hideDetails ? "Show" : "Hide"} details</Button>
			</>}
		</Stack>
	);
};
