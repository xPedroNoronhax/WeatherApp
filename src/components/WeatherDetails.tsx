import React from "react";
import { LuEye } from "react-icons/lu";

type Props = {};

function WeatherDetails({}: Props) {
  return (
    <>
      <SingleWeatherDetail information="Visibilidade" icon={<LuEye />} value="" />
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
