import React from "react";
import { useSelector } from "react-redux";

// Components
import UserRoles from "../../components/UserRoles";

const mapState = ({ admindata }) => ({
  users: admindata.users,
});

const UserRole = () => {
  const { users } = useSelector(mapState);

  return <UserRoles users={users} />;
};

export default UserRole;
