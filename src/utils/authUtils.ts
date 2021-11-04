export const getToken = () => {
	const token = localStorage.getItem('token');
	const time = localStorage.getItem('expiry');

	if (!token || !time) return null;

	if (parseInt(time) < Date.now()) {
		return null;
	}

	return token;
};

export const setToken = (token: Record<string, any>) => {
	localStorage.setItem('token', token.access_token);

	const now = Date.now() + token.expires_in;
	localStorage.setItem('expiry', now);
};
