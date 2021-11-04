import { Box } from '@chakra-ui/layout';
import { VFC } from 'react';

import { Home, Navigation } from './views';

export const Layout: VFC = () => {
    return (
        <Box position="relative">
            <Home />
            <Box position="absolute" zIndex="10000" pointerEvents="none" top="0" right="0" p="8">
                <Navigation />
            </Box>
        </Box>
    );
};
