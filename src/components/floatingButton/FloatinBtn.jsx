import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

const FloatingBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <Fab
        onClick={scrollToTop}
        color="primary"
        sx={{
          position: "fixed",
          bottom: "35px",
          right: "35px",
          zIndex: 99,
        }}
      >
        <NavigationIcon />
      </Fab>
    )
  );
};

export default FloatingBtn;
