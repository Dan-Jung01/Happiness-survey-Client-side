import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useHistory } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { Container, Row, Form, Label, Input, Col, Button } from "reactstrap";

const API_URL = "http://131.181.190.87:3000";
const FACTORS_API_URL = "http://131.181.190.87:3000/factors";

function Factors() {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [currentURL, setcurrentURL] = useState(API_URL);
  const [currentLimit, setcurrentLimit] = useState();
  const [yearChanged, setYearChanged] = useState();

  let history = useHistory();

  const columnDefs = [
    {
      headerName: "Rank",
      field: "rank",
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "Score",
      field: "score",
    },
    {
      headerName: "Economy",
      field: "economy",
    },
    {
      headerName: "Family",
      field: "family",
    },
    {
      headerName: "Health",
      field: "health",
    },
    {
      headerName: "Freedom",
      field: "freedom",
    },
    {
      headerName: "Generosity",
      field: "generosity",
    },
    {
      headerName: "Trust",
      field: "trust",
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  // Fetch data from URL provided as parameter an set it to the ag-grid
  function setValues(url, year) {
    const token = localStorage.getItem("token");
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, { headers })
      .then((result) => result.json())
      .then((data) =>
        data.map((factor) => {
          return {
            rank: factor.rank,
            country: factor.country,
            score: factor.score,
            economy: factor.economy,
            family: factor.family,
            health: factor.health,
            freedom: factor.freedom,
            generosity: factor.generosity,
            trust: factor.trust,
          };
        })
      )
      .then((factors) => setRowData(factors))
      .catch(function (error) {
        console.log("Happiness factor of " + year + " not found!");
      });
  }

  function barChart(element, color) {
    return (
      <BarChart
        layout='vertical'
        width={500}
        height={400}
        data={rowData}
        barSize={12}
        margin={{
          top: 20,
          right: 30,
          left: 40,
          bottom: 30,
        }}
      >
        <XAxis type='number' />
        <YAxis dataKey={"country"} type='category' scale='band' />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Bar dataKey={element} stackId='a' fill={color} />
      </BarChart>
    );
  }

  // Handle the cell rows being clicked
  function onRowClicked(row) {
    history.push("/factors/" + row.data.country);
  }

  function handleChange(evt) {
    console.log("new value", evt.target.value);
    let url_year = evt.target.value;
    if (evt.target.value === "--Select--") {
      let url = `${API_URL}`;
      // setValues(url, null);
      setYearChanged(false);
    }
    if (evt.target.value === url_year) {
      let urll = `${FACTORS_API_URL}/` + url_year;
      let url = `${FACTORS_API_URL}/` + url_year + `?limit=` + currentLimit;
      setValues(url, null);
      setcurrentURL(url);
      setYearChanged(urll);
      console.log(currentURL);
    }
    return url_year;
  }

  function handleLimitChange(evtt) {
    console.log("new value", evtt.target.value);
    let url_limit = evtt.target.value;
    if (evtt.target.value === "--Select--") {
      let url = `${API_URL}`;
      setValues(url, null);
    }
    if (evtt.target.value === url_limit) {
      let url = `${yearChanged}/` + `?limit=` + url_limit;
      setcurrentLimit(url_limit);
      setValues(url, null);
      console.log(currentURL);
    }
    return url_limit;
  }

  // Initially, call the setValues function with the base url to display all data
  useEffect(() => {
    setValues(`${FACTORS_API_URL}`, null);
  }, []);

  return (
    <div className='flex justify-center items-center mt-10'>
      <Container>
        <Row className='flex items-center'>
          <Form>
            <Label for='ranking'>Filter by year &nbsp;</Label>
            <Input
              type='select'
              name='selectMulti'
              id='exampleSelectMulti'
              onChange={handleChange}
              alt='select year'
            >
              <option alt='select'>--Select--</option>
              <option alt='2020'>2020</option>
              <option alt='2019'>2019</option>
              <option alt='2018'>2018</option>
              <option alt='2017'>2017</option>
              <option alt='2016'>2016</option>
            </Input>
            <Label for='ranking'>&nbsp; Ranking Top &nbsp;</Label>
            <Input
              type='select'
              name='selectLimit'
              id='exampleSelectLimit'
              onChange={handleLimitChange}
              alt='select limit'
            >
              <option alt='select'>--Select--</option>
              <option alt='3'>3</option>
              <option alt='4'>4</option>
              <option alt='5'>5</option>
              <option alt='6'>6</option>
              <option alt='7'>7</option>
              <option alt='8'>8</option>
              <option alt='9'>9</option>
              <option alt='10'>10</option>
            </Input>
          </Form>
        </Row>
        <Row>
          <div
            className='ag-theme-material'
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
          <div className='flex flex-wrap content-around justify-center'>
            {barChart("economy", "#FEBC3B")}
            {barChart("family", "#FD8080")}
            {barChart("health", "#68D4CD")}
            {barChart("freedom", "#8B75D7")}
            {barChart("generosity", "#26A0FC")}
            {barChart("trust", "#6D848E")}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Factors;
