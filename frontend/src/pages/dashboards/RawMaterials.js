import React, { useContext } from "react";
import { Box, TextField } from "@mui/material";
import CollapsibleTable from "./DataIntakeTable";
import MyContext from "../Context/MyContext";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const RawMaterials = (props) => {
  // const { filter , setfilter } = useContext(MyContext);
  // console.log("data inside dataintake",filter);
  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("CONTEXT in dataintake", selectedTenant);
  console.log("data____", props.data);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <div className="App">
      <Box sx={{ p: "14px" }}>
        <Box
          sx={{
            paddingLeft: "10px",
            paddingRight: "10px",
            height: "70px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Box sx={{ display: "flex",alignItems: "center", justifyContent:"space-between" }}>
            <Typography variant="h5">
              <b>Tenant Id :{selectedTenant}</b>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  defaultValue={dayjs("2022-04-17")}
                />
                <DatePicker
                  label="End Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
      <CollapsibleTable />
    </div>
  );
};

export default RawMaterials;
