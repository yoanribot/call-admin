import React, { useEffect, useContext, useState } from "react";
import { Context as CallContext } from "context/calls";
import { Context as UserConext } from "context/user";
import { Link } from "react-router-dom";
import { groupByDate } from "utils/helper";
import { CallGroups, Call } from "types";

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
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

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
  selection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  callsGroup: {
    backgroundColor: "#f8f8f8",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: 15,
  },
  archivedBtn: {},
}));

const CallList = () => {
  const classes = useStyles();

  const { calls, pagination, getCalls, updatePagination, archive } =
    useContext(CallContext);
  const { isAuth } = useContext(UserConext);
  const [checked, setChecked] = useState<string[]>([]);
  const [isGroupByDate, setIsGroupByDate] = useState(false);
  const [callsGroups, setCallsGroups] = useState<CallGroups<Call>>({});

  useEffect(() => {
    if (isAuth) {
      getCalls();
    }
  }, [isAuth]);

  useEffect(() => {
    if (isGroupByDate) {
      const groups = groupByDate(calls);

      setCallsGroups(groups);
    } else {
      setCallsGroups({ All: calls });
    }
  }, [calls, isGroupByDate]);

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

  const onArchive = () => {
    archive(checked);
    setChecked([]);
  };

  const onGroupByDate = () => {
    setIsGroupByDate(!isGroupByDate);
  };

  return (
    <section>
      <Typography variant={"h4"} color={"primary"}>
        Call List
      </Typography>
      <div className={classes.listWrapper}>
        <div className={classes.selection}>
          <div>
            <span>Selected: {checked.length}</span>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.archivedBtn}
              startIcon={<SaveIcon />}
              disabled={!checked.length}
              onClick={onArchive}
            >
              Archive
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.archivedBtn}
              startIcon={<GroupWorkIcon />}
              onClick={onGroupByDate}
            >
              Group By Date
            </Button>
          </div>
        </div>

        {Object.keys(callsGroups).map((groupKey) => (
          <div key={`group-${groupKey}`} className={classes.callsGroup}>
            <h3>{groupKey}</h3>
            <List className={classes.root}>
              {callsGroups[groupKey]?.map((call) => (
                <ListItem key={call.id} className={classes.listItem}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(call.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      onClick={onSelect(call.id)}
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
                    {call.is_archived && (
                      <SaveAltIcon style={{ marginLeft: 15 }} />
                    )}
                  </Link>
                </ListItem>
              ))}
            </List>
          </div>
        ))}

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
