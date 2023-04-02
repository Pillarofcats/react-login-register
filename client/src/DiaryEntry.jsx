import React from "react";

function DiaryEntry({entry}, ind) {

  function deleteEntry() {
    console.log(`deleting entry: ${ind}`)
  }

  return (
    <div className={`diary-entry-${ind}`}>
      <div className="diary-entry">
        <h2>{entry.title}</h2>
        <span>{entry.date}</span>
        <blockquote>{entry.text}</blockquote>
      </div>
      <button className="btn btn-primary" onClick={deleteEntry}>Delete</button>
    </div>
  )
}

export default DiaryEntry