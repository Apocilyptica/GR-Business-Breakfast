import { useSponsorAuth } from "../customHooks";

const WithSponsorAuth = (props) => useSponsorAuth(props) && props.children;

export default WithSponsorAuth;
