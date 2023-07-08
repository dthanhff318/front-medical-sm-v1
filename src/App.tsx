import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { routers } from './routes/index';
import React, { useEffect } from 'react';
import DefaultLayout from './pages/Layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getUserFromLs } from 'helpers/localStorage';
import MPath from 'routes/routes';
import { getRefreshTokenFromLocalStorage } from './helpers/localStorage';
import { saveUser } from 'store/slices/authSlice';
import Notfound from './pages/Notfound';
import { io } from 'socket.io-client';
import SocketContext from 'context/socketContext';
import { ERole } from 'enums';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userLs = getUserFromLs();
  const refreshToken = getRefreshTokenFromLocalStorage();
  const auth = isAuthenticated || Object.entries(userLs).length > 0;
  const socketInstance = io('http://192.168.2.14:4000');

  useEffect(() => {
    if (userLs.id && refreshToken) {
      dispatch(saveUser(userLs));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer closeOnClick pauseOnHover={false} autoClose={3000} />
        <SocketContext.Provider value={{ socket: socketInstance }}>
          <Routes>
            {routers.map((route: any, i: number) => {
              return route.public ? (
                <Route key={route.name} path={route.path} element={route.element} />
              ) : (
                <Route
                  key={route.name}
                  path={route.path}
                  element={
                    auth && route.role?.includes(userLs.role) ? (
                      <DefaultLayout>{route.element}</DefaultLayout>
                    ) : (
                      <Navigate to={MPath.LOGIN} replace />
                    )
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <>
                  <Navigate to={'/notfound'} replace />
                </>
              }
            />
          </Routes>
        </SocketContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
