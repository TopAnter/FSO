
const ShowCountry = ({country, weather}) => {
    return(
        <div>
            <h1>{country.name.common}</h1>
          <h4>capital {country.capital}</h4>
          <h4>area {country.area}</h4>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages ?? {}).map(lang => (
                
                <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} />
          <h4>Weather in {country.capital}</h4>
          {weather && (
            <div>
                <p>temperature {Math.round(weather.main.temp - 273.15)} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )
}
const Input = (props) => {
  return(
    <div>
      find countries <input value={props.country} onChange={props.countryChange}/>
    </div>
  )
}

const CountryList = (props) => {
    const shownCountries = props.countries.filter(country => country.name.common.toLowerCase().includes(props.country.toLowerCase()))
    if(shownCountries.length > 10){
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    
  return(
    <div>
      {shownCountries.map(country => (
        <span key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => props.setSelectedCountry(country)}>Show</button>
            <br/>
        </span>
      ))}
      
    </div>
  )
}

export default {
    Input,
    CountryList,
    ShowCountry
}