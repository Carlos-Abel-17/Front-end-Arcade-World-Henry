import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  gamePlataforms,
  gameGenres,
  setSelectedPlatform,
  setSelectedGenre,
  resetFilters,
  filterGames,
  resetGenreFilter,
  resetPlatformFilter,
  sortGamesAsc,
  sortGamesDesc,
  filterGamesByPrice,
  setSelectedPrice
} from "../../redux/actions";
import { Stack, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
function Sider() {
  //fetch platforms:
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gamePlataforms());
  }, [dispatch]);
  let allPlatforms = useSelector((state) => state.platforms);
  let allPlatformsArray = Object.values(allPlatforms);

  //este codigo es para visualizar el reset filter
  let selectedPlatform = useSelector((state) => state.selectedPlatform);
  useEffect(() => {}, [selectedPlatform]);

  function handlePlatformSelectChange(e) {
    let platformName = e.target.value;
    if (platformName === "") {
      dispatch(resetPlatformFilter());
    } else {
      dispatch(setSelectedPlatform(platformName));
    }
    dispatch(filterGames());
  }

  //fetch genres:
  useEffect(() => {
    dispatch(gameGenres());
  }, [dispatch]);
  let allGenres = useSelector((state) => state.genres);
  let allGenresArray = Object.values(allGenres);

  //este codigo es para visualizar el reset filter
  let selectedGenre = useSelector((state) => state.selectedGenre);
  useEffect(() => {}, [selectedGenre]);

  function handleGenreSelectChange(e) {
    let genresName = e.target.value;
    if (genresName === "") {
      dispatch(resetGenreFilter());
    } else {
      dispatch(setSelectedGenre(genresName));
    }
    dispatch(filterGames());
  }

  //input
  const selectedPrice = useSelector(state => state.selectedPrice);
  const handlePriceChange = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      dispatch(setSelectedPrice(e.target.value));
      dispatch(filterGames());
    }
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "25px",
        marginRight: "25px",
        marginTop: "20px",
      }}
    >
      <FormControl size="small" sx={{ width: "200px" }}>
      <InputLabel id="platforms" sx={{color: '#fff'}} >Platforms</InputLabel>
      <Select
        labelId="platforms"
        value={selectedPlatform}
        label="Platforms"
        onChange={handlePlatformSelectChange}
        sx={{ '& .MuiSelect-select': { color: selectedPlatform ? '#fff' : '#000' } }}
      >
        <MenuItem value="" sx={{ color: selectedPlatform === '' ? '#5c74ff' : '#000' }}>All</MenuItem>
        {allPlatformsArray.map((platformName, index) => (
          <MenuItem key={index} value={platformName} sx={{ color: selectedPlatform === platformName ? '#5c74ff' : '#000' }}>
            {platformName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      <FormControl size="small" sx={{ width: "200px" }}>
        <InputLabel  id="genres" sx={{color: '#fff'}} >Genres</InputLabel>
        <Select
          labelId="genres"
          value={selectedGenre}
          label="Genres"
          onChange={handleGenreSelectChange}
          sx={{ '& .MuiSelect-select': { color: selectedGenre ? '#fff' : '#000' } }}
        >
          <MenuItem value="" sx={{ color: selectedGenre === '' ? '#5c74ff' : '#000' }}>All</MenuItem>
          {allGenresArray.map((genresName, index) => (
            <MenuItem key={index} value={genresName} sx={{ color: selectedGenre === genresName ? '#5c74ff' : '#000'}}>
              {genresName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField  
       InputLabelProps={{
        style: { color: '#fff' },
      }}
        color="success"
        size="small"
        labelId="price"
        label="Price"
        type="number"
        sx={{ '& .MuiInputBase-input': { color: 'white' }}}
        value={selectedPrice}
        onChange={handlePriceChange}
      />
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => dispatch(sortGamesAsc())}
      >
        Sort Ascending
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => dispatch(sortGamesDesc())}
      >
        Sort Descending
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => {
          dispatch(resetFilters());
          setInputValue("");
        }}
      >
        Reset Filter
      </Button>
    </Stack>
  );
}

export default Sider;
