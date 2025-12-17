import { useState, useEffect, type FormEvent } from 'react';
import './App.css';
import { Day } from './Day';
import { Period } from './Period';
import { Spinner } from './Components/Spinner';
import { AlertError } from './Components/Alert';
import { getDayOfTheWeekFirstLetterCapitalized, getNextDaysOfTheWeek } from './Utils/utils';
import { Meteo } from './Components/Meteo/Meteo';

export interface WeatherData {
    city: string;
    weather: string;
    description: string;
    temp: number;
    icon: string;
    feel: number;
    humidity: number;
    windDirection: number;
    date?: string;
}

interface WeatherWeekMap {
    [key: string]: WeatherData[];
}

interface WeatherError {
    message: string;
    response?: string;
}

interface ApiWeatherItem {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        deg: number;
    };
}

interface ApiWeatherResponse {
    cod: string;
    message: number | string;
    list: ApiWeatherItem[];
    city?: {
        name: string;
    };
}

const meteo_key = import.meta.env.VITE_METEO_KEY;
const geo_key = import.meta.env.VITE_GEO_KEY;
const ipify_key = import.meta.env.VITE_IPIFY_API_KEY;
const URLipify = `https://geo.ipify.org/api/v1?apiKey=${ipify_key}`;
const units = 'metric';

function App() {
    const today = getDayOfTheWeekFirstLetterCapitalized();
    const [activeDay, setActive] = useState<string | number>(today);
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState<boolean>(false);
    const [submittedCity, setSubmittedCity] = useState<string>('Bordeaux');
    const [error, setError] = useState<WeatherError | null>(null);
    const [meteo, setMeteo] = useState<WeatherWeekMap>({});

    useEffect(() => {
        console.log('api calling...');

        async function callAPI() {
            try {
                const ipResponse = await fetch(URLipify);
                if (!ipResponse.ok) throw new Error("IP fetch failed");
                const bodyIpResponse = await ipResponse.json();
                const visitorIP = bodyIpResponse.ip;
                console.log(visitorIP);

                const URLgeo = `http://api.ipstack.com/${visitorIP}?access_key=${geo_key}&format=1`;
                const cityResponse = await fetch(URLgeo);
                if (!cityResponse.ok) throw new Error("City fetch failed");

                const bodyCityResponse = await cityResponse.json();
                const visitorCity = bodyCityResponse.city;

                console.log('visitor city ', visitorCity);
                console.log("D'apres ton ip, tu es dans les environs de : " + visitorCity);
                
                const URLmeteo = `https://api.openweathermap.org/data/2.5/forecast?q=${visitorCity}&units=${units}&appid=${meteo_key}&lang=fr`;
                const meteoResponse = await fetch(URLmeteo);
                const bodyMeteoResponse: ApiWeatherResponse = await meteoResponse.json();

                if (meteoResponse.ok) {
                    processWeatherData(bodyMeteoResponse.list, visitorCity);
                    setError(null);
                } else {
                    handleApiError(bodyMeteoResponse.message);
                }

            } catch (err: unknown) {
                console.error("Initial API sequence failed", err);
            }
        }

        if (!meteo_key) {
            callAPI();
        }

        
        async function callAPI2(visitorCity: string) {
            console.log('CALL API 2');
            try {
                const URLmeteo = `https://api.openweathermap.org/data/2.5/forecast?q=${visitorCity}&units=${units}&appid=${meteo_key}&lang=fr`;
                const meteoResponse = await fetch(URLmeteo);
                const bodyMeteoResponse: ApiWeatherResponse = await meteoResponse.json();

                console.log("bodyMeteoResponse", bodyMeteoResponse);

                if (meteoResponse.ok) {
                    processWeatherData(bodyMeteoResponse.list, visitorCity);
                    setError(null);
                } else {
                    handleApiError(bodyMeteoResponse.message);
                }
            } catch (err) {
                console.error("API 2 failed", err);
                setError({ message: "Network error occurred" });
            }
        }

        function processWeatherData(list: ApiWeatherItem[], city: string) {
            const meteoOfTheWeek = list.reduce((accumulator, data) => {
                const day = getDayOfTheWeekFirstLetterCapitalized(data.dt_txt);
                const description = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);

                if (!accumulator[day]) {
                    accumulator[day] = [];
                }

                accumulator[day].push({
                    city: city,
                    weather: data.weather[0].main,
                    description: description,
                    temp: data.main.temp,
                    icon: data.weather[0].icon,
                    feel: data.main.feels_like,
                    humidity: data.main.humidity,
                    windDirection: data.wind.deg,
                    date: data.dt_txt
                });

                return accumulator;
            }, {} as WeatherWeekMap);

            setMeteo(meteoOfTheWeek);
        }

        function handleApiError(message: string | number) {
            const msgString = String(message);
            if (msgString === 'city not found') {
                setError({
                    message: 'La ville que vous recherchez n\'a pas été trouvée ou n\'existe pas.',
                    response: msgString
                });
            } else {
                setError({
                    message: msgString,
                    response: msgString
                });
            }
            setMeteo({});
        }

        if (!hasBeenSubmitted) {
            callAPI2(submittedCity);
        } else {
            callAPI2(submittedCity);
        }

    }, [submittedCity, hasBeenSubmitted]);


    console.log('submittedCity', submittedCity);
    console.log('hasBeenSubmitted', hasBeenSubmitted);
    
    const loading = !error && !meteo[activeDay as string];

    const activeDayMeteo = !loading ? meteo[activeDay as string] : [];
    
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const form = event.currentTarget;
        const input = form.elements[0] as HTMLInputElement;

        setHasBeenSubmitted(true);
        setSubmittedCity(input.value);
        console.log("Vous avez soumis : ", input.value);
    }

    let i = 0;

    return (
        <div className="main-container">
            <div className="d-flex justify-content-center flex-column header-container">
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success mb-4 mt-4 main-title" type="button">Météo</button>
                </div>

                <Period>
                    {getNextDaysOfTheWeek(today, 5).map(function (day) {
                        return (
                            <Day
                                key={day}
                                label={day}
                                isActive={activeDay === day}
                                handleClick={setActive}
                            />
                        )
                    })}
                </Period>

                <h2 className="text-center">Météo de {submittedCity}</h2>
                <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                    <div className="form-group mx-sm-2 mb-2">
                        <input type="text" placeholder="recherche.." className="text-center" />
                        <button type="submit" className="text-center btn btn-primary ml-2">Rechercher</button>
                    </div>
                </form>
            </div>

            {loading ? (
                <Spinner color="dark" type="grow" />
            ) : error ? (
                <AlertError
                    title={true}
                    color="warning"
                    pContent={error.response}
                    bottomContent={error.message}
                />
            ) : (
                <div className="text-center mt-3 meteo-card-container">
                    {activeDayMeteo.map((hour, idx) => {
                        i += 3;
                        return (
                            <div key={idx} className="bg bg-secondary rounded meteo-card">
                                <Meteo meteo={hour} activeDay={activeDay} index={i} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default App;
