import WeatherInfo from "./WeatherInfo";

export default function WeatherWindow({ city }) {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <WeatherInfo cityName={city} />
    </div>
  );
}