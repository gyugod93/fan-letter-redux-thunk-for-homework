// import React, { useEffect } from "react";
// import fakeData from "fakeData.json";
import React from "react";
import Input from "./Input";
import Letter from "./Letter";

const Main = () => {
  return (
    <>
      <Input />
      <Letter />

      {/* <ul>
        {fakeData.map((item) => (
          <li key={item.id}>
            <div>{item.nickname}</div>
            <div>{item.createdAt}</div>
            <div>{removeText(item.content, 40)}</div>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Main;
