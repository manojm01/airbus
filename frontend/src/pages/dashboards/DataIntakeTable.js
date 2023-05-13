import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MyContext from "../Context/MyContext";
import { DataContext } from "../Context/DataContext";
import axios from "axios";

function Row(props) {
  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("Tenant Selected", selectedTenant);

  const { row } = props;
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.startTime}
        </TableCell>
        <TableCell>{row.endTime}</TableCell>
        <TableCell>{row.validationStatus}</TableCell>
        <TableCell>{row.processingStatus}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Reads</TableCell>
                    <TableCell>Errors</TableCell>
                    <TableCell>Warns</TableCell>
                    <TableCell>Ignores</TableCell>
                    <TableCell>Writes</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fileData.map((historyRow) => (
                    <TableRow key={historyRow.File_Name}>
                      <TableCell component="th" scope="row">
                        {historyRow.File_Name}
                      </TableCell>
                      <TableCell>{historyRow.Start_Time}</TableCell>
                      <TableCell>{historyRow.End_Time}</TableCell>
                      <TableCell>{historyRow.Reads}</TableCell>
                      <TableCell> {historyRow.Errors}</TableCell>
                      <TableCell> {historyRow.Warns}</TableCell>
                      <TableCell> {historyRow.Ignores}</TableCell>
                      <TableCell> {historyRow.Writes}</TableCell>
                      <TableCell> {historyRow.Status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [data, setdata] = useState([]);
  const { selectedTenant } = useContext(MyContext);
 // console.log("This TenantID we selected from nav", selectedTenant);
 

  useEffect(() => {
    axios
      .get("http://localhost:3000/dataIntake")
      .then((response) => {
        console.log("dataIntake in table", response);
        
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const filteredData = data.filter((row) => row.tenantId === selectedTenant);
 
  console.log("filterdata",filteredData);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="DataIntakeTable table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#f0f0f0" }}>
            <TableCell />
            <TableCell style={{ fontWeight: "bold", color: "black" }}>
              Start Time
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>End Time</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Validation Status
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Processing Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <Row key={row.tenantId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // calories: PropTypes.number.isRequired,
    //arbs: PropTypes.number.isRequired,
    //  fat: PropTypes.number.isRequired,
    Details: PropTypes.arrayOf(
      PropTypes.shape({
        Status: PropTypes.number.isRequired,
        Writes: PropTypes.number.isRequired,
        Writes: PropTypes.number.isRequired,
        Ignores: PropTypes.number.isRequired,
        Ignores: PropTypes.number.isRequired,
        Wanrs: PropTypes.number.isRequired,
        Warns: PropTypes.number.isRequired,
        Errors: PropTypes.number.isRequired,
        Errors: PropTypes.number.isRequired,
        Reads: PropTypes.number.isRequired,
        End_Time: PropTypes.number.isRequired,
        Start_Time: PropTypes.string.isRequired,
        File_Name: PropTypes.string.isRequired,
      })
    ).isRequired,
    Start_Time: PropTypes.string.isRequired,
    End_Time: PropTypes.string.isRequired,
    Validation_status: PropTypes.string.isRequired,
    Processing_status: PropTypes.string.isRequired,
  }).isRequired,
};
