/**
@file Private component
@copyright Copyright (c) 2023, The Reactive Developer
@description The Private component is responsible for rendering the contents of a protected route in the application.
It makes use of the AuthContext to access the currentUser state, which holds information about the authenticated user.
If the user is not authenticated, the component redirects the user to the login page.
If the user is authenticated, the component renders the content of the protected route using the Outlet component from react-router-dom.
*/

import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Private = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default Private;
