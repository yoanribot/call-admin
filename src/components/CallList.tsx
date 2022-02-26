import React, { useEffect, useContext, useState } from "react";
import { Context as CallContext } from "context/calls";
import { Context as UserConext } from "context/user";
import { Link } from "react-router-dom";
import { groupByDate, applyFilters } from "utils/helper";
import { Groups, Call, ICallFilter } from "types";

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
import Card from "@material-ui/core/Card";
import FilterListIcon from "@material-ui/icons/FilterList";
import FiltersForm from "./FiltersForm";

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
    borderRadius: "10px",
    marginBottom: 15,
    border: "2px solid #3f51b5",
  },
  callsGroupTitle: {
    backgroundColor: "#3f51b5",
    color: "white",
    marginBottom: 15,
    padding: "10px",
  },
  callsGroupBody: {
    padding: "10px",
  },
  archivedBtn: {
    marginRight: 10,
  },
}));

const CallList = () => {
  const classes = useStyles();

  const { calls, pagination, getCalls, updatePagination, archive } =
    useContext(CallContext);
  const { isAuth } = useContext(UserConext);
  const [checked, setChecked] = useState<string[]>([]);
  const [isVisibleFiltersForm, setIsVisibleFiltersForm] = useState(false);
  const [filters, setFilters] = useState<ICallFilter>({ callType: "" });
  const [filteredCalls, setFilteredCalls] = useState<Call[]>(calls);
  const [isGroupByDate, setIsGroupByDate] = useState(false);
  const [callsGroups, setCallsGroups] = useState<Groups<Call>>({});

  useEffect(() => {
    if (isAuth) {
      getCalls();
    }
  }, [isAuth]);

  useEffect(() => {
    setFilteredCalls(applyFilters(calls, filters));
  }, [calls, filters]);

  useEffect(() => {
    if (isGroupByDate) {
      const groups = groupByDate(filteredCalls);

      setCallsGroups(groups);
    } else {
      setCallsGroups({ All: filteredCalls });
    }
  }, [filteredCalls, isGroupByDate]);

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

  const showFilters = () => setIsVisibleFiltersForm(true);
  const hideFilters = () => setIsVisibleFiltersForm(false);
  const onFilter = (filterData: ICallFilter) => {
    console.log("onFilter", filterData);
    setFilters({ ...filters, ...filterData });
  };

  console.log("calls", calls);
  console.log("filteredCalls", filteredCalls);

  return (
    <section>
      <FiltersForm
        isOpen={isVisibleFiltersForm}
        filters={filters}
        onClose={hideFilters}
        onSubmit={onFilter}
      />
      <Typography variant={"h4"} color={"primary"} align="center">
        Call List
      </Typography>
      <div className={classes.listWrapper}>
        <div className={classes.selection}>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.archivedBtn}
              startIcon={<SaveIcon />}
              disabled={!checked.length}
              onClick={onArchive}
            >
              Archive [{checked.length}]
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.archivedBtn}
              startIcon={<FilterListIcon />}
              onClick={showFilters}
            >
              Filter
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<GroupWorkIcon />}
              onClick={onGroupByDate}
            >
              {isGroupByDate ? "View All" : "Group By Date"}
            </Button>
          </div>
        </div>

        {Object.keys(callsGroups).map((groupKey) => (
          <Card key={`group-${groupKey}`} className={classes.callsGroup}>
            <div className={classes.callsGroupTitle}>
              <Typography variant="h5" align="center">
                {groupKey}
              </Typography>
            </div>
            <div className={classes.callsGroupBody}>
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
          </Card>
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
