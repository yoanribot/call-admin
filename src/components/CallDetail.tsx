import React, { useEffect, useContext } from "react";
import { Context as CallContext } from "context/calls";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "800px",
    margin: "auto",
  },
  arrow: {
    display: "inline-block",
    verticalAlign: "top",
    margin: "0 10px",
  },
}));

const CallDetail = () => {
  const classes = useStyles();

  const { currentCall, getCall } = useContext(CallContext);
  const { id } = useParams();

  console.log(currentCall);

  useEffect(() => {
    getCall(id!);
  }, []);

  return (
    <section>
      <h2>Call Details</h2>
      {currentCall && (
        <div className={classes.container}>
          <h3>
            From: {currentCall?.from}
            <ArrowForwardIcon className={classes.arrow} /> To:
            {currentCall?.to}
          </h3>
        </div>
      )}
    </section>
  );
};

export default CallDetail;
