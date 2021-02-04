import React from "react";

// Components
import MainNav from "../../components/navbars/MainNav";
import Footer from "../../components/Footer";

const MainLayout = (props) => {
  return (
    <>
      <MainNav {...props} />
      {props.children}
      <Footer />
    </>
  );
};

export default MainLayout;
