import { format, parseISO } from "date-fns";
import { getWeatherIcon, getWeatherColor } from "../services/weatherUtil";
import { ja } from "date-fns/locale";

export default function DailyWeather({ weather }) {
  const dates = weather.daily.time;
  const weatherCodes = weather.daily.weather_code;
  const maxTemps = weather.daily.temperature_2m_max;
  const minTemps = weather.daily.temperature_2m_min;

  let week = [];
  for(let i = 0; i < dates.length; i++) {
    // デイリーお天気
    const dailyObj = {
      "date": dates[i],
      "weathercode": weatherCodes[i],
      "maxTemp": maxTemps[i],
      "minTemp": minTemps[i],
    };

    // 週間天気配列にPUSH
    week.push(dailyObj);
  }

  return(
    <div>
      <dl className="w-full text-center flex text-gray-900 dark:text-white dark:divide-gray-700">
        <div className="flex flex-col py-3 flex-1 border-b border-gray-200 justify-center">
            <dt className="text-gray-500 md:text-lg dark:text-gray-400">日付</dt>
        </div>
        <div className="flex flex-col py-3 flex-1 border-b border-gray-200">
            <dt className="text-gray-500 md:text-lg dark:text-gray-400">天気</dt>
        </div>
        <div className="flex flex-col py-3 flex-1 border-b border-gray-200">
            <dt className="text-gray-500 md:text-lg dark:text-gray-400">最低気温</dt>
        </div>
        <div className="flex flex-col py-3 flex-1 border-b border-gray-200">
            <dt className="text-gray-500 md:text-lg dark:text-gray-400">最高気温</dt>
        </div>
      </dl>
      {
        week.map((daily, index) => {
          const IconComponent = getWeatherIcon(daily.weathercode);
          return (
            <dl key={index} className="text-center flex text-gray-900 dark:text-white dark:divide-gray-700">
                <div className="flex flex-col py-3 flex-1 border-b border-gray-200 justify-center">
                    <dd className="text-lg">{format(parseISO(daily.date), "M/d(E)", { locale: ja })}</dd>
                </div>
                <div className="flex flex-col py-3 flex-1 border-b border-gray-200 justify-center">
                    <dd className="text-lg font-semibold flex justify-center items-center">
                      {IconComponent && <IconComponent  size={40} className={getWeatherColor(daily.weathercode)} />}
                    </dd>
                </div>
                <div className="flex flex-col py-3 flex-1 border-b border-gray-200 justify-center">
                    <dd className="text-lg font-semibold text-blue-500">{daily.minTemp}</dd>
                </div>
                <div className="flex flex-col py-3 flex-1 border-b border-gray-200 justify-center">
                    <dd className="text-lg font-semibold text-red-500">{daily.maxTemp}</dd>
                </div>
            </dl>
          )
        })
      }
    </div>
  );
}