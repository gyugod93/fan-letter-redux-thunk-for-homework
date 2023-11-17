import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPages from "pages/DetailPages";
import MainPages from "pages/MainPages";
import { useState } from "react";

const Router = () => {
  const [selectMember, setSelectMember] = useState(0);
  const [letters, setLetters] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPages
              selectMember={selectMember}
              setSelectMember={setSelectMember}
              letters={letters}
              setLetters={setLetters}
            />
          }
        />
        <Route
          path="/detailPages/:id"
          element={<DetailPages letters={letters} setLetters={setLetters} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
