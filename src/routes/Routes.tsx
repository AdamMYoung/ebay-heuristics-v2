import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

import { Callback } from './Callback';
import { Home } from './Home';

export const Routes = () => {
	return (
		<>
			<RouterRoutes>
				<Route path="/" element={<Home />} />
				<Route path="/success" element={<Callback />} />
				<Navigate to="/" />
			</RouterRoutes>
		</>
	);
};
