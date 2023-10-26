import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <p>Auth Layout</p>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
