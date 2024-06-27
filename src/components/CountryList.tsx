import { useQuery } from '@tanstack/react-query';

import { getCountryData } from '../lib/api';
import CountryCard from './CountryCard';
import { useEffect, useState } from 'react';
import { CountryInfo } from '../types/apiType';

function CountryList() {
  const [countryData, setCountryData] = useState<CountryInfo[]>([]);

  const { data, isFetched } = useQuery({
    queryKey: ['countryData'],
    queryFn: getCountryData,
  });

  useEffect(() => {
    if (isFetched && data) {
      setCountryData(data);
    }
  }, [isFetched, data]);

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  const toggleCountry = (id: string) => {
    const selectedCountry = countryData.find((data) => data.id === id);

    if (selectedCountry) {
      setCountryData((prevCountryData) =>
        prevCountryData.map((country) =>
          country.id === id
            ? { ...country, isSelected: !country.isSelected }
            : country
        )
      );
    }
  };

  return (
    <div className="p-12 bg-slate-200">
      <section>
        <h1 className="text-3xl font-bold text-center my-5">
          Favorite Countries
        </h1>
        <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isFetched &&
            countryData &&
            countryData
              .filter((country) => country.isSelected === true)
              .map((item) => (
                <CountryCard
                  key={item.id}
                  flag={item.flags.png}
                  countryName={item.name.common}
                  capital={item.capital}
                  isSelected={item.isSelected}
                  onClick={() => toggleCountry(item.id)}
                />
              ))}
        </div>
      </section>
      <section>
        <h1 className="text-3xl font-bold text-center my-5">Countries</h1>
        <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isFetched &&
            countryData
              .filter((country) => country.isSelected === false)
              .map((item) => (
                <CountryCard
                  key={item.id}
                  flag={item.flags.png}
                  countryName={item.name.common}
                  capital={item.capital}
                  isSelected={item.isSelected}
                  onClick={() => toggleCountry(item.id)}
                />
              ))}
        </div>
      </section>
    </div>
  );
}

export default CountryList;
