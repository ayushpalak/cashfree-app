/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
// material-ui core items
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { FETCH_USERS } from "../config/Urls";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function ContactCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { name, address, email, company, phone, username, website } = props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        title={`${name} (@${username})`}
        subheader={`${email}`}
      />
      <CardContent>
        <h5> Company Address </h5>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>{company.name}</p>
          <p>{company.bs}</p>
          <p>{company.catchPhrase}</p>
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ cursor: "pointer" }}
        onClick={handleExpandClick}
      >
        <Typography onClick={handleExpandClick} paragraph>
          Personal Address
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{address.city},</Typography>
          <Typography paragraph>{address.street},</Typography>
          <Typography paragraph>{address.suite},</Typography>
          <Typography paragraph>{address.zipcode}</Typography>
          <Typography paragraph>
            {address.geo.lat}
            {address.geo.lng}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        <p>
          Website: <a href={website}>{website}</a>
        </p>
        <p>phone: {phone}</p>
      </CardActions>
    </Card>
  );
}

const UserView = () => {
  let history = useHistory();
  const id = String(history.location.pathname).replace("/user/", "");
  const [userData, setUserData] = useState("");
  const fetchUserData = () => {
    Axios.get(`${FETCH_USERS}/${id}`)
      .then(res => {
        setUserData({ ...res.data });
      })
      .catch(err => {
        alert("failed to load data", err);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  if (!userData) return null;
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={8}>
        <ContactCard {...userData}></ContactCard>
      </Grid>
    </Grid>
  );
};
export default UserView;
