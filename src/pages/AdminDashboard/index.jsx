import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUseresData } from "../../redux/Admin/admin.actions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUseresData());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
