import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [initialFetchData, setInitialFetchData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setInitialFetchData(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      {initialFetchData ? <SearchBarCountries countries={initialFetchData} countriesFilteredData={setFilteredData} /> : <h1>Hold On Fetching Data</h1>}
      {filteredData && <WhatToDisplay displayData={filteredData} />}
    </>
  )
}

function SearchBarCountries({ countries, countriesFilteredData }) {

  function handleOnInputChange(event) {
    const valueToSearch = event.target.value.toLowerCase();
    const countriesFound = countries.filter(country => country.name.common.toLowerCase().includes(valueToSearch)
    )

    if (countriesFound.length === 0) {
      countriesFilteredData(`No Such Country In DB`)
      return
    }

    if (countriesFound.length > 10) {
      countriesFilteredData('Too Many Match, Specify another filter')
      return
    }

    countriesFilteredData(countriesFound)


  }

  return (
    <>
      <label htmlFor="find">Find Countries: </label>
      <input id="find" type="text" onChange={handleOnInputChange} />
    </>
  )

}

function WhatToDisplay({ displayData }) {

  if (typeof displayData === 'string') {
    return <p>{displayData}</p>
  }

  if (displayData.length === 1) {
    return <CountryInformation displayData={displayData} />
  }

  return displayData.map(country => {
    return (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
      </div>
    )
  })
}

function CountryInformation({ displayData }) {

  
  const { name: { common }, capital, languages, flag, flags } = displayData[0]

  return (
    <div>
      <h2>{common}</h2>
      <div>{capital.map(capital => <p key={capital}>{capital}</p>)}</div>
      <h3>Languages</h3>
      <ol>{Object.values(languages).map(language => <li key={language}>{language}</li>)}</ol>
      <p>{flag}</p>
    </div>
  )
}

export default App
