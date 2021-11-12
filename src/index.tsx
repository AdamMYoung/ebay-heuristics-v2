import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes } from './routes/Routes';
import EbayProvider from './providers/EbayProvider';
import reportWebVitals from './reportWebVitals';

import './index.css';

import { OrderProvider } from './providers/OrderProvider';
import theme from './theme';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchIntervalInBackground: false
		}
	}
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<EbayProvider>
						<OrderProvider>
							<Routes />
						</OrderProvider>
					</EbayProvider>
				</ChakraProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
