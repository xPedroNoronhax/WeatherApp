/** @format */
"use client";
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { WeatherData } from "../../types";
import { format, fromUnixTime, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale"; // Importando o locale para português
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Lins&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );
  const firstData = data?.list[0];
  console.log(data?.city);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Carregando...</p>
      </div>
    );

  // Função para capitalizar a primeira letra
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const dayOfWeek = format(parseISO(firstData?.dt_txt ?? ""), "EEEE", {
    locale: ptBR,
  });

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-2-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{capitalizeFirstLetter(dayOfWeek)}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 ">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className="txt-xs space-x-1 whitespace-nowrap">
                  <span>Sensação de:</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                  </span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "HH:mm ")}
                    </p>
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center"></p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
              />
            </Container>
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto ">
              <WeatherDetails
                visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPA`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 17083255),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 17083255),
                  "H:mm"
                )}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </Container>
          </div>
        </section>
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl ">Próximos 7 dias...</p>
          {firstDataForEachDate.map((d, i) => (
            <ForecastWeatherDetail
              key={i}
              description={d?.weather[0].description ?? ""}
              weatherIcon={d?.weather[0].icon ?? "01d"}
              date={
                d ? format(parseISO(d.dt_txt), "dd.MM", { locale: ptBR }) : ""
              }
              day={
                d ? format(parseISO(d.dt_txt), "EEEE", { locale: ptBR }) : ""
              }
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp_max ?? 0}
              temp_min={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa `}
              humidity={`${d?.main.humidity}% `}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1702517657),
                "H:mm",
                { locale: ptBR }
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1702517657),
                "H:mm",
                { locale: ptBR }
              )}
              visibility={`${metersToKilometers(d?.visibility ?? 10000)} `}
              windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
