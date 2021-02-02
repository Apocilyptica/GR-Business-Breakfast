import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// Material-ui
import Paper from "@material-ui/core/Paper";
import withWidth from "@material-ui/core/withWidth";
import Hidden from "@material-ui/core/Hidden";

// Font Awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// Assets
import ImageA from "../../assets/sponsor thumbnail/COONEN_LAW_BLACKbackground_2015-1-ohndiyzerl7eaozxztx8hnpzokqxbry5gi0j97hreo.jpg";
import ImageB from "../../assets/sponsor thumbnail/Dominion-oy4lrx2cnclidrv8an6wpd0oa4g10hozqoeoln2xa8.jpg";
import ImageC from "../../assets/sponsor thumbnail/Elite-One-Media-100-ohndfnlwnmnzc7tccwbm6zug8n3b67s8o35vb2ercw.jpg";
import ImageD from "../../assets/sponsor thumbnail/English-Hills2-ohnd6ylnfsrhy2g04n0umotyfby2z09mh1x6hxauww.jpg";
import ImageE from "../../assets/sponsor thumbnail/ForwardExposure-ohndmitgl22e5nu99d6hwrgogz8uem1na2qkiu87wg.jpg";
import ImageF from "../../assets/sponsor thumbnail/ipv-logo_compressed-ohndft8xsmvp9vl5fyrdlyf7sybigeemov2s6q6ebk.jpg";
import ImageG from "../../assets/sponsor thumbnail/Logo-Final-Web-e1576684208582-oicvljuqviygy76qtmjgeykidgnaufgj5ojrfd2hvk.png";
import ImageH from "../../assets/sponsor thumbnail/Michael-T.-Jager-LLC-100-ohndmf23tpx8v7zpvbjzmseu3frdjtmpxk4mlqdslc.jpg";
import ImageI from "../../assets/sponsor thumbnail/Omni-100-ohndmd6fg1uo802g6aqqhsvwwo0n4ff99atnn6gkxs.jpg";
import ImageJ from "../../assets/sponsor thumbnail/River-City-Cup-Cake-100-ohndmacwvjqt966jmriusblj4iejhc428wv77ckrgg.jpg";
import ImageK from "../../assets/sponsor thumbnail/Zhen-Productions-100-ohndflq89yleozw2nvid20bj1vckqtkrztuwcihjpc.jpg";

// Styles
import "../../styles/slick-carousel/sponsor-carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
  imageLarge: {
    height: 125,
    width: "auto",
    padding: theme.spacing(0, 3, 0, 3),
  },
  imageSmall: {
    height: 75,
    width: "auto",
    padding: theme.spacing(0, 3, 0, 3),
  },
}));

const arrowStyles = {
  filter: "drop-shadow(0px 0px 5px rgba(105, 2, 11, 1))",
  color: "#656464",
};

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon style={arrowStyles} icon={faChevronRight} size="3x" className="slick-arrow-icon-right" />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon style={arrowStyles} icon={faChevronLeft} size="3x" className="slick-arrow-icon-left" />
    </div>
  );
}
const SponsorCarousel = () => {
  const classes = useStyles();

  var settings = {
    className: "center",
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: true,
  };

  const images = [ImageA, ImageB, ImageC, ImageD, ImageE, ImageF, ImageG, ImageH, ImageI, ImageJ, ImageK];
  return (
    <Paper className={classes.root} elevation={0}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Hidden only={["xs", "sm", "md"]}>
              <img className={classes.imageLarge} src={image} alt="sponsor" />
            </Hidden>
            <Hidden only={["lg", "xl"]}>
              <img className={classes.imageSmall} src={image} alt="sponsor" />
            </Hidden>
          </div>
        ))}
      </Slider>
    </Paper>
  );
};

SponsorCarousel.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(SponsorCarousel);
