import { Stack, Heading, Button, Checkbox } from '@chakra-ui/react';
import { useEbay } from '../providers/EbayProvider';

export const Navigation = () => {
	const { isAuthenticated, login } = useEbay();

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

			<Button disabled={isAuthenticated} onClick={login}>{isAuthenticated ? "Login to eBay" : "Logged in"}</Button>
		</Stack>
	);
};
