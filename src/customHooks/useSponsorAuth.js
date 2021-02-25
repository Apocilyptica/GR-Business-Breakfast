import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsSponsor } from "../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useSponsorAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsSponsor(currentUser)) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};
export default useSponsorAuth;
