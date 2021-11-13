import { Stack, Heading, Button, Text, Spinner, HStack, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

import { useEbay } from '../providers/EbayProvider';
import { useOrders } from '../providers/OrderProvider';

export const Navigation = () => {
	const [hideDetails, setHideDetails] = useState(false);
	const { colorMode } = useColorMode()
	const { isAuthenticated, login } = useEbay();
	const { isLoaded, orders } = useOrders()

	const amountEarned = orders.reduce((acc, order) => acc + order.itemsOrdered.reduce((list, item) => list + parseFloat(item.cost), 0), 0)

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

			{isAuthenticated && !isLoaded && <HStack><Spinner /><Text>Loading order data...</Text></HStack>}
			{!hideDetails && isAuthenticated && isLoaded && <>
				<Stack spacing="2">
					<Heading size="md" fontWeight="bold">Stats</Heading>
					<Text>Over the past 90 days, you have:</Text>
					<Text>Had <b>{orders.length}</b> orders</Text>
					<Text>Earned <b>£{amountEarned}</b></Text>
				</Stack>
				<Button onClick={() => setHideDetails(visible => !visible)}>{hideDetails ? "Show" : "Hide"} details</Button>
			</>}
		</Stack>
	);
};
