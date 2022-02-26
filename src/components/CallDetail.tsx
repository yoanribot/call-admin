import React, { useEffect, useContext, useState } from "react";
import { Context as CallContext } from "context/calls";
import { useParams } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CommentIcon from "@material-ui/icons/Comment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NoteDialog from "./NoteDialog";
import ArchiveIcon from "@material-ui/icons/Archive";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  content: {
    minHeight: 400,
    position: "relative",
  },
  arrow: {
    display: "inline-block",
    verticalAlign: "top",
    margin: "0 10px",
  },
  header: {
    color: "white",
    backgroundColor: "#3f51b5",
    padding: 10,
    marginBottom: 10,
  },
  title: {
    margin: "20px 0",
  },
  actionBtn: {
    marginLeft: 10,
  },
  actions: {
    display: "flex",
    justifyContent: "end",
  },
  field: {
    textAlign: "left",
  },
  fieldText: {
    fontSize: "18px",
    fontWeight: "bold",
    fontStyle: "italic",
    textDecoration: "underline",
    marginRight: "10px",
  },
  fieldValue: {},
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

const CallDetail = () => {
  const classes = useStyles();

  const [isVisibleNoteForm, setIsVisibleNoteForm] = useState(false);
  const { currentCall, getCall, addNote, archive } = useContext(CallContext);
  const { id } = useParams();

  useEffect(() => {
    getCall(id!);
  }, [id]);

  const showNoteForm = () => setIsVisibleNoteForm(true);
  const hideNoteForm = () => setIsVisibleNoteForm(false);

  const onCreateNote = (note: string) => addNote(currentCall?.id!, note);
  const onArchive = () => archive([currentCall?.id!]);

  return (
    <>
      <NoteDialog
        isOpen={isVisibleNoteForm}
        onCreateNote={onCreateNote}
        onClose={hideNoteForm}
      />
      <section>
        <Card>
          <Typography variant={"h4"} className={classes.header} align="center">
            Call Details
          </Typography>
          <CardContent className={classes.content}>
            {!currentCall && <CircularProgress className={classes.loader} />}
            {currentCall && (
              <>
                <div className={classes.actions}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ArchiveIcon />}
                    onClick={onArchive}
                  >
                    {currentCall.is_archived ? "Unarchive" : "Archive"}
                  </Button>
                  <Button
                    className={classes.actionBtn}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<CommentIcon />}
                    onClick={showNoteForm}
                  >
                    Add Note
                  </Button>
                </div>
                <div className={classes.title}>
                  <Typography variant="h6" align="center" color="primary">
                    From: {currentCall?.from}
                    <ArrowForwardIcon className={classes.arrow} /> To:
                    {currentCall?.to}
                  </Typography>
                </div>
                <section>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <p className={classes.field}>
                        <span className={classes.fieldText}>Date:</span>{" "}
                        <span className={classes.fieldValue}>
                          {new Date(currentCall.created_at).toDateString()}
                        </span>
                      </p>
                      <p className={classes.field}>
                        <span className={classes.fieldText}>Type:</span>{" "}
                        <span className={classes.fieldValue}>
                          {currentCall.call_type}
                        </span>
                      </p>
                      <p className={classes.field}>
                        <span className={classes.fieldText}>Duration:</span>{" "}
                        <span className={classes.fieldValue}>
                          {Math.floor(currentCall.duration / 1000)} secs
                        </span>
                      </p>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <p className={classes.field}>
                        <span className={classes.fieldText}>Via:</span>{" "}
                        <span className={classes.fieldValue}>
                          {currentCall.via}
                        </span>
                      </p>
                      <p className={classes.field}>
                        <span className={classes.fieldText}>Direction:</span>{" "}
                        <span className={classes.fieldValue}>
                          {currentCall.direction}
                        </span>
                      </p>
                      <p className={classes.field}>
                        <span className={classes.fieldText}>Is Archived:</span>{" "}
                        <span className={classes.fieldValue}>
                          {currentCall.is_archived ? "YES" : "NO"}
                        </span>
                      </p>
                    </Grid>
                  </Grid>
                </section>
                <section>
                  <Typography
                    color="primary"
                    align="center"
                    variant="h6"
                    className={classes.title}
                  >
                    Notes:
                  </Typography>
                  <List component="nav">
                    {currentCall?.notes.map((note) => (
                      <ListItem key={note.id}>
                        <ListItemIcon>
                          <CommentIcon />
                        </ListItemIcon>
                        <ListItemText primary={note.content} />
                      </ListItem>
                    ))}
                  </List>
                </section>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default CallDetail;
