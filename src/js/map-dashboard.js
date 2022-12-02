$(document).ready(function () {
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
    ], function (esriConfig, Map, MapView, FeatureLayer) {

        esriConfig.apiKey = "AAPK7d796f1ad9ef4ca3a4533a945ec970623-Yw1PyfCPQbRQrcVKHk2pRlMGo3EFN-pDdljFdHvreuE2d0_0H88x6nJEuN3kBZ";

        const map = new Map({
            basemap: "arcgis-charted-territory" // Basemap layer service
        });

        const view = new MapView({
            map: map,
            center: [107.06636645227229, -6.801783783769942], // Longitude, latitude
            zoom: 13, // Zoom level
            container: "map-container", // Div element,
            ui: {
                components: ["attribution"]
            },
        });

        function createFillSymbol(value, color) {
            return {
                "value": value,
                "symbol": {
                    "color": color,
                    "type": "simple-fill",
                    "style": "solid",
                    "outline": {
                        "style": "none"
                    }
                },
                "label": value
            };
        }

        colorMap = {
            "Benjot": "rgba(59, 131, 189, 0.75)",
            "Cibeureum": "rgba(146, 43, 62, 0.75)",
            "Cirumput": "rgba(141, 148, 141, 0.75)",
            "Galudra": "rgba(100, 28, 52, 0.75)",
            "Gasol": "rgba(34, 113, 179, 0.75)",
            "Mangunkerta": "rgba(245, 208, 51, 0.75)",
            "Nyalindung": "rgba(202, 196, 176, 0.75)",
            "Padaluyu": "rgba(190, 189, 127, 0.75)",
            "Sarampad": "rgba(65, 34, 39, 0.75)",
            "Sukajaya": "rgba(69, 50, 46, 0.75)",
            "Cibulakan": "rgba(37, 40, 80, 0.75)",
            "Cijedil": "rgba(138, 102, 66, 0.75)",
            "Sukamanah": "rgba(27, 85, 131, 0.75)",
            "Sukamulya": "rgba(207, 52, 118, 0.75)",
            "Talaga": "rgba(245, 64, 33, 0.75)",
            "Wangunjaya": "rgba(0, 187, 45, 0.75)"
        }

        const desaCugenangRenderer = {
            type: "unique-value",
            field: "namobj",
            uniqueValueInfos: [
                createFillSymbol("Benjot", "#3B83BD"),
                createFillSymbol("Cibeureum", "#922B3E"),
                createFillSymbol("Cirumput", "#8D948D"),
                createFillSymbol("Galudra", "#641C34"),
                createFillSymbol("Gasol", "#2271B3"),
                createFillSymbol("Mangunkerta", "#F5D033"),
                createFillSymbol("Nyalindung", "#CAC4B0"),
                createFillSymbol("Padaluyu", "#BEBD7F"),
                createFillSymbol("Sarampad", "#412227"),
                createFillSymbol("Sukajaya", "#45322E"),
                createFillSymbol("Cibulakan", "#252850"),
                createFillSymbol("Cijedil", "#8A6642"),
                createFillSymbol("Sukamanah", "#1B5583"),
                createFillSymbol("Sukamulya", "#CF3476"),
                createFillSymbol("Talaga", "#F54021"),
                createFillSymbol("Wangunjaya", "#00BB2D"),
            ]
        };

        const desaCugenangLayer = new FeatureLayer({
            url: "https://geo.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/18/",
            renderer: desaCugenangRenderer,
            opacity: 0.75,
        });

        map.add(desaCugenangLayer);

        initDialog();

        function initDialog() {
            let namaDesa;

            const titleInformasiUmumDialogView = $('#title-informasi-dialog');
            const informasiUmumDialogView = $('#informasi-dialog');
            const buttonCloseInformasiUmumDialogView = $('#button-close-informasi-dialog');
            const buttonBackInformasiUmumDialogView = $('#button-back-informasi-dialog');

            const menuInformasiUmumView = $('#menu-informasi');
            const buttonMenuDataPendudukPengungsiView = $('#menu-data-penduduk-pengungsi');
            const buttonMenuDataPoskoView = $('#menu-data-posko');
            const buttonMenuDataKorbanView = $('#menu-data-korban');
            const buttonMenuInfrastrukturView = $('#menu-data-infrastruktur');

            const dataPendudukPengungsiView = $('#data-penduduk-pengungsi');
            const dataPoskoView = $('#data-posko');
            const dataKorbanView = $('#data-korban');
            const dataInfrastrukturView = $('#data-infrastruktur');

            let currentInformasiView = menuInformasiUmumView;

            let clickedPosition;

            buttonCloseInformasiUmumDialogView.on('click', function () {
                informasiUmumDialogView.addClass('hidden');
                resetMenuInformasiView();
            });

            buttonBackInformasiUmumDialogView.on('click', function () {
                currentInformasiView.addClass('hidden');
                menuInformasiUmumView.removeClass('hidden');
                currentInformasiView = menuInformasiUmumView;
                buttonBackInformasiUmumDialogView.addClass('hidden');

                titleInformasiUmumDialogView.text(`Informasi Umum - Desa ${namaDesa}`);
            });

            buttonMenuDataPendudukPengungsiView.on('click', function () {
                currentInformasiView.addClass('hidden');
                dataPendudukPengungsiView.removeClass('hidden');
                currentInformasiView = dataPendudukPengungsiView;
                buttonBackInformasiUmumDialogView.removeClass('hidden');

                titleInformasiUmumDialogView.text(`Data Pengungsi - Desa ${namaDesa}`);

                showMapDataPendudukPengungsi(namaDesa);
            });

            buttonMenuDataPoskoView.on('click', function () {
                currentInformasiView.addClass('hidden');
                dataPoskoView.removeClass('hidden');
                currentInformasiView = dataPoskoView;
                buttonBackInformasiUmumDialogView.removeClass('hidden');

                titleInformasiUmumDialogView.text(`Data Posko - Desa ${namaDesa}`);

                showMapDataPosko(namaDesa);
            });

            buttonMenuDataKorbanView.on('click', function () {
                currentInformasiView.addClass('hidden');
                dataKorbanView.removeClass('hidden');
                currentInformasiView = dataKorbanView;
                buttonBackInformasiUmumDialogView.removeClass('hidden');

                titleInformasiUmumDialogView.text(`Data Korban - Desa ${namaDesa}`);

                showMapDataKorban(namaDesa);
            });

            buttonMenuInfrastrukturView.on('click', function () {
                currentInformasiView.addClass('hidden');
                dataInfrastrukturView.removeClass('hidden');
                currentInformasiView = dataInfrastrukturView;
                buttonBackInformasiUmumDialogView.removeClass('hidden');

                titleInformasiUmumDialogView.text(`Data Infrastruktur - Desa ${namaDesa}`);

                showMapDataInfrastruktur(namaDesa);
            });

            view.on('click', function (event) {
                clickedPosition = {
                    lat: event.mapPoint.latitude,
                    long: event.mapPoint.longitude
                };

                view.hitTest(event).then(function (response) {
                    // only get the graphics returned from myLayer
                    const graphicHits = response.results?.filter(
                        (hitResult) => hitResult.type === "graphic" && hitResult.graphic.layer === desaCugenangLayer
                    );
                    if (graphicHits?.length > 0) {
                        // do something with the myLayer features returned from hittest
                        namaDesa = graphicHits[0].graphic.attributes.namobj;

                        if (informasiUmumDialogView.hasClass('hidden')) {
                            informasiUmumDialogView.removeClass('hidden');
                            titleInformasiUmumDialogView.text(`Informasi Umum - Desa ${namaDesa}`);
                        }
                    }
                });
            });

            function resetMenuInformasiView() {
                if (menuInformasiUmumView.hasClass('hidden')) {
                    titleInformasiUmumDialogView.text(`Informasi Umum - Desa ${namaDesa}`);
                    menuInformasiUmumView.removeClass('hidden');
                }

                if (!buttonBackInformasiUmumDialogView.hasClass('hidden')) {
                    buttonBackInformasiUmumDialogView.addClass('hidden');
                }

                if (!dataPendudukPengungsiView.hasClass('hidden')) {
                    dataPendudukPengungsiView.addClass('hidden');
                }

                if (!dataPoskoView.hasClass('hidden')) {
                    dataPoskoView.addClass('hidden');
                }

                currentInformasiView = menuInformasiUmumView;
            }

            async function showMapDataPendudukPengungsi(namaDesa) {
                const map = new Map({
                    basemap: "arcgis-charted-territory" // Basemap layer service
                });

                const view = new MapView({
                    map: map,
                    center: [clickedPosition.long, clickedPosition.lat], // Longitude, latitude
                    zoom: 13, // Zoom level
                    container: "data-penduduk-pengungsi-map", // Div element,
                    ui: {
                        components: ["attribution"]
                    },
                });

                const desaCugenangLayer = new FeatureLayer({
                    url: "https://geo.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/18/",
                    renderer: desaCugenangRenderer,
                    opacity: 0.75,
                });

                const results = await desaCugenangLayer.queryFeatures({
                    where: `namobj = '${namaDesa}'`,  // Set by select element
                    spatialRelationship: "intersects", // Relationship operation to apply
                    geometry: view.extent, // Restricted to visible extent of the map
                    outFields: ["*"], // Attributes to return
                    returnGeometry: true
                });

                results.features.map((feature) => {
                    feature.symbol = {
                        "color": colorMap[namaDesa],
                        "type": "simple-fill",
                        "style": "solid",
                        "outline": null
                    };
                });

                view.graphics.addMany(results.features);
            }

            async function showMapDataPosko(namaDesa) {
                const map = new Map({
                    basemap: "arcgis-charted-territory" // Basemap layer service
                });

                const view = new MapView({
                    map: map,
                    center: [clickedPosition.long, clickedPosition.lat], // Longitude, latitude
                    zoom: 13, // Zoom level
                    container: "data-posko-map", // Div element,
                    ui: {
                        components: ["attribution"]
                    },
                });

                const desaCugenangLayer = new FeatureLayer({
                    url: "https://geo.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/18/",
                    renderer: desaCugenangRenderer,
                    opacity: 0.75,
                });

                const results = await desaCugenangLayer.queryFeatures({
                    where: `namobj = '${namaDesa}'`,  // Set by select element
                    spatialRelationship: "intersects", // Relationship operation to apply
                    geometry: view.extent, // Restricted to visible extent of the map
                    outFields: ["*"], // Attributes to return
                    returnGeometry: true
                });

                results.features.map((feature) => {
                    feature.symbol = {
                        "color": colorMap[namaDesa],
                        "type": "simple-fill",
                        "style": "solid",
                        "outline": null
                    };
                });

                view.graphics.addMany(results.features);
            }

            async function showMapDataKorban(namaDesa) {
                const map = new Map({
                    basemap: "arcgis-charted-territory" // Basemap layer service
                });

                const view = new MapView({
                    map: map,
                    center: [clickedPosition.long, clickedPosition.lat], // Longitude, latitude
                    zoom: 13, // Zoom level
                    container: "data-korban-map", // Div element,
                    ui: {
                        components: ["attribution"]
                    },
                });

                const desaCugenangLayer = new FeatureLayer({
                    url: "https://geo.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/18/",
                    renderer: desaCugenangRenderer,
                    opacity: 0.75,
                });

                const results = await desaCugenangLayer.queryFeatures({
                    where: `namobj = '${namaDesa}'`,  // Set by select element
                    spatialRelationship: "intersects", // Relationship operation to apply
                    geometry: view.extent, // Restricted to visible extent of the map
                    outFields: ["*"], // Attributes to return
                    returnGeometry: true
                });

                results.features.map((feature) => {
                    feature.symbol = {
                        "color": colorMap[namaDesa],
                        "type": "simple-fill",
                        "style": "solid",
                        "outline": null
                    };
                });

                view.graphics.addMany(results.features);
            }

            async function showMapDataInfrastruktur(namaDesa) {
                const map = new Map({
                    basemap: "arcgis-charted-territory" // Basemap layer service
                });

                const view = new MapView({
                    map: map,
                    center: [clickedPosition.long, clickedPosition.lat], // Longitude, latitude
                    zoom: 13, // Zoom level
                    container: "data-infrastruktur-map", // Div element,
                    ui: {
                        components: ["attribution"]
                    },
                });

                const desaCugenangLayer = new FeatureLayer({
                    url: "https://geo.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/18/",
                    renderer: desaCugenangRenderer,
                    opacity: 0.75,
                });

                const results = await desaCugenangLayer.queryFeatures({
                    where: `namobj = '${namaDesa}'`,  // Set by select element
                    spatialRelationship: "intersects", // Relationship operation to apply
                    geometry: view.extent, // Restricted to visible extent of the map
                    outFields: ["*"], // Attributes to return
                    returnGeometry: true
                });

                results.features.map((feature) => {
                    feature.symbol = {
                        "color": colorMap[namaDesa],
                        "type": "simple-fill",
                        "style": "solid",
                        "outline": null
                    };
                });

                view.graphics.addMany(results.features);
            }
        }
    });
});