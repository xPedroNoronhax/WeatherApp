import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailProps {
  visibility?: string;
  humidity?: string;
  windSpeed?: string;
  airPressure?: string;
  sunrise?: string;
  sunset?: string;
}

function WeatherDetails({
  visibility = "25km",
  airPressure = "1012 hPa",
  humidity = "61%",
  sunrise = "6:20",
  sunset = "18:48",
  windSpeed = "7 km/h",
}: WeatherDetailProps) {
  return (
    <>
      <SingleWeatherDetail
        information="Visibilidade"
        icon={<LuEye />}
        value={visibility}
      />
      <SingleWeatherDetail
        information="Umidade"
        icon={<FiDroplet />}
        value={humidity}
      />
      <SingleWeatherDetail
        information="Vento"
        icon={<MdAir />}
        value={windSpeed}
      />
      <SingleWeatherDetail
        information="Pressão"
        icon={<ImMeter />}
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Nascer do Sol"
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Por do Sol"
        value={sunset}
      />
    </>
  );
}

export default WeatherDetails;

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail({
  information,
  icon,
  value,
}: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80 ">
      <p className="whitespace-nowrap ">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}
