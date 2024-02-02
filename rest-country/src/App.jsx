
import React, { useState } from 'react';
import Header from '../../COUNTRY/src/Components/Header.jsx';
import Countries from '../../COUNTRY/src/Components/Countries.jsx';
import Country from '../../COUNTRY/src/Components/Country.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useFetch from '../../COUNTRY/src/Components/useFetch.jsx';

function App() {
  const [inputField, setInputField] = useState('');
  const [search, setSearch] = useState('');
  const [filtra, setFilter] = useState('All');
  const { data } = useFetch('https://restcountries.com/v2/all');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputField);
  };

  const handleSelect = (e) => {
    setFilter(e.target.value);
    setSearch("");
    setInputField('');
  };

  const getCountryName = (code) => {
    let countryName;
    const country = data.filter((element) => element.alpha3Code === code);
    countryName = country[0].name;
    return countryName;
  };

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <form onSubmit={handleSubmit}>
                  <div className="inputField">
                    <input
                      type="search"
                      placeholder="Search for a country..."
                      value={inputField}
                      onChange={(e) => {
                        setInputField(e.target.value);
                        setSearch(e.target.value);
                      }}
                    />
                    <i className="fas fa-search"></i>
                  </div>
                  <select id="region" name="region" onChange={handleSelect}>
                    <option value="All" defaultValue>
                      All
                    </option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </form>
                <Countries
                  filtra={filtra}
                  input={search}
                  numberWithCommas={numberWithCommas}
                />
              </div>
            }
          />
          <Route
            path=":countryName"
            element={
              <Country
                numberWithCommas={numberWithCommas}
                getCountryName={getCountryName}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
