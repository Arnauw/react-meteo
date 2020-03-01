import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Day from "./Day";
import Period from "./Period";

const API_KEY = "e184943229e3aef2a626130052103510";
const city = "Bordeaux";
const units = 'metric';
const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`;
const fullURL = "http://api.openweathermap.org/data/2.5/forecast?q=Bordeaux&units=metric&appid=e184943229e3aef2a626130052103510";


function App() {

    const [activeDay, setActive] = React.useState("Dimanche");
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [meteo, setMeteo] = React.useState({});

    // const state = React.useState();
    // const activeDay = state[0];
    // const setActiveDay = state[1];

    React.useEffect(() => {
        console.log('api calling...');

        async function callAPI() {

            const apiResponse = await fetch(URL);

            const bodyResponse = await apiResponse.json();

            setLoading(false);

            if (apiResponse.ok) {

                const data = bodyResponse.list[0];
                const parsedMeteo = {
                    weather: data.weather[0].main,
                    description: data.weather[0].description,
                    temp: data.main.temp
                };

                setMeteo(parsedMeteo);
                setError(null);

            } else {
                setError(bodyResponse.message);
            }
        }

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
                            Metéo de {city} le {activeDay}
                        </div>
                        <div className="mt-3">
                            Temperature : {meteo.temp}
                        </div>
                        <div className="mt-3">
                            Weather : {meteo.description}
                        </div>
                    </div>
            }

        </div>
    );
}

export default App;
