import React from "react";

// Components
import MainNav from "../../components/navbars/MainNav";

const UserProfileLayout = (props) => {
  return (
    <>
      <MainNav {...props} />
      {props.children}
    </>
  );
};

export default UserProfileLayout;
