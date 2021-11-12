import { Box } from '@chakra-ui/react';
import * as L from 'leaflet';
import { useEffect, useRef } from 'react';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import 'leaflet/dist/leaflet.css';
import "leaflet-canvas-markers"

import { Navigation } from '../components';
import { useOrders } from '../providers/OrderProvider';


export const Home = () => {
	const mapElRef = useRef(null);
	const mapRef = useRef<L.Map>()
	const markerRef = useRef<L.Layer[]>()
	const { orders, isLoading } = useOrders()

	useEffect(() => {
		if (!mapElRef.current) {
			return;
		}

		const map = L.map(mapElRef.current, {
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

		mapRef.current = map
	}, []);

	/**
	 * Renders all orders on the map.
	 */
	useEffect(() => {
		if (!isLoading) {
			(markerRef.current as L.Layer[])?.forEach(marker => mapRef.current!.removeLayer(marker))

			const markers: L.Layer[] = []

			orders.forEach(listing => {
				const marker = (L as any).canvasMarker(L.latLng(listing.lat, listing.lng), { radius: 20, img: { url: markerIconPng } })
				marker.bindPopup(`<h3>${listing.username}</h3><p>${listing.postalCode}</p><p>Order date: ${new Date(listing.date).toLocaleDateString()}</p></br><p>Ordered:</p><ul>${listing.itemsOrdered.map(item => `<li>${item}</li>`)}</ul>`);
				markers.push(marker)
			})

			markerRef.current = markers
			markers.forEach(marker => marker.addTo(mapRef.current!))
		}
	}, [orders, isLoading])

	return (
		<Box position="relative">
			<Box w="full" h="100vh" ref={mapElRef} />
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
