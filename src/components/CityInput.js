import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import cityMap from "../constatnts/cityMap.json";

const cities = Object.keys(cityMap);

export default function CityInput({ onSelect }) {
  const [inputValue, setInputValue] = useState('福岡県');

  return (
    <Autocomplete
      options={cities}
      value={inputValue}
      onChange={(event, newValue) => {
        setInputValue(newValue);
        if (onSelect) onSelect(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="どこの天気が知りたいですか？" />}
      className="my-4"
    />
  );
}