mapboxgl.accessToken = 'your access token';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-111, 32],
                zoom: 1
            }); 