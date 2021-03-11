import React, { useEffect, useState } from 'react'
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox'
import Map from './Map'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))

          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;



    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)

      })
  }



  return (
    <div className="app">

      <div className='app__right'>
        <div className='app__header '>
          <h1> Covid-19 Tracker </h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value='worldwide'> Worldwide </MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name} </MenuItem>

              ))

              }


            </Select>

          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox title='CoronaVirus Cases' cases={12343} total={4423} />
          <InfoBox title='Recovered' />
          <InfoBox title='Dealths' />

        </div>
        <Map />
      </div>
      <div className='app__left'>
        <Card>
          <CardContent>
            <h3> Live Cases by Country </h3>
            <h3> Worldwide New Cases </h3>
          </CardContent>
        </Card>

      </div>



    </div>
  );
}

export default App;
