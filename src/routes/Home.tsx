import { Box } from '@chakra-ui/react';
import * as L from 'leaflet';
import { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';

import { Navigation } from '../components';
import { useGeocodedOrderListings } from '../hooks/useGeocodedOrderListings';


export const Home = () => {
	const mapRef = useRef(null);
	const orderListings = useGeocodedOrderListings()

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

	/**
	 * Renders all orders on the map.
	 */
	useEffect(() => {
		orderListings.forEach(listing => {
			const marker = L.marker([listing.lat, listing.lng]).addTo(mapRef.current! as L.Map);
			marker.bindPopup(`<h3>${listing.username}</h3><p>${listing.postalCode}</p><p>Order date: ${listing.date.toLocaleDateString()}</p></br><p>Ordered:</p><ul>${listing.itemsOrdered.map(item => `<li>${item}</li>`)}</ul>`);
		})
	}, [orderListings])

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
