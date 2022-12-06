// Ensures code runs after html doc loads
$(() => {
    // Elements
    var userInputEl = $('#user-input');
    var searchButton = userInputEl.children('.buttons').children('button');
    var cardsEl = $('#cards');

    console.log(cardsEl);
    // ## Function to load response data as button elements ★ ##
    /* store important data in data-{blank} attributes */
    function loadEvents(eventsData) {
        var eventsArray = eventsData._embedded.events;
        console.log(eventsArray);

        for (var x = 0; x < eventsArray.length; x++) {
            // Parent
            var cardEl = $('<div>');
            cardEl.attr('class', 'card');

            // Content: child of Parent
            var contentEl = $('<div>');
            contentEl.attr('class', 'card-content');
            
            // Media: child of Content
            var cardMediaEl = $('<div>');
            cardMediaEl.attr('class', 'media');

            // cardContent: child of Content
            var cardContentEl = $('<div>');
            cardContentEl.attr('class', 'content');
            
            // Children of Media
            var mediaLeft = $('<div>'); // Media Left
            mediaLeft.attr('class', 'media-left');
                var mediaFigure = $('<figure>'); // Child of Media Left
                mediaFigure.attr('class', 'image is-128x128');

                var mediaImage = $('<img>'); // Child of ^
                mediaImage.attr('src', eventsArray[x].images[0].url); // ## Image ##

            var mediaContent = $('<div>'); // Media Content
            mediaContent.attr('class', 'media-content');
                var mContentTitle = $('<p>');
                mContentTitle.attr('class', 'title is-4');
                mContentTitle.text(eventsArray[x].name); // ## Title ##
                var mContentSubTitle = $('<p>');
                mContentSubTitle.attr('class', 'subtitle is-6');
                mContentSubTitle.text(eventsArray[x].dates.start.localDate); // ## Subtitle ##

            // Appends
            contentEl.append(cardContentEl); // cardContent: child of Content
                    
                    mediaFigure.append(mediaImage);
                    mediaLeft.append(mediaFigure);
                cardMediaEl.append(mediaLeft); 
                    mediaContent.append(mContentTitle);
                    mediaContent.append(mContentSubTitle);
                cardMediaEl.append(mediaContent);
            contentEl.append(cardMediaEl); // Media: child of Content
            
            cardEl.append(contentEl); // Content: child of Parent
            cardsEl.append(cardEl); // Parent

        }
    }

    // ## Function to load weather data as a modal element ♥ ##
    function handleWeatherInformation(weatherData) {
        console.log("The handleWeatherInformation function is being called with "+weatherData +"as a parameter.");
    }
    
    // ## Event discovery api function ✈ ##
    function eventDiscovery(userInput) {
        // Take user input and inject into api call
        var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + userInput + '&countryCode=US&apikey=iQvDtAeqOGfetg1ilGAAF6sw3ekPWih6';

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                    console.log(data);
                    if (data._embedded) {
                        loadEvents(data);
                    }
                    
                    // Pass data into the function to load responses onto page ★
            });
    }

    eventDiscovery("Super Bowl");

    // ## Event location api function ♣ ##
    /* 
    Take event id and inject into api call
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events/' + id + '&apikey={apikey}'

    Fetch request using requestUrl

    Pass lat and lon data into the weather api function ☁
    */
    getWeatherBasedOnLatLon(45.5152, 122.6784);

    // ## One weather api function ☁ ##
    function getWeatherBasedOnLatLon(enteredLat, enteredLon) {
        //Take lat and lon and inject into api call
        var queryURL = "https://api.open-meteo.com/v1/forecast?latitude=" + enteredLat + "&longitude=" + enteredLon + 
        "&current_weather=true&temperature_unit=fahrenheit&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";
        //Fetch request
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                console.log("our temperature is: "+data.current_weather.temperature + "° Fahrenheit.");
                //Take reponse and pass into modal function ♥
                handleWeatherInformation(data);
            })
    }

    // ## Event listener to take user input and pass to Ticketmaster event discovery api function ✈ ##
    userInputEl.submit(function (e) {
        e.preventDefault();
        var inputField = userInputEl.children('input');
        var userKeyword = inputField.val().trim();
        
        if (userKeyword.length > 0) {
            eventDiscovery(userKeyword);
        }
    });

    searchButton.click(function (e) {
        e.preventDefault();
        var inputField = userInputEl.children('input');
        var userKeyword = inputField.val().trim();
        
        if (userKeyword.length > 0) {
            eventDiscovery(userKeyword);
        }
    });

    // ## Event listener to take user input on button elements ##
    /* Take event id from button elements and pass into location api function ♣ */
});