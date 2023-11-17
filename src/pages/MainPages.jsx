import Header from "components/Header/Header";
import Main from "components/Main/Main";

function MainPages({ selectMember, setSelectMember, letters, setLetters }) {
  return (
    <>
      <Header setSelectMember={setSelectMember} selectMember={selectMember} />
      <Main
        setSelectMember={setSelectMember}
        selectMember={selectMember}
        letters={letters}
        setLetters={setLetters}
      />
    </>
  );
}

export default MainPages;
