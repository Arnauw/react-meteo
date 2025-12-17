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
    errorMessage?: string;
}

interface MeteoProps {
    meteo: WeatherData;
    activeDay: string | number;
    index: number;
}

export function Meteo({ meteo, activeDay, index }: MeteoProps) {
    const formatHour = (h: number) => h.toString().padStart(2, '0');
    console.log("active day = ", activeDay);
    
    return (
        <>
            <div className="mt-3">
                Le {meteo.date}
            </div>

            <div className="mt-3">
                {formatHour(index - 3)} H - {formatHour(index)} H
            </div>

            <div className="mt-3">
                <img
                    src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${meteo.icon}.png`}
                    alt={meteo.description}
                />
            </div>

            <div className="mt-3">
                Temps : {meteo.description}
            </div>

            <div className="mt-3">
                Temperature réel : {meteo.temp} ° C
            </div>

            <div className="mt-3">
                Température ressenti : {meteo.feel} ° C
            </div>

            <div className="mt-3 mb-3">
                Humidité : {meteo.humidity} %
            </div>

            {/*
            <div className="compass" style={{ position: "relative" }}>
                <div className="North">Nord <div>0</div></div>
                <div className="West" style={{
                        position: "absolute",
                        top: "140px",
                        left: "35%"
                    }}>West <div>270</div></div>

                <div className="East" style={{
                        position: "absolute",
                        top: "140px",
                        left: "65%"
                    }}>East <div>90</div></div>
                <div className="mt-3" style={{
                        transform: `rotate(${Number(meteo.windDirection) - 90}deg)`,
                        height: '200px',
                        position: 'relative',
                        top: '-50px'
                    }}>
                    Sens du vent : {meteo.windDirection} degrés =>
                </div>
                <div className="South" style={{
                        position: "relative",
                        top: "30px"
                    }}>Sud <div>180</div></div>
            </div>
            */}
        </>
    );
}
