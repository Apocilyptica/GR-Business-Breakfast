import React from "react";

// Material-ui
import Carousel from "react-material-ui-carousel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 750,
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100vw",
  },
  gridContainer: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    padding: theme.spacing(10),
  },
  title: {
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  subTitle: {
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  button: {
    color: (props) => props.item.buttonStyle.color,
    backgroundColor: (props) => props.item.buttonStyle.backgroundColor,
    transition: "1s ease",
    margin: theme.spacing(5),
    padding: theme.spacing(2),
    "&:hover": {
      color: (props) => props.item.buttonStyle.hoverColor,
      backgroundColor: (props) => props.item.buttonStyle.hoverBackgroundColor,
    },
  },
  buttonTitle: {
    fontWeight: 600,
  },
}));

const Item = (props) => {
  const classes = useStyles(props);

  return (
    <Paper className={classes.root}>
      <img className={classes.image} src={props.item.imgSrc} alt={props.item.title} />
      <Grid className={classes.gridContainer} xs={12} container direction="column">
        <Grid item>
          <Typography className={classes.title} variant="h2">
            {props.item.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.subTitle}>{props.item.subTitle}</Typography>
        </Grid>
        <Grid item>
          <Button className={classes.button}>
            <Typography className={classes.buttonTitle} variant="h5">
              {props.item.buttonName}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Slider = (props) => {
  return (
    <Carousel>
      {props.data.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default Slider;
