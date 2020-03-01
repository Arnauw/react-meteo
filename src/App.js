import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Day from "./Day";
import Period from "./Period";

const meteo_key = "e184943229e3aef2a626130052103510";
const geo_key = "a957754acf3dae958ecb2effe3ff8c58";
const units = 'metric';

const URLipify = "https://geo.ipify.org/api/v1?apiKey=at_HW1nsY1U7FJ8t5oT2rB03InkEuxtQ";

// const fullURL = "http://api.openweathermap.org/data/2.5/forecast?q=Bordeaux&units=metric&appid=e184943229e3aef2a626130052103510";

function App() {

    function getDayOfTheWeekFirstLetterCapitalized(date) {
        if (date === false || date === undefined) {
            date = new Date();
        }
        const dayOFTheWeek = new Intl.DateTimeFormat('fr-FR', {weekday: 'long'}).format(new Date(date));
        const firstLetterCapitalizedDOTW = dayOFTheWeek[0].toUpperCase() + dayOFTheWeek.slice(1);

        return firstLetterCapitalizedDOTW
    }

    const [activeDay, setActive] = React.useState(getDayOfTheWeekFirstLetterCapitalized());
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [meteo, setMeteo] = React.useState({});

    // const state = React.useState();
    // const activeDay = state[0];
    // const setActiveDay = state[1];

    async function callAPI() {

        const ipResponse = await fetch(URLipify);

        const bodyIpResponse = await ipResponse.json();

        let visitorIP = bodyIpResponse.ip;

        console.log(visitorIP);

        if (ipResponse.ok) {

            const URLgeo = `http://api.ipstack.com/${visitorIP}?access_key=${geo_key}&format=1`;

            const cityResponse = await fetch(URLgeo);

            const bodyCityResponse = await cityResponse.json();

            let visitorCity = bodyCityResponse.city;

            console.log("D'apres ton ip, tu es dans les environs de : " + visitorCity);

            if (cityResponse.ok) {

                const URLmeteo = `http://api.openweathermap.org/data/2.5/forecast?q=${visitorCity}&units=${units}&appid=${meteo_key}&lang=fr`;

                const meteoResponse = await fetch(URLmeteo);

                const bodyMeteoResponse = await meteoResponse.json();

                setLoading(false);

                if (meteoResponse.ok) {

                    const data = bodyMeteoResponse.list[0];

                    console.log(data);


                    
                    
                    let kikoos = bodyMeteoResponse.list;

                    kikoos.map(kikoo => {

                        let thisLoopTurnDay = getDayOfTheWeekFirstLetterCapitalized(kikoo.dt_txt);


                            if (getDayOfTheWeekFirstLetterCapitalized(kikoo.dt_txt) !== getDayOfTheWeekFirstLetterCapitalized()) {

                                console.log(thisLoopTurnDay);
                                console.log("Temps : " + kikoo.weather[0].description);
                                console.log("Température : "+ kikoo.main.temp +"° C")
                            }
                        }
                    );


                    console.log(bodyMeteoResponse);


                    // petite fonction qui capitalize la premiere lettre d'une string
                    const description = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);

                    const parsedMeteo = {
                        city: visitorCity,
                        weather: data.weather[0].main,
                        description: description,
                        temp: data.main.temp,
                        icon: data.weather[0].icon,
                        feel: data.main.feels_like,
                        humidity: data.main.humidity,
                        date: data.dt_txt,
                    };
                    setMeteo(parsedMeteo);
                    setError(null);

                } else {
                    setError(bodyMeteoResponse.message);
                }
            }
        }
    }


    React.useEffect(() => {
        console.log('api calling...');

        callAPI();

    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mb-4 mt-4">Météo</button>
            </div>
            <Period>
                <Day label="Lundi" isActive={activeDay === "Lundi"} handleClick={setActive}/>
                <Day label="Mardi" isActive={activeDay === "Mardi"} handleClick={setActive}/>
                <Day label="Mercredi" isActive={activeDay === "Mercredi"} handleClick={setActive}/>
                <Day label="Jeudi" isActive={activeDay === "Jeudi"} handleClick={setActive}/>
                <Day label="Vendredi" isActive={activeDay === "Vendredi"} handleClick={setActive}/>
                <Day label="Samedi" isActive={activeDay === "Samedi"} handleClick={setActive}/>
                <Day label="Dimanche" isActive={activeDay === "Dimanche"} handleClick={setActive}/>
            </Period>

            {loading ?
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : error ?
                    <div className="alert alert-danger">
                        <p className="text-danger text-center">{error}</p>
                    </div>
                    :
                    <div className="text-center mt-3">

                        <div className="mt-3">
                            Fetched Date : {meteo.date} (testing)
                        </div>

                        <div className="mt-3">
                            Metéo de {meteo.city} le {activeDay} : {meteo.weekday}
                        </div>
                        <div className="mt-3">
                            Temperature réel : {meteo.temp} ° C
                        </div>
                        <div className="mt-3">
                            Température ressenti : {meteo.feel} ° C
                        </div>
                        <div className="mt-3">
                            Humidité : {meteo.humidity} %
                        </div>
                        <div className="mt-3">
                            Temps : {meteo.description}
                        </div>
                        <div className="mt-3">
                            <img
                                src={"https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + meteo.icon + ".png"}
                                alt={meteo.description}/>
                        </div>
                    </div>
            }

        </div>
    );
}

export default App;
