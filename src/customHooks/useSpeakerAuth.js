import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsSpeaker } from "../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useSpeakerAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsSpeaker(currentUser)) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};
export default useSpeakerAuth;
