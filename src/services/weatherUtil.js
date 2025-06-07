import weatherCodeMap from "../constatnts/weatherCodeMap.json";
import {
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiShowers,
  WiRain,
  WiRainMix,
  WiSnow,
  WiSnowflakeCold,
  WiThunderstorm,
  WiStormShowers
} from 'weather-icons-react';

// コンポーネント対応マップ
const iconMap = {
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiShowers,
  WiRain,
  WiRainMix,
  WiSnow,
  WiSnowflakeCold,
  WiThunderstorm,
  WiStormShowers
};

/**
 * お天気コードをお天気MAPで変換して、コンポーネントを返す
 * @param {*} weathercode 
 */
export function getWeatherIcon(weathercode) {
  // 現在の天気
  const weatherMap = weatherCodeMap[weathercode];
    // 天気アイコンコンポーネント
  return iconMap[weatherMap.icon];
}

export function getWeatherColor(weathercode) {
  // 天気カラーを返す
  return weatherCodeMap[weathercode].colorClass;
}