import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../calls/users";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: (
        <span
          onClick={() => {
            navigate("/"); // Navigate to home when "Home" is clicked
          }}
        >
          Home
        </span>
      ),
      icon: <HomeOutlined />,
    },

    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },

        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response.data));
      dispatch(hideLoading());
      // Hide Loader
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
      navigate('/login')
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getValidUser();
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // User not logged in, redirect to login
      navigate('/login');
    } else {
      // Fetch the current user if token exists
      getValidUser();
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await GetCurrentUser();
          dispatch(setUser(response.data));
        } catch (error) {
          console.log(error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    fetchUser(); // Fetch the user when the component mounts
  }, [dispatch, navigate]);
  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} selectedKeys={[location.pathname]} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
