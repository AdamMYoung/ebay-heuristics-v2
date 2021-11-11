import React, { FC, useContext, useState } from 'react';
import eBayApi from '@hendt/ebay-api';

export const eBay = new eBayApi({
	appId: process.env.REACT_APP_EBAY_ID ?? '',
	certId: process.env.REACT_APP_EBAY_SECRET ?? '',
	ruName: `https://${window.location.hostname}/success`,
	sandbox: false,
	siteId: eBayApi.SiteId.EBAY_GB,
	marketplaceId: eBayApi.MarketplaceId.EBAY_GB
});

eBay.OAuth2.setScope([
	'https://api.ebay.com/oauth/api_scope',
	'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
	'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);

// eBay.req.instance is AxiosInstance per default
eBay.req.instance.interceptors.request.use((request) => {
	// Add Proxy
	request.url = 'https://ebay.hendt.workers.dev/' + request.url;
	return request;
});

type AuthenticationContextOptions = {
	isAuthenticated: boolean;
	login: () => void;
	codeCallback: (code: string) => void;
};

export const AuthenticationContext =
	React.createContext<AuthenticationContextOptions>({
		isAuthenticated: false,
		login: () => {},
		codeCallback: () => {}
	});

export const useAuth = () => useContext(AuthenticationContext);

const AuthProvider: FC = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = async () => {
		const url = eBay.OAuth2.generateAuthUrl();
		if (window.location) {
			window.location.href = url;
		}
	};

	const handleCodeCallback = async (code: string) => {
		try {
			const token = await eBay.OAuth2.getToken(code);
			eBay.OAuth2.setCredentials(token);

			setIsAuthenticated(true);
		} catch (e) {
			console.error(e);
		}
	};

	const authStatus = {
		isAuthenticated,
		login: handleLogin,
		codeCallback: handleCodeCallback
	};

	return (
		<AuthenticationContext.Provider value={authStatus}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthProvider;
