import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import axios from "axios";
import "./TableComponent.css";
import college_logo from "../../assets/college_logo.png";
// import { IoMdDownload } from "react-icons/io";
import { FormControl, Select, MenuItem } from "@mui/material";
import { Button } from "@mui/material";
const TableComponent = () => {
  const [branch, setBranch] = useState("AllBranches");
  const [presentDetails, setPresentDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://35.193.117.153/get_attendees")
      .then((response) => {
        // Correct way to access response data
        setPresentDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(presentDetails);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${branch}-atendees.xlsx`);
};
  const handleChangeInFilter = (e) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);
    axios
      .get(
        `http://35.193.117.153/get_attendees_${selectedBranch.toLowerCase()}`
      )
      .then((response) => {
        // Correct way to access response data
        setPresentDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="college-logo-div">
        <img src={college_logo} alt="College Logo" className="college-logo" />
      </div>

      <div className="bg-container">
        <div className="filter-container" style={{textAlign:"center"}}>
          <div>
            <h1
              style={{
                color: "white",
                fontSize: "1.5rem",
                alignItems: "center",
              }}
            >
              Filter by branch
            </h1>
            <FormControl
              style={{ backgroundColor: "white" }}
              sx={{
                mb: 2,
                width: "300px",
              }}
            >
              <Select
                labelId="branch-select-label"
                id="branch-select"
                value={branch}

                onChange={handleChangeInFilter}
              >
                <MenuItem value={"AllBranches"} selected={true}>
                  ALL BRANCHES
                </MenuItem>
                <MenuItem value={"CSE"}>CSE</MenuItem>
                <MenuItem value={"CST"}>CST</MenuItem>

                <MenuItem value={"ECE"}>ECE</MenuItem>
                <MenuItem value={"ECT"}>ECT</MenuItem>

                <MenuItem value={"EEE"}>EEE</MenuItem>
                <MenuItem value={"MECH"}>MECH</MenuItem>
                <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                <MenuItem value={"MBA"}>MBA</MenuItem>
                <MenuItem value={"MTECH"}>MTECH</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "1rem",
            }}
            onClick={handleExport}
            type="submit"
          >
            Download Data
          </Button>
        </div>
        <div className="top-container">
          <div className="sub-container">
            <div className="table-title">
              <span
                style={{ textAlign: "center", fontSize: "2rem", margin: "0px" }}
              >
                {" "}
                REGISTERED STUDENTS LIST
              </span>
            </div>
            <h3>{branch} Total count : {presentDetails.length}</h3>
            <table className="table" border={1}>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>ROLL NO</th>
                  <th>NAME</th>
                  <th>PROGRAM</th>
                  <th>BRANCH</th>
                </tr>
              </thead>
              <tbody>
                {presentDetails.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.roll_no}</td>
                    <td>{student.name}</td>
                    <td>{student.program}</td>
                    <td>{student.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <a href="/buildForm" style={{ color: "white" }}>
        <h3 style={{ color: "white" }}>Build by DEPT OF CAI & AIML</h3>
        </a>
      </div>
    </>
  );
};

export default TableComponent;
