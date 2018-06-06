angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal) {
    $scope.openExternalLink = openExternalLink;

    // set up the two modals
    $ionicModal.fromTemplateUrl(
        'templates/modals/about-modal.html', { scope: $scope }
    ).then( function(modal) {
        $scope.aboutModal = modal;
    });

    $scope.openAboutModal = function() {
        $scope.aboutModal.show();
    };
})

.controller('ReportCtrl', function( $scope, $ionicModal ) {
    $scope.openExternalLink = openExternalLink;

    var now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    $scope.resetReportForm = function( requireConfirmation ) {
        if ( requireConfirmation === undefined ) requireConfirmation = true;
        if ( requireConfirmation ) {
            navigator.notification.confirm( 'Are you sure you want to reset the form and clear all inputs?', function( buttonIndex ) {
                // 0 == dismissed (clicked outside), 1 == 'Yes', 2 == 'No'
                if ( buttonIndex === 1 ) {
                    clearForm();
                    $scope.$apply();
                }
            }, 'Notice', ['Yes', 'No'] );
        } else {
            clearForm();
        }

        function clearForm() {
            $scope.form = {
                contactedVictim: false,
                victimDetails: {
                    gender: 'Unknown',
                    appearance: '',
                    lackOfKnowledge: false,
                    restrictedCommunication: false,
                    noIdentification: false,
                    hasAPimp: false,
                    hasBranding: false,
                    other: ''
                },
                cars: false,
                carsDetails: '',
                people: false,
                peopleDetails: '',
                date: now,
                time: now,
                location: '',
                additional: '',
                phone: ''
            };
        }
    };

    $scope.resetReportForm( false );


    // set up the two modals
    $ionicModal.fromTemplateUrl(
        'templates/modals/places-modal.html', { scope: $scope }
    ).then( function(modal) {
        $scope.placesModal = modal;
    });

    $ionicModal.fromTemplateUrl(
        'templates/modals/report-form-modal.html', { scope: $scope }
    ).then( function(modal) {
        $scope.reportFormModal = modal;
        document.query
    });

    $scope.fixedFormBlur = false;
    $scope.showReportForm = function() {
        $scope.reportFormModal.show().then( function() {
            // textarea elements don't blur when other form elements are clicked.
            // This is terrible and can easily be fixed.
            if ( !$scope.fixedFormBlur ) {
                $scope.fixedFormBlur = true;
                document.querySelectorAll( 'ion-modal-view label' ).forEach( function(label) {
                    label.addEventListener( 'click', function(e) {
                        document.activeElement.blur();
                    });
                    /*label.addEventListener( 'touchend', function() {
                        document.activeElement.blur();
                    });*/
                });
            }
        });
    };

    $scope.places = [];

    $scope.automaticallyGetLocation = function() {
        // check internet connection state
        navigator.notification.alert( '1: ' + typeof navigator + ' ' + typeof navigator.connection, function(){}, '' );//@@
        navigator.notification.alert( '2: ' + typeof navigator.connection.type + ' ' + navigator.connection.type, function(){}, '' );//@@
        try {
            if ( navigator.connection.type === Connection.NONE ) {
                navigator.notification.alert( 'You must be connected to the internet to use this feature.', function(){}, '' );
                return;
            }
        } catch (e) {
            navigator.notification.alert( 'Notice: You must be connected to the internet to use this feature.', function(){}, '' );
            // continue anyway.
        }

        $scope.places = [];
        // open a modal with loading animation
        $scope.placesModal.show();

        // check if the google script has already loaded
        if ( typeof google === 'undefined' ) {
            navigator.notification.alert( '3: ' + typeof cordova + ' ' + typeof cordova.plugins + ' ' + typeof cordova.plugins.permissions, function(){}, '' );//@@
            if ( cordova.plugins.permissions === undefined ) {
                loadGoogleScript();
            } else {
                var permissions = cordova.plugins.permissions;
                navigator.notification.alert( '5: ' + typeof permissions.hasPermission + ' ' + typeof permissions.INTERNET + ' ' + permissions.INTERNET, function(){}, '' );//@@
                permissions.hasPermission( permissions.INTERNET, function( status ) {
                    navigator.notification.alert( '6: ' + typeof status + ' ' + status.hasPermission.toString(), function(){}, '' );//@@
                    if ( status.hasPermission ) {
                        loadGoogleScript();
                    } else {
                        navigator.notification.alert( '7: ' + typeof permissions.requestPermission, function(){}, '' );//@@
                        permissions.requestPermission( permissions.INTERNET, function(status) {
                            navigator.notification.alert( '8: ' + typeof status + ' ' + status.hasPermission.toString(), function(){}, '' );//@@
                            // success
                            if ( status.hasPermission ) loadGoogleScript();
                            else closeModalError( 'You must give the app permissions to access the internet.' );
                        }, function() {
                            // fail
                            closeModalError( 'You must give the app permissions to access the internet.' );
                        });
                    }
                });
            }
            
        } else {
            findNearestLocation();
        }
    }

    function loadGoogleScript() {
        navigator.notification.alert( '9: about to inject google places script', function(){}, '' );//@@
        // inject the google places script
        var script = document.createElement( 'script' );
        script.onload = findNearestLocation;
        script.onerror = function( e ) {
            closeModalError( 'Could not load nearby locations.' );
        };
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ7lYvhZz09KD1KJK7x1X1PB7Z5t6LuNU&libraries=places';
        navigator.notification.alert( '10: injecting script now', function(){}, '' );//@@
        document.body.appendChild( script );
        navigator.notification.alert( '11: injected script', function(){}, '' );//@@
    }

    var Map, service;
    var latitude = undefined;
    var longitude = undefined;
    function findNearestLocation() {
        navigator.notification.alert( '12: script loaded.', function(){}, '' );//@@
        // @TODO: wait until every part of the script is loaded??
        navigator.geolocation.getCurrentPosition( onFindPositionSuccess, onFindPositionError, { enableHighAccuracy: true } );
    }
    function onFindPositionSuccess( position ) {
        navigator.notification.alert( '13: successfully found position', function(){}, '' );//@@
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var latLong = new google.maps.LatLng( latitude, longitude );

        if ( Map === undefined ) {
            // I don't actually want to display a map, so put it in a div that's not attached to the DOM
            Map = new google.maps.Map( document.createElement('div') );
            service = new google.maps.places.PlacesService( Map );
        }

        navigator.notification.alert( '15: about to search nearby', function(){}, '' );//@@
        service.nearbySearch({
            location: latLong,
            radius: 300 // 300m/1000ft radius
        }, foundPlacesCallback );

    }

    function onFindPositionError( error ) {
        navigator.notification.alert( '14: failed getting position', function(){}, '' );//@@
        closeModalError( 'There was a problem getting your location: ' + error.message );
    }

    function foundPlacesCallback( results, status ) {
        navigator.notification.alert( '16: got a list of nearby places. Status: ' + status + ' ' + google.maps.places.PlacesServiceStatus.OK, function(){}, '' );//@@
        if ( status === google.maps.places.PlacesServiceStatus.OK ) {
            navigator.notification.alert( '17: number of results: ' + results.length, function(){}, '' );//@@
            // remove places where the vicinity is the same as the name (i.e. "Denver") since this is too generic
            results = results.filter( function(place) {
                return place.name.toLowerCase() !== place.vicinity.toLowerCase();
            });
            if ( results.length == 0 ) {
                closeModalError( 'There were no locations found near you. Please manually enter your location.' );
            } else {
                $scope.places = results;
                $scope.$digest();
            }
        } else {
            closeModalError( 'There was a problem while finding locations near you.' );
        }
    }

    $scope.onPlaceClick = function( place ) {
        service.getDetails( {placeId: place.place_id}, function(place2, status) {
            if ( status == google.maps.places.PlacesServiceStatus.OK ) {
                $scope.placesModal.hide();
                $scope.form.location = place2.name + ', ' + place2.formatted_address;
            } else {
                closeModalError( 'There was a problem while getting details about that location.' );
            }
        });
    };

    function closeModalError( errorString ) {
        navigator.notification.alert( errorString, function(){}, 'Error notice' );
        $scope.placesModal.hide();
    }

    $scope.buildReportEmail = function() {
        var subject = 'Trafficking tip';
        var body = '';

        if ( $scope.form.contactedVictim ) {
            body += "I've come into contact with a victim.\n";
            var d = $scope.form.victimDetails;
            body += "Victim's gender: " + d.gender + "\n";
            body += "Victim's appearance: " + d.appearance + "\n";
            body += "The victim: \n";
            if ( d.hasRestrictedCommunication ) body += "* has restricted or controlled communication.\n";
            if ( d.isDisheveled ) body += "* has a disheveled or unkempt appearance, is alone, scared, or crying\n";
            if ( d.isMinor ) body += "* is a minor traveling without adult supervision\n";
            if ( d.offersSex ) body += "* offered to exchange sex for a ride, meal, etc.\n";
            if ( d.doesNotKnow ) body += "* does not know the person who is picking him/her up\n";
            if ( d.hasPimp ) body += "* shows acknowledgement that she/he has a pimp and is making a quota\n";
            if ( d.hasBranding ) body += "* has signs of branding or tattooing of the trafficker's name\n";
            if ( d.hasLackOfKnowledge ) body += "* has a lack of knowledge of the community or his/her whereabouts\n";
            if ( d.hasNoId ) body += "* is not in control of his/her own identification documents\n";
            if ( d.other.trim().length > 0 ) body += "Other notes:\n" + d.other + "\n";
        }

        if ( $scope.form.people ) {
            body += "\nThere were people (other than victims) involved.\n";
            body += $scope.form.peopleDetails + "\n";
        }

        if ( $scope.form.cars ) {
            body += "\Vehicles were involved.\n";
            body += $scope.form.carsDetails + "\n";
        }

        if ( $scope.form.additional ) {
            body += "\nAdditional information:\n";
            body += $scope.form.additional + "\n";
        }

        body += "\nThe suspicious activity happened on " +
        $scope.form.date.toLocaleDateString() + ", " + $scope.form.time.toLocaleTimeString() +
        ", at " + $scope.form.location;

        openExternalLink(
            'mailto:help@humantraffickinghotline.org?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body)
        );
    };

})

.controller('RedFlagsCtrl', function( $scope, $ionicModal ) {
    $scope.openExternalLink = openExternalLink;

    $scope.showCaseStudy = function( caseTag ) {
        if ( $scope.caseStudyModal && $scope.caseStudyModal.isShown() ) {
            $scope.caseStudyModal.hide().then( loadModal );
        } else {
            loadModal();
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl(
                'templates/modals/case-study-modal.html', { scope: $scope }
            ).then( function(modal) {
                $scope.caseStudyModal = modal;
                $scope.caseTag = caseTag;
                $scope.caseStudyModal.show();
            });
        }
    };

    // clean up the modal whenever it's hidden
    $scope.$on( 'caseStudyModal.hidden', function() {
        $scope.caseStudyModal.remove();
    });
})

.controller('AboutTraffickingCtrl', function($scope) {})

// for some reason I couldn't get the app to trigger mailto: and tel: links properly
// using the href attribute, so instead I open the link using window.open
// I also had issues opening external URLs in the default browser
var openExternalLink = function( url ) {
    window.open( url, '_system' );
};