import { Stack, Heading, Button, Text, Spinner, HStack } from '@chakra-ui/react';
import { useEbay } from '../providers/EbayProvider';
import { useOrders } from '../providers/OrderProvider';

export const Navigation = () => {
	const { isAuthenticated, login } = useEbay();
	const { isLoading } = useOrders()

	return (
		<Stack
			pointerEvents="auto"
			spacing="4"
			bg="gray.800"
			p="4"
			rounded="md"
			shadow="md"
		>
			<Heading size="md">eBay Heuristics V2</Heading>

			<Button disabled={isAuthenticated} onClick={login}>{!isAuthenticated ? "Login to eBay" : "Logged in"}</Button>

			{isLoading && <HStack><Spinner /><Text>Loading order data...</Text></HStack>}
		</Stack>
	);
};
