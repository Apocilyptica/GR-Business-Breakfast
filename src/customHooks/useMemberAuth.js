import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsMember } from "../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useMemberAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsMember(currentUser)) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};
export default useMemberAuth;
