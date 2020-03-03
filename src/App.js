import React from 'react';
import './App.css';
import {Day} from "./Day";
import {Period} from "./Period";
import {Spinner, GrowSpinner, CircularSpinner} from "./Components/Spinner";
import {AlertSucces, AlertError} from "./Components/Alert";
import {getDayOfTheWeekFirstLetterCapitalized} from "./Utils/utils";
import {getNextDaysOfTheWeek} from "./Utils/utils";
import {Meteo} from "./Components/Meteo/Meteo";


const meteo_key = "e184943229e3aef2a626130052103510";
const geo_key = "a957754acf3dae958ecb2effe3ff8c58";
const units = 'metric';

const URLipify = "https://geo.ipify.org/api/v1?apiKey=at_HW1nsY1U7FJ8t5oT2rB03InkEuxtQ";

// const fullURL = "http://api.openweathermap.org/data/2.5/forecast?q=Bordeaux&units=metric&appid=e184943229e3aef2a626130052103510";

function App() {


    const today = getDayOfTheWeekFirstLetterCapitalized();

    const [activeDay, setActive] = React.useState(today);
    const [hasBeenSubmitted, setHasBeenSubmitted] = React.useState(false);
    const [submittedCity, setSubmittedCity] = React.useState('Bordeaux');
    const [error, setError] = React.useState(null);
    const [meteo, setMeteo] = React.useState({});

    // const state = React.useState();
    // const activeDay = state[0];
    // const setActiveDay = state[1];


    React.useEffect(() => {
        console.log('api calling...');

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

console.log('visitor city ', bodyCityResponse.city);



                console.log("D'apres ton ip, tu es dans les environs de : " + visitorCity);

                if (cityResponse.ok) {

                    const URLmeteo = `http://api.openweathermap.org/data/2.5/forecast?q=${visitorCity}&units=${units}&appid=${meteo_key}&lang=fr`;

                    const meteoResponse = await fetch(URLmeteo);

                    const bodyMeteoResponse = await meteoResponse.json();

                    // setLoading(false);

                    if (meteoResponse.ok) {


                        let meteoList = bodyMeteoResponse.list;

                        const meteoOfTheWeek = meteoList.reduce((accumulator, data) => {

                            const day = getDayOfTheWeekFirstLetterCapitalized(data.dt_txt);

                            const description = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);

                            console.log(day);

                            if (!accumulator[day]) {
                                accumulator[day] = []
                            }

                            accumulator[day].push({
                                city: visitorCity,
                                weather: data.weather[0].main,
                                description: description,
                                temp: data.main.temp,
                                icon: data.weather[0].icon,
                                feel: data.main.feels_like,
                                humidity: data.main.humidity,
                                windDirection: data.wind.deg
                            });

                            return accumulator;
                        }, {});


                        setMeteo(meteoOfTheWeek);
                        setError(null);

                    } else {
                        const meteoOfTheWeek = {
                            errorMessage: bodyMeteoResponse.message
                        };
                        setMeteo(meteoOfTheWeek);
                        setError(bodyMeteoResponse.message);
                    }
                }
            }
        }

        // if (!hasBeenSubmitted) {
        //
        // callAPI();
        //
        // } else {

            async function callAPI2(visitorCity){

            console.log('CALL API 2');

            const URLmeteo = `http://api.openweathermap.org/data/2.5/forecast?q=${visitorCity}&units=${units}&appid=${meteo_key}&lang=fr`;

            const meteoResponse = await fetch(URLmeteo);

            const bodyMeteoResponse = await meteoResponse.json();

            if (meteoResponse.ok) {

                const meteoOfTheWeek = bodyMeteoResponse.list.reduce((accumulator, data) => {

                    const day = getDayOfTheWeekFirstLetterCapitalized(data.dt_txt);

                    const description = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);

                    if (!accumulator[day]) {
                        accumulator[day] = []
                    }

                    accumulator[day].push({
                        city: visitorCity,
                        weather: data.weather[0].main,
                        description: description,
                        temp: data.main.temp,
                        icon: data.weather[0].icon,
                        feel: data.main.feels_like,
                        humidity: data.main.humidity,
                        windDirection: data.wind.deg
                    });

                    return accumulator;
                }, {});

                // petite fonction qui capitalize la premiere lettre d'une string
                // const description = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);

                setMeteo(meteoOfTheWeek);
                setError(null);

            } else {
                const meteoOfTheWeek = {
                    errorMessage: bodyMeteoResponse.message
                };
                setMeteo(meteoOfTheWeek);
                setError(bodyMeteoResponse.message);
            }
        }




            callAPI2(submittedCity);


        // }

    }, [submittedCity]);

    console.log('kek' ,submittedCity);

    console.log('kek2', hasBeenSubmitted);

    const loading = !error && !meteo[activeDay];

    const activeDayMeteo = !loading && meteo[activeDay];

    let city = !loading && meteo[activeDay][0].city;


    function handleSubmit(event) {
        alert('Le nom a été soumis : kikoo');
        event.preventDefault();
        setHasBeenSubmitted(true);
        setSubmittedCity(event.target[0].value);
        console.log("Vous avez taper : ", event.target[0].value);
    }



    return (
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mb-4 mt-4">Météo</button>
            </div>
            <Period>
                {getNextDaysOfTheWeek(today, 5).map(function (day) {

                    return (
                        <Day label={day} isActive={activeDay === day} handleClick={setActive}/>
                    )
                })
                }

            </Period>
            <h2 className={"text-center"}>Météo de {city}</h2>
            <form action="" onSubmit={handleSubmit} className={"d-flex justify-content-center"}>
                <div className="form-group mx-sm-2 mb-2">
            <input type="text" placeholder="Search.."  className={"text-center"} />
            <button type="submit" className={"text-center btn btn-primary ml-2"}>Submit</button>
                    </div>
            </form>
            {loading ? <Spinner color="dark" type="grow"/>
                : error ? <AlertError title={true} color={"warning"} pContent={activeDayMeteo.errorMessage}/>
                    : (

                        <div className="text-center mt-3" style={{
                            display: "flex",
                            justifyContent: "space-evenly"

                        }}>

                            {
                            activeDayMeteo.map((hour) => <div className={"bg bg-secondary rounded"} style={{width: "20%", border: "1px black solid"}}
                            ><Meteo
                                meteo={hour} activeDay={activeDay}
                            />
                            </div>)
                        }</div>
                    )}
        </div>
    );
}

export default App;