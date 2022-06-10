import { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [eleRefs, setEleRefs] = useState([]);
  const { container, list, formControl, loading } = useStyles();

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, index) => eleRefs[index] || createRef());

    setEleRefs(refs);
  }, [places]);

  return (
    <div className={container}>
      <Typography variant="h4">
        Restaurants, Hotels &amp; Attractions around you
      </Typography>

      {isLoading ? (
        <div className={loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={list}>
            {places?.map((place, index) => (
              <Grid item xs={12} key={index} ref={eleRefs[index]}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={eleRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
export default List;
