import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { routers } from './routes/index';
import React from 'react';
import DefaultLayout from './pages/Layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getUserFromLs } from 'helpers/localStorage';
import MPath from 'routes/routes';
function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const auth = isAuthenticated || Object.entries(getUserFromLs()).length > 0;

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer closeOnClick pauseOnHover={false} autoClose={3000} />
        <Routes>
          {routers.map((route: any, i: number) => {
            return route.public ? (
              <Route key={route.name} path={route.path} element={route.element} />
            ) : (
              <Route
                key={route.name}
                path={route.path}
                element={
                  auth ? (
                    <DefaultLayout>{route.element}</DefaultLayout>
                  ) : (
                    <>
                      <Navigate to={MPath.LOGIN} replace />
                    </>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
