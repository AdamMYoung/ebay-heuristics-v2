import { Stack, Heading, Button, Text, Spinner, HStack, useColorMode } from '@chakra-ui/react';
import { useEbay } from '../providers/EbayProvider';
import { useOrders } from '../providers/OrderProvider';

export const Navigation = () => {
	const { colorMode } = useColorMode()
	const { isAuthenticated, login } = useEbay();
	const { isLoading, orders } = useOrders()

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
			{isAuthenticated && !isLoading && <Text>Loaded {orders.length} orders</Text>}


		</Stack>
	);
};
