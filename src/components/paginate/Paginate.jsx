import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Stack, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Paginate({ prevChange, nextChange, pages, pageTotal }) {
  return (
    <Stack spacing={2} marginBottom={2} display="flex" flexDirection="row">
      <IconButton
        variant="text"
        sx={{ color: "#f1f1f1", padding: "0px" }}
        onClick={prevChange}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography sx={{ color: "#fff" }} variant="inherit">
        Page {pages} of {pageTotal}
      </Typography>
      <IconButton
        variant="text"
        sx={{ color: "#f1f1f1", padding: "0px" }}
        onClick={nextChange}
      >
        <KeyboardArrowRightIcon sx={{ marginBottom: "14px" }} />
      </IconButton>
    </Stack>
  );
}

Paginate.propTypes = {
  prevChange: PropTypes.func.isRequired,
  nextChange: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  pageTotal: PropTypes.number.isRequired,
};

export default Paginate;
