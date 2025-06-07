import { useState } from "react";
import CityInput from './components/CityInput';
import WeatherWindow from './components/WeatherWindow';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className='max-w-3xl flex flex-col m-auto px-4'>
      <CityInput onSelect={city => setSelectedCity(city)}/>
      <WeatherWindow city={selectedCity} />
    </div>
  );
}

export default App;