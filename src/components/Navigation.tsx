import { Stack, Heading, Button, Checkbox } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../providers/AuthProvider';

export const Navigation = () => {
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	/**
	 * Called when the user attempts to log in.
	 */
	const onLogin = () => navigate(process.env.REACT_APP_EBAY_AUTH_URL ?? '/');

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

			{!isAuthenticated && (
				<Button onClick={onLogin} disabled={isLoading}>
					{!isLoading ? 'Login to eBay' : 'Loading details...'}
				</Button>
			)}

			<Stack>
				<Heading size="md">Month Visibility</Heading>
				<Checkbox>January</Checkbox>
				<Checkbox>February</Checkbox>
				<Checkbox>March</Checkbox>
				<Checkbox>April</Checkbox>
				<Checkbox>May</Checkbox>
			</Stack>
		</Stack>
	);
};
