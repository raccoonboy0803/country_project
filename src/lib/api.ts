import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { CountryInfo, ApiResponse } from '../types/apiType';

export const getCountryData = async (): Promise<CountryInfo[]> => {
  const response = await axios.get<ApiResponse[]>(
    'https://restcountries.com/v3.1/all'
  );
  const data = response.data.map((country) => ({
    id: uuidv4(),
    isSelected: false,
    name: {
      common: country.name.common,
    },
    flags: {
      png: country.flags.png,
    },
    capital: country.capital,
  }));

  return data;
};
