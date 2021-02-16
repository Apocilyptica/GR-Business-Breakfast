// Material-ui Icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const userSocialLinks = [
  {
    name: "facebook",
    label: "Facebook URL",
    labelWidth: 110,
    iconUI: <FacebookIcon />,
    iconFa: <FontAwesomeIcon icon={faFacebook} />,
    color: { color: "#3b5998" },
    backgroundColor: { backgroundColor: "#3b5998" },
  },
  {
    name: "twitter",
    label: "Twitter URL",
    labelWidth: 85,
    iconUI: <TwitterIcon />,
    iconFa: <FontAwesomeIcon icon={faTwitter} />,
    color: { color: "#00acee" },
    backgroundColor: { backgroundColor: "#00acee" },
  },
  {
    name: "linkedin",
    label: "Linkedin URL",
    labelWidth: 100,
    iconUI: <LinkedInIcon />,
    iconFa: <FontAwesomeIcon icon={faLinkedin} />,
    color: { color: "#0e76a8" },
    backgroundColor: { backgroundColor: "#0e76a8" },
  },
  {
    name: "instagram",
    label: "Instagram URL",
    labelWidth: 115,
    iconUI: <InstagramIcon id="instagram" />,
    iconFa: <FontAwesomeIcon icon={faInstagram} id="instagram" />,
    color: {
      color: "#fff",
    },
    backgroundColor: {
      backgroundColor: "#fff",
    },
  },
];
