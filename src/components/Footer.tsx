import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <footer className="footer">
      <AppBar position="static">
        <Typography variant={"h6"} align="center">
          © Yoan - Aircall test 2022
        </Typography>
      </AppBar>
    </footer>
  );
};

export default Footer;
