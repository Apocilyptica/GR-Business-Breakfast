import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsPlatinum } from "../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const usePlatinumAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsPlatinum(currentUser)) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};
export default usePlatinumAuth;
