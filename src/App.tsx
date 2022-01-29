import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, Timestamp, updateDoc, Firestore, FieldValue, arrayUnion, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { timeStamp } from 'console';
import { firebaseConfig } from './fireconfig';

interface TaskData {
  id: number,
  limit: Timestamp,
  task: string,
}

interface Task {
    doneTaskData: TaskData[],
    pastTime: Timestamp,
    taskData: TaskData[],
}

const app = initializeApp(firebaseConfig);

var db = getFirestore();

function App() {
  let now = new Date();

  const [nameText, setNameText] = useState('bb');
  var [yearText, setYearText] = useState(now.getFullYear().toString());
  const [monthText, setMonthText] = useState((now.getMonth() + 1).toString());
  const [dayText, setDayText] = useState(now.getDate().toString());
  const [hourText, setHourText] = useState(now.getHours().toString());
  const [minuteText, setMinuteText] = useState(now.getMinutes().toString());
  const [taskText, setTaskText] = useState('タスクを入力してください');

  const onChangeYear = (event: any) => {
    setYearText(event.target.value);
  }

  const onChangeMonth = (event: any) => {
    setMonthText(event.target.value);
  }

  const onChangeDay = (event: any) => {
    setDayText(event.target.value);
  }

  const onChangeHour = (event: any) => {
    setHourText(event.target.value);
  }

  const onChangeMinute = (event: any) => {
    setMinuteText(event.target.value);
  }

  const onChangeTask = (event: any) => {
    setTaskText(event.target.value);
  }
  const year: number = parseInt(yearText);

  const math: TaskData = {
    id: 99,
    limit: Timestamp.fromDate(new Date(parseInt(yearText), parseInt(monthText) - 1, parseInt(dayText), parseInt(hourText), parseInt(minuteText))),
    task: taskText,
  }

  const onClickAdd = async () => {
    try {
      await updateDoc(doc(db, "tasks", "フクダ"), {
        taskData: arrayUnion(math)
      })
      alert(`${taskText}を追加しました`)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const onDateAdd = (num: string, add_num: number) => {
    var end_num: number = 0;
    end_num = parseInt(num) + add_num;

    yearText = end_num.toString()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='text_boxes'>
          <div className='date_boxes'>
            <div className='date_set'>
              <input className="date_box" type="text" value={yearText} onChange={onChangeYear}/>
              <label>年</label>
            </div>
            <input className="date_box" type="text" value={monthText} onChange={onChangeMonth}/>
            <label>月</label>
            <input className="date_box" type="text" value={dayText} onChange={onChangeDay}/>
            <label>日</label>
            <input className="date_box" type="text" value={hourText} onChange={onChangeHour}/>
            <label>時</label>
            <input className="date_box" type="text" value={minuteText} onChange={onChangeMinute}/>
            <label>分</label>
          </div>
          <br></br>
          <label>タスク:</label>
          <input type="text" value={taskText} onChange={onChangeTask}/>
          <br></br>
          <button onClick={onClickAdd}>追加</button>
        </div>
      </header>
    </div>
  );
}

export default App;
