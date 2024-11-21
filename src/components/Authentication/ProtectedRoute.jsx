import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import Cookie from '../Axios/Cookie';
import { logout } from '../Axios/AuthSlice';

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.user);
  const cookie = Cookie();
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    if (!isSessionChecked) {
      if (!userLogged || !cookie) {
        message.warning('Session Expired...');
        dispatch(logout());
      }
      setIsSessionChecked(true);
    }
  }, [dispatch, userLogged, cookie, isSessionChecked]);

  if (!userLogged || !cookie) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
