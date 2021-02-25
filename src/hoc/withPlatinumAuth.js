import { usePlatinumAuth } from "../customHooks";

const WithPlatinumAuth = (props) => usePlatinumAuth(props) && props.children;

export default WithPlatinumAuth;
