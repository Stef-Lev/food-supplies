import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import textFieldStyle from "../../utils/textFieldStyle";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import styles from "./ItemsFilter.module.css";

function ItemsFilter({ searchTerm, setSearchTerm, filter, setFilter }) {
  const sortBy = [
    { intlId: "products.page.input.none", default: "None", type: "none" },
    { intlId: "products.page.input.name", default: "Name", type: "name" },
    {
      intlId: "products.page.input.expiration",
      default: "Exp. Date",
      type: "exp",
    },
    {
      intlId: "products.page.input.date",
      default: "Date added",
      type: "date",
    },
  ];

  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();

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
            label={
              <FormattedMessage
                id="products.page.input.search"
                defaultMessage="Search by name"
              />
            }
            variant="outlined"
            autoComplete="off"
            classes={{
              root: classes.filters,
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl
            variant="outlined"
            className={styles.filter}
            classes={{
              root: classes.filters,
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Sort by
            </InputLabel>
            <Select
              id="demo-simple-select-outlined"
              value={filter}
              onChange={handleSelectChange}
              label="Sort by"
            >
              {sortBy.map((item, index) => (
                <MenuItem key={index + 1} value={item.type}>
                  <FormattedMessage
                    id={item.intlId}
                    defaultMessage={item.default}
                  />
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
