import React, {useContext} from "react";
import { StoreContext } from "./StoreContextProvider";
import updateDiaryEntry from "./functions/updateDiaryEntry.js";

function DiaryEntry({entry, index}) {

  const {user, diary} = useContext(StoreContext)

  function deleteEntry(ind) {

    console.log(user.id.id, ind)
    updateDiaryEntry(user.user.id, ind)
      .then((res) => {
        //If user response has .errMessage property set error message
        if(res?.errMessage) {
          setServerMessage(["text-danger", res?.errMessage])
          setIsMessage(true)
        }
        if(res) {
          console.log('server res', res)
          diary.setUserDiary(res.diary.entries)
        }
      })
      .catch((err) => console.log(err))

    // diary.setUserDiary(diary => {
    //   return [...diary.filter((_, ind) => ind !== index).reverse()]
    // })
  }

  return (
    <div className='diary-entry' data-deid={index}>
      <button className="delete-diary-entry btn btn-danger" onClick={() => deleteEntry(index)}>X</button>
      <h5>{`${entry.title} - ${entry.date}`}</h5>
      <blockquote>{entry.text}</blockquote>
    </div>
  )
}

export default DiaryEntry