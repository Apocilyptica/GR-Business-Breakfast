import { useSpeakerAuth } from "../customHooks";

const WithSpeakerAuth = (props) => useSpeakerAuth(props) && props.children;

export default WithSpeakerAuth;
