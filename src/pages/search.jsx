import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useHistory } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { Container, Row, Form, Label, Input, Col, Button } from "reactstrap";

import "../App.css";

const API_URL = "http://131.181.190.87:3000";
const API_COUNTRY_URL = "http://131.181.190.87:3000/countries";

function Ranking() {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("type country name");
  const [textCountry, setTextCountry] = useState([]);

  let history = useHistory();

  // Set column header and field that will go into agGrid
  const columnDefs = [
    {
      headerName: "Year",
      field: "year",
    },
    {
      headerName: "Rank",
      field: "rank",
    },
    {
      headerName: "Score",
      field: "score",
    },
    {
      headerName: "Country",
      field: "country",
    },
  ];

  // Reverse order of rowData that contain ranking API
  let rank = rowData.map((res) => res).reverse();

  const RankingLineChart = () => {
    return (
      <LineChart width={900} height={400} data={rank}>
        <XAxis dataKey='year' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='rank' stroke='#0a23b4' />
      </LineChart>
    );
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  // Fetch data from URL provided as parameter an set it to the ag-grid
  function setValues(url, year) {
    fetch(url)
      .then((result) => result.json())
      .then((data) =>
        data.map((ranking) => {
          return {
            year: ranking.year,
            rank: ranking.rank,
            score: ranking.score,
            country: ranking.country,
          };
        })
      )
      .then((rankings) => setRowData(rankings))
      .catch(function (error) {
        console.log("Happiness ranking of " + year + " not found!");
      });
  }

  // Fetch countries API
  function setCountry(url, country) {
    fetch(url)
      .then((result) => result.json())
      .then((data) =>
        data.map((country) => {
          return country;
        })
      )
      .then((countriesData) => setCountries(countriesData))
      .catch(function (error) {
        console.log(country + "has not found!");
      });
  }

  //Creating select Options
  function createOptions() {
    let options = [];
    for (let i = 0; i <= countries.length; i++) {
      options.push(
        <option key={countries[i]} value={countries[i]}>
          {countries[i]}
        </option>
      );
    }
    return options;
  }

  // console.log(countries);
  // let result = rowData.map((res) => res.year);
  // console.log(result);

  // Handle the cell rows being clicked
  function onRowClicked(row) {
    history.push("/search/" + row.data.country);
  }

  function selectChange(evt) {
    console.log("new value", evt.target.value);
    let url_country = evt.target.value;
    if (evt.target.value === url_country) {
      let url = `${API_URL}/rankings?country=` + url_country;
      setValues(url, null);
      setSelectedCountry(url_country);
    }
  }

  function enterPressed(evt) {
    evt.preventDefault();
    if (evt.target.elements.country.value === "") {
      let url_country = evt.target.value;
      let url = `${API_URL}/rankings?country=` + url_country;
      setValues(url, null);
    } else {
      let url_suffix = evt.target.elements.country.value.replace(/ /g, "%20");
      let url = `${API_URL}/rankings?country=` + url_suffix;
      setValues(url, evt.target.elements.country.value);
    }
  }

  function countryChange(evt) {
    console.log("new value", evt.target.value);
    let url_country = evt.target.value;

    if (evt.key === "Enter") {
      let url = `${API_URL}/rankings?country=` + url_country;
      setValues(url, null);
    }

    if (evt.target.value === url_country) {
      let url = `${API_URL}/rankings?country=` + url_country;
      setValues(url, null);
      setTextCountry(url_country);
    }
    setTextCountry(url_country);
  }

  // Initially, call the setValues function with the base url to display all data
  useEffect(() => {
    setValues(`${API_URL}/rankings`, null);
    setCountry(`${API_COUNTRY_URL}`, null);
  }, []);

  return (
    <div className='flex justify-center items-center mt-10'>
      <Container>
        <Row className='flex items-center py-2'>
          <Col>
            <Label for='ranking'>Search for &nbsp;</Label>
          </Col>
          <Col xs='auto'>
            <Form onSubmit={enterPressed}>
              <Input
                type='text'
                name='country'
                id='country'
                placeholder={selectedCountry}
                onChange={countryChange}
              />
              <Input
                type='select'
                name='selectMulti'
                id='exampleSelectMulti'
                placeholder='Select a country'
                onChange={selectChange}
              >
                {createOptions()}
              </Input>

              <Button
                className='py-1 ml-10 w-28 rounded-lg border-2 border-yellow-500'
                type='reset'
                alt='clear'
              >
                Clear
              </Button>
              <Button
                className='py-1 ml-8 w-32 rounded-lg border-2 border-yellow-500'
                type='button'
                alt='see row data'
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://en.wikipedia.org/wiki/World_Happiness_Report"
                  );
                }}
              >
                See row-data
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <div
            className='ag-theme-material mt-5'
            style={{
              width: "100%",
            }}
          >
            <AgGridReact
              domLayout={"autoHeight"}
              pagination={true}
              paginationPageSize={15}
              columnDefs={columnDefs}
              rowData={rowData}
              animateRows={true}
              onGridReady={onGridReady}
              onRowClicked={onRowClicked}
            ></AgGridReact>
          </div>
          <div className='flex justify-center'>
            <RankingLineChart />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Ranking;
