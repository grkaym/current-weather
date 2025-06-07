import { useEffect, useState } from "react";
import weatherCodeMap from "../constatnts/weatherCodeMap.json";
import cityMap from "../constatnts/cityMap.json";
import DailyWeather from "../components/DailyWeather";
import { getWeatherIcon, getWeatherColor } from "../services/weatherUtil";

export default function WeatherInfo({ cityName }) {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  // 都市情報
  const city = cityName ? cityMap[cityName] : cityMap["東京都"];
  
  // useEffectは「コンポーネントがマウントされた直後」「依存配列にある値が変わったとき」に実行される
  useEffect(() => {
    // ロード初期化
    setLoading(true);
    // Open-MeteoのURL
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=wind_speed_10m,relative_humidity_2m,apparent_temperature,temperature_2m,weather_code&timezone=Asia%2FTokyo`;
    // データフェッチを実行
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // 天気情報をStateに保持
        setWeather(data);
        // ローディングを終了
        setLoading(false);
      })
      .catch(error => {
        console.log("データフェッチエラー：", error);
        setLoading(false);
      });
  }, [city]);

  // ロード中...
  if(loading || !weather) {
    return <p className="min-h-2xl">天気情報取得中...</p>
  }

  // 現在の天気
  const weatherMap = weatherCodeMap[weather.current.weather_code];
  // 天気アイコンコンポーネント
  const IconComponent = getWeatherIcon(weather.current.weather_code);

  return (
    <>
      <div className="flex justify-around">
        <div className="flex flex-col items-center justify-center gap-8 flex-5">
          <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {city.location}
          </h5>
          {IconComponent && <IconComponent  size={100} className={getWeatherColor(weather.current.weather_code)} />}
          <div className="text-xl tracking-tight text-gray-900 dark:text-white">
            {weatherMap.description}
          </div>
        </div>
        <div className="flex items-center flex-3">
          <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div className="flex flex-col py-3 w-full">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">気温</dt>
                  <dd className="ml-4 text-lg font-semibold">{weather.current.temperature_2m} ℃</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">湿度</dt>
                  <dd className="ml-4 text-lg font-semibold">{weather.current.relative_humidity_2m} ％</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">体感温度</dt>
                  <dd className="ml-4 text-lg font-semibold">{weather.current.apparent_temperature} ℃</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">風速</dt>
                  <dd className="ml-4 text-lg font-semibold">{weather.current.wind_speed_10m} km/h</dd>
              </div>
          </dl>
        </div>
      </div>
      <hr className="text-gray-200 mt-3" />
      <DailyWeather weather={weather} />
    </>
  );
}