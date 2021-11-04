import React, { FC, useContext, useState } from 'react';
import * as ebayApi from '../api/ebay';
import * as authUtils from '../utils/authUtils';

type AuthenticationContextOptions = {
	isAuthenticated: boolean;
	isLoading: boolean;
	authToken: unknown;
	onSignIn: (consentToken: string) => void;
};

export const AuthenticationContext =
	React.createContext<AuthenticationContextOptions>({
		isAuthenticated: false,
		isLoading: false,
		authToken: null,
		onSignIn: (consentToken: string) => {}
	});

export const useAuth = () => useContext(AuthenticationContext);

const AuthProvider: FC = ({ children }) => {
	const [authToken, setAuthToken] = useState(authUtils.getToken());
	const [isLoading, setLoading] = useState(false);

	const getAuthToken = async (consentToken: string) => {
		setLoading(true);
		const token = await ebayApi.mintToken(consentToken);
		authUtils.setToken(token);

		setAuthToken(authUtils.getToken());
		setLoading(false);
	};

	const authStatus = {
		isAuthenticated: !!authToken,
		authToken,
		isLoading,
		onSignIn: (consentToken: string) => getAuthToken(consentToken)
	};

	return (
		<AuthenticationContext.Provider value={authStatus}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthProvider;
