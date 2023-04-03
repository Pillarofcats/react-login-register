import React, {useContext} from "react";
import { StoreContext } from "./StoreContextProvider";

function DiaryEntry({entry, index}) {

  const {setUserDiary} = useContext(StoreContext)

  function deleteEntry() {
    setUserDiary(diary => {
      return [...diary.filter((_, ind) => ind !== index).reverse()]
    })
  }

  return (
    <div className='diary-entry' data-deid={index}>
      <button className="delete-diary-entry btn btn-danger" onClick={deleteEntry}>X</button>
      <h5>{`${entry.title} - ${entry.date}`}</h5>
      <blockquote>{entry.text}</blockquote>
    </div>
  )
}

export default DiaryEntry