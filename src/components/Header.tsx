import React, { useState, useContext } from "react";
import { Context as UserConext } from "context/user";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CallIcon from "@material-ui/icons/Call";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    textDecoration: "none",
    color: "white",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuth, login, logout } = useContext(UserConext);

  const isMenuOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogin = () => login();
  const onLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar className="header" position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <CallIcon />
        </IconButton>
        <Link to={"/"} className={classes.title}>
          <Typography variant="h6">Aircall</Typography>
        </Link>
        <div>
          {isAuth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <span> {user?.username} </span>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isMenuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={onLogout}> Log out </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={onLogin}>
              {" "}
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
