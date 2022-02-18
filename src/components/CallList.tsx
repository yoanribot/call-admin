import React, { useEffect, useContext } from "react";
import { Context as CallContext } from "context/calls";
import { Context as UserConext } from "context/user";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CallIcon from "@material-ui/icons/Call";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  listWrapper: {
    maxWidth: "800px",
    margin: "auto",
  },
  arrow: {
    display: "inline-block",
    verticalAlign: "top",
    margin: "0 10px",
  },
  callElem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#cecece",
    },
  },
}));

const CallList = () => {
  const classes = useStyles();

  const { calls, getCalls } = useContext(CallContext);
  const { isAuth } = useContext(UserConext);

  useEffect(() => {
    if (isAuth) {
      getCalls();
    }
  }, [isAuth]);

  return (
    <section>
      <h2>Call List</h2>
      <div className={classes.listWrapper}>
        <List className={classes.root}>
          {calls?.map((call) => (
            <Link to={`/call/${call.id}`} style={{ textDecoration: "none" }}>
              <ListItem className={classes.callElem}>
                <ListItemAvatar>
                  <Avatar>
                    <CallIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      From: {call.from}
                      <ArrowForwardIcon className={classes.arrow} /> To:
                      {call.to}
                    </>
                  }
                  secondary={new Date(call.created_at).toDateString()}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </section>
  );
};

export default CallList;
