import { useMemberAuth } from "../customHooks";

const WithMemberAuth = (props) => useMemberAuth(props) && props.children;

export default WithMemberAuth;
