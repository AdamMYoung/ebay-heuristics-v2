import * as L from "leaflet"
import { useEffect, useRef, useState } from "react"

import "leaflet-canvas-markers"
import "leaflet.heat"
import markerIconPng from "leaflet/dist/images/marker-icon.png"

import { useOrders } from "../providers/OrderProvider"

export const useMapData = () => {
    const [map, setMap] = useState<L.Map>()
    const { orders, isLoaded } = useOrders()
    const markerLayerGroupRef = useRef(L.layerGroup())
    const heatmapLayerGroupRef = useRef((L as any).heatLayer([]))

    /**
     * Populates a layer containing all orders as markers
     */
    useEffect(() => {
        if (isLoaded && map) {
            markerLayerGroupRef.current.clearLayers()

            const markers = orders.map(listing => {
                const marker = (L as any).canvasMarker(L.latLng(listing.lat, listing.lng), { radius: 12, img: { url: markerIconPng } })
                marker.bindPopup(`<h3>${listing.username}</h3><h3>Address:</h3><p>${listing.address}, ${listing.postalCode}</p><h3>Order date:</h3><p>${new Date(listing.date).toLocaleDateString()}</p><h3>Ordered:</h3>${listing.itemsOrdered.map(item => `<p>£${item.cost} - ${item.title}</p>`)}`);
                return marker
            })

            markers.forEach(marker => markerLayerGroupRef.current.addLayer(marker))
        }
    }, [map, orders, isLoaded])

    /**
     * Populates a layer containing all orders as a heatmap
     */
    useEffect(() => {
        if (isLoaded && map) {
            const heatmapData = orders.map(listing => [listing.lat, listing.lng, 0.5])
            heatmapLayerGroupRef.current.setLatLngs(heatmapData)
        }
    }, [map, orders, isLoaded])

    /**
     * Loads all tile layers and overlays.
     */
    useEffect(() => {
        if (map) {
            const dark = L.tileLayer(
                'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
            )

            const light = L.tileLayer(
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

            )

            const baseMaps = {
                "Dark": dark,
                "Light": light
            }

            const overlays = {
                "Markers": markerLayerGroupRef.current,
                "Heatmap": heatmapLayerGroupRef.current
            }

            dark.addTo(map)
            overlays.Markers.addTo(map)
            L.control.layers(baseMaps, overlays, { position: "bottomright" }).addTo(map)
        }

    }, [map])

    return { map, setMap }
}