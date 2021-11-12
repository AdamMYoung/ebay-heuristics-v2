import React, { FC, useContext, useState,useRef } from 'react';
import eBayApi from '@hendt/ebay-api';

const getEbayConfig = () => {
	const eBay = new eBayApi({
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

	return eBay
}

type EbayContextOptions = {
	isAuthenticated: boolean;
	eBay: eBayApi;
	login: () => void;
	codeCallback: (code: string) => void;
};

export const EbayContext =
	React.createContext<EbayContextOptions>({
		isAuthenticated: false,
		eBay: {} as any,
		login: () => {},
		codeCallback: () => {}
	});

export const useEbay = () => useContext(EbayContext);

const EbayProvider: FC = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const eBay = useRef(getEbayConfig()).current

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
		eBay,
		login: handleLogin,
		codeCallback: handleCodeCallback
	};

	return (
		<EbayContext.Provider value={authStatus}>
			{children}
		</EbayContext.Provider>
	);
};

export default EbayProvider;
