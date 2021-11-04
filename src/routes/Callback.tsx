import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
	const navigate = useNavigate();
	const { onSignIn } = useAuth();

	useEffect(() => {
		const queryString = window.location.search;
		const start = queryString.indexOf('code=');
		const end = queryString.indexOf('&');

		const code = queryString.substring(start, end);
		onSignIn(code);
		navigate('/');
	}, [onSignIn, navigate]);

	return null;
};
