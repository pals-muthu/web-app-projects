
mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-103.59179687498357, 40.66995747013945],
    zoom: 3
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('campgrounds', {
        type: 'geojson',
        data:
            // 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
            { "features": campgrounds },
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#03A9F4',
                10,
                '#2196f3',
                30,
                '#3f51b5'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10,
                20,
                30,
                30
            ],
            'circle-stroke-width': [
                'step',
                ['get', 'point_count'],
                2,
                10,
                3,
                30,
                3],
            'circle-stroke-color': [
                'step',
                ['get', 'point_count'],
                '#1e1e1e',
                10,
                '#1e1e1e',
                30,
                '#1e1e1e']
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#FFCC3D',
            'circle-radius': 7,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#1e1e1e'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        const markedIDs = []
        var msg = '';
        for (feature of e.features) {
            if (!markedIDs.includes(feature.properties.id)) {
                markedIDs.push(feature.properties.id)
                const popUpMarkup = JSON.parse(feature.properties.popUpMarkup);
                msg += `<div><a href='/campgrounds/${popUpMarkup._id}'>${popUpMarkup.title}</a></div>`
            }
        }

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(msg)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
});

