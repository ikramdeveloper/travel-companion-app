import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const Header = ({ setCoordinates }) => {
  const [autoComplete, setAutoComplete] = useState(null);
  const { title, toolbar, search, searchIcon, inputInput, inputRoot } =
    useStyles();

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autoComplete?.getPlace()?.geometry?.location?.lat();
    const lng = autoComplete?.getPlace()?.geometry?.location?.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar className={toolbar}>
        <Typography variant="h5" className={title}>
          Travel Companion
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <section className={search}>
              <div className={searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: inputRoot, input: inputInput }}
              />
            </section>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
