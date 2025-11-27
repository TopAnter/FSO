import { useState, useEffect } from 'react'
import Content from './components/content'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {    
        setCountries(data);     
      });
  }, []);

  useEffect(() => {
    if(!selectedCountry){
      return
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${api_key}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
  }, [selectedCountry])

  useEffect(() => {
  const filtered = countries.filter(country1 =>
    country1.name.common.toLowerCase().includes(country.toLowerCase())
  );

  if (filtered.length === 1) {
    setSelectedCountry(filtered[0]);
  }
  }, [country, countries]);

  const CountryChange = (event) => {
    setCountry(event.target.value)
    setSelectedCountry(null)
  }


  return (
    <div>
      <Content.Input country={country} countryChange={CountryChange}/>
      <Content.CountryList 
      country={country} 
      countries={countries} 
      setSelectedCountry={setSelectedCountry} 
      weather={weather}/>

      {selectedCountry && <Content.ShowCountry 
      country={selectedCountry} 
      weather={weather}/>}
    </div>
  )

}

export default App