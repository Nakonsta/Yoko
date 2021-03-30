if ($('#checkout-map').length) {
    ymaps.ready(init);

    function init() {
        var contactsMap;

        contactsMap = new ymaps.Map("checkout-map", {
            center: [55.714243, 37.671376],
            zoom: 15,
            controls: []
        });

        contactsMap.controls.add("zoomControl", {
            position: {top: 15, left: 15}
        });  
    
        var myPlacemark = new ymaps.Placemark([55.714243, 37.671376] , {
                iconContent: "<span class='map-number'></span>",
                balloonContent: '<div class="map__ballon">' +
                '<address class="map__ballon__address">г. Москва, ул. 1-я Машиностроения, 10</address>' +
                '<a href="tel:+79997887788" class="map__ballon__phone">+7 (999) 788-77-88</a>' +
                '</div>'
            },
            { iconLayout: 'default#imageWithContent',
                iconImageHref: 'https://d1.yokomaha.extyl.pro/_html/img/marker.png',
                iconImageSize: [40, 53],
                iconContentOffset: [10, 8],
                iconImageOffset: [-20, -26],
                balloonShadow: false,
                balloonAutoPan: true,
                hideIconOnBalloonOpen: false
        });

        contactsMap.geoObjects.add(myPlacemark);
    }
}

if ($('#contacts').length) {
    ymaps.ready(function(){
        initMap([55.881535, 37.432897], 'contacts-map-1');
        initMap([55.881535, 37.432897], 'contacts-map-2');
        initMap([55.728443, 37.456069], 'contacts-map-3');
        initMap([56.143146, 37.381934], 'contacts-map-4');
        initMap([55.743243, 37.847335], 'contacts-map-5');
    }) 
}

function initMap(coords, id) {
    var contactsMap;

    contactsMap = new ymaps.Map(id, {
        center: coords,
        zoom: 15,
        controls: []
    });

    contactsMap.controls.add("zoomControl", {
        position: {top: 15, left: 15}
    });  

    var myPlacemark = new ymaps.Placemark(coords , {
            iconContent: "<span class='map-number'></span>",
            balloonContent: '<div class="map__ballon">' +
            '<address class="map__ballon__address">г. Москва, ул. 1-я Машиностроения, 10</address>' +
            '<a href="tel:+79997887788" class="map__ballon__phone">+7 (999) 788-77-88</a>' +
            '</div>'
        },
        { iconLayout: 'default#imageWithContent',
            iconImageHref: 'https://d1.yokomaha.extyl.pro/_html/img/marker.png',
            iconImageSize: [40, 53],
            iconContentOffset: [10, 8],
            iconImageOffset: [-20, -26],
            balloonShadow: false,
            balloonAutoPan: true,
            hideIconOnBalloonOpen: false
    });

    contactsMap.geoObjects.add(myPlacemark);
}