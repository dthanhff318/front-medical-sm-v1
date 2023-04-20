import "./App.css";
import { History } from "history";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { routers } from "./routes/index";
import React from "react";
import Notfound from "./pages/Notfound";
import HomePage from "./pages/AdmHome";
import DefaultLayout from "./pages/Layout/DefaultLayout";

function App() {
  const auth = true;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {routers.map((route: any, i: number) => {
            return route.public ? (
              <Route
                key={route.name}
                path={route.path}
                element={route.element}
              />
            ) : (
              <Route
                path={route.path}
                element={
                  auth ? (
                    <DefaultLayout>{route.element}</DefaultLayout>
                  ) : (
                    <HomePage />
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
