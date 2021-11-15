import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useHistory } from "react-router-dom";

import { Container, Row, Form, Label, Input, Col, Button } from "reactstrap";

const API_URL = "http://131.181.190.87:3000";

function Ranking() {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

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
      headerName: "Year",
      field: "year",
    },
  ];

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
            rank: ranking.rank,
            country: ranking.country,
            score: ranking.score,
            year: ranking.year,
          };
        })
      )
      .then((rankings) => setRowData(rankings))
      .catch(function (error) {
        console.log("Happiness ranking of " + year + " not found!");
      });
  }

  // Handle the cell rows being clicked
  function onRowClicked(row) {
    // console.log(row.data.symbol);
    history.push("/rankings/" + row.data.rank);
  }

  function handleChange(evt) {
    console.log("new value", evt.target.value);
    let url_year = evt.target.value;
    if (evt.target.value === "All") {
      let url = `${API_URL}/rankings`;
      setValues(url, null);
    }
    if (evt.target.value === url_year) {
      let url = `${API_URL}/rankings?year=` + url_year;
      setValues(url, null);
    }
  }

  // Initially, call the setValues function with the base url to display all data
  useEffect(() => {
    setValues(`${API_URL}/rankings/`, null);
  }, []);

  return (
    <div className='flex justify-center items-center mt-10'>
      <Container>
        <Row className='flex items-center'>
          <Col>
            <Label for='ranking'>Filter by year &nbsp;</Label>
          </Col>
          <Col xs='auto'>
            <Form>
              <Input
                type='select'
                name='selectMulti'
                id='exampleSelectMulti'
                onChange={handleChange}
                alt='filter by year'
              >
                <option alt='All'>All</option>
                <option alt='2020'>2020</option>
                <option alt='2019'>2019</option>
                <option alt='2018'>2018</option>
                <option alt='2017'>2017</option>
                <option alt='2016'>2016</option>
              </Input>
            </Form>
          </Col>
          <Button
            className='py-1 ml-8 w-32 rounded-lg border-2 border-yellow-500'
            alt='see row data'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://en.wikipedia.org/wiki/World_Happiness_Report"
              );
            }}
          >
            See row-data
          </Button>
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
        </Row>
      </Container>
    </div>
  );
}

export default Ranking;
