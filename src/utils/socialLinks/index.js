// Material-ui Icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const socialLinksData = [
  {
    name: "facebook",
    label: "facebook link",
    iconUI: <FacebookIcon />,
    iconFa: <FontAwesomeIcon icon={faFacebook} />,
    URL: "https://www.facebook.com/grbusinessbreakfast/?ref=br_rs",
    color: { color: "#3b5998" },
    backgroundColor: { backgroundColor: "#3b5998" },
  },
  {
    name: "twitter",
    label: "twitter link",
    iconUI: <TwitterIcon />,
    iconFa: <FontAwesomeIcon icon={faTwitter} />,
    URL: "https://www.facebook.com/grbusinessbreakfast/?ref=br_rs",
    color: { color: "#00acee" },
    backgroundColor: { backgroundColor: "#00acee" },
  },
  {
    name: "linkedin",
    label: "linkedin link",
    iconUI: <LinkedInIcon />,
    iconFa: <FontAwesomeIcon icon={faLinkedin} />,
    URL: "https://www.linkedin.com/company/grbusinessbreakfast/",
    color: { color: "#0e76a8" },
    backgroundColor: { backgroundColor: "#0e76a8" },
  },
];
