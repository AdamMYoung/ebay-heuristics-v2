import { Box } from '@chakra-ui/react';
import * as L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';


import { Navigation } from '../components';
import { useMapData } from '../hooks/useMapData';

export const Home = () => {
	const mapElRef = useRef(null);


	const { map, setMap } = useMapData()

	useEffect(() => {
		if (!mapElRef.current || map) {
			return;
		}

		const mapInstance = L.map(mapElRef.current!, {
			preferCanvas: true,
			center: [51.505, -0.09],
			zoom: 13
		});

		setMap(mapInstance)
	}, [setMap, map]);

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
