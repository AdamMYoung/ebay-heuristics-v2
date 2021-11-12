import { useEffect } from 'react';
import { useEbay } from '../providers/EbayProvider';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
	const navigate = useNavigate();
	const { codeCallback } = useEbay();

	useEffect(() => {
		const queryString = window.location.search;
		const searchParams = new URLSearchParams(queryString);

		codeCallback(searchParams.get('code') ?? '');
		navigate('/');
	}, [codeCallback, navigate]);

	return null;
};
