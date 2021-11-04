import { Stack, Heading, Button, Checkbox } from '@chakra-ui/react';

export const Navigation = () => {
    return (
        <Stack pointerEvents="auto" spacing="4" bg="gray.800" p="4" rounded="md" shadow="md">
            <Heading size="md">eBay Heuristics V2</Heading>

            <Button>Login to eBay</Button>

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
