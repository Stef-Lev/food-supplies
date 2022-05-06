import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import styles from "./ItemsFilter.module.css";

function ItemsFilter({ searchTerm, setSearchTerm, filter, setFilter }) {
  const sortBy = [
    { label: "Clear", type: "clear" },
    { label: "Name", type: "name" },
    { label: "Exp. Date", type: "exp" },
    { label: "Date added", type: "date" },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    if (event.target.value === "clear") {
      setFilter("");
    } else {
      setFilter(event.target.value);
    }
  };

  return (
    <>
      <div className={styles.filter_container}>
        <Container maxWidth="sm" className={styles.filter_box}>
          <TextField
            className={styles.searchbox}
            id="new-prd-expires"
            label="Search by name"
            variant="outlined"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" className={styles.filter}>
            <InputLabel id="demo-simple-select-outlined-label">
              Sort by
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={filter}
              onChange={handleSelectChange}
              label="Sort by"
            >
              {sortBy.map((item, index) => (
                <MenuItem key={index + 1} value={item.type}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
      </div>
    </>
  );
}

export default ItemsFilter;
