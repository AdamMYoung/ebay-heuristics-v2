import { Box } from '@chakra-ui/react';
import * as L from 'leaflet';
import { useEffect, useRef } from 'react';
import { Navigation } from '../components';

import 'leaflet/dist/leaflet.css';
import { eBay, useAuth } from '../providers/AuthProvider';

export const Home = () => {
	const mapRef = useRef(null);
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!mapRef.current) {
			return;
		}

		const map = L.map(mapRef.current, {
			center: [51.505, -0.09],
			zoom: 13
		});

		L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}
		).addTo(map);
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			eBay.sell.fulfillment.getOrders().then((res) => {
				console.log(res);
			});
		}
	}, [isAuthenticated]);

	return (
		<Box position="relative">
			<Box w="full" h="100vh" ref={mapRef} />
			<Box
				position="absolute"
				zIndex="10000"
				pointerEvents="none"
				top="0"
				right="0"
				p="8"
			>
				<Navigation />
			</Box>
		</Box>
	);
};
