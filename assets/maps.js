function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
    );
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 },
        mapId: "DEMO_MAP_ID",
    });

    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });

    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Add some markers to the map.
    const markers = locations.map(function (location, i) {
        const label = labels[i % labels.length];
        const pinGlyph = new google.maps.marker.PinElement({
            glyph: label,
            glyphColor: "white",
        });
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: location,
            content: pinGlyph.element,
        });

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
            infoWindow.setContent(position.lat + ", " + position.lng);
            infoWindow.open(map, marker);
        });
        return marker;
    });

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({ markers, map });
}

const locations = [
    { lat: 53.297902, lng: -6.179645 },
    { lat: 53.332203, lng: -6.255906 },
];

initMap();