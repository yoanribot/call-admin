import React, { useEffect, useContext, useState } from "react";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Pagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  callIconWrapper: {
    display: "flex",
    alignItems: "center",
    "& .MuiAvatar-colorDefault": {
      backgroundColor: theme.palette.primary.main,
    },
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
  listItem: {
    display: "flex",
    justifyContent: "center",
  },
  callElem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#cecece",
    },
    display: "flex",
    textDecoration: "none",
    padding: "1px 20px",
    borderRadius: "10px",
    color: "black",
  },
}));

const CallList = () => {
  const classes = useStyles();

  const { calls, pagination, getCalls, updatePagination } =
    useContext(CallContext);
  const { isAuth } = useContext(UserConext);
  const [checked, setChecked] = useState<string[]>([]);

  console.log(pagination);

  useEffect(() => {
    if (isAuth) {
      getCalls();
    }
  }, [isAuth]);

  const onSelect = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <section>
      <Typography variant={"h4"} color={"primary"}>
        Call List
      </Typography>
      <div className={classes.listWrapper}>
        <List className={classes.root}>
          {calls?.map((call) => (
            <ListItem key={call.id} className={classes.listItem}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(call.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <Link to={`/call/${call.id}`} className={classes.callElem}>
                <ListItemAvatar className={classes.callIconWrapper}>
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
              </Link>
            </ListItem>
          ))}
        </List>
        <Pagination
          isVisible={calls?.length > 0}
          limit={pagination.pageLimit}
          total={pagination.totalCount}
          onChangePage={updatePagination}
        />
      </div>
    </section>
  );
};

export default CallList;
