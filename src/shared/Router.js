import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPages from "pages/DetailPages";
import MainPages from "pages/MainPages";
import store from "redux/config/configStore";
import LoginPages from "pages/LoginPages";
import MyPages from "pages/MyPages";
import Layout from "./components/header/Layout";

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route element={<Layout />}>
            <Route path="/mainPages" element={<MainPages />} />

            <Route path="/myPages" element={<MyPages />} />
          </Route>
          <Route path="/detailPages/:id" element={<DetailPages />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
