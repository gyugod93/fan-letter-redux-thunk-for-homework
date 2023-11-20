import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPages from "pages/DetailPages";
import MainPages from "pages/MainPages";
import store from "redux/config/configStore";

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/detailPages/:id" element={<DetailPages />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
