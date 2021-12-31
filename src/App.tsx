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
  const [yearText, setYearText] = useState(now.getFullYear().toString());
  const [monthText, setMonthText] = useState((now.getMonth() + 1).toString());
  const [dayText, setDayText] = useState(now.getDate().toString());
  const [timeText, setTimeText] = useState(now.getTime().toString());
  const [taskText, setTaskText] = useState('タスクを入力してください');

  const onChangeYear = (event: any) => {
    setYearText(event.target.value);
  }

  const onChangeMonth = (event: any) => {
    setYearText(event.target.value);
  }

  const onChangeDay = (event: any) => {
    setYearText(event.target.value);
  }

  const onChangeTime = (event: any) => {
    setYearText(event.target.value);
  }

  const onChangeTask = (event: any) => {
    setYearText(event.target.value);
  }

  const math: TaskData = {
    id: 99,
    limit: Timestamp.fromDate(new Date()),
    task: "数学",
  }

  const onClickAdd = async () => {
    try {
      await updateDoc(doc(db, "tasks", "フクダ"), {
        taskData: arrayUnion(math)
      })
      const docRef = await addDoc(collection(db, "users"), {
        name: taskText
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input className="date_box" type="text" value={yearText} onChange={onChangeYear}/>
        <label>年</label>
        <input className="date_box" type="text" value={monthText} onChange={onChangeMonth}/>
        <label>月</label>
        <input className="date_box" type="text" value={dayText} onChange={onChangeDay}/>
        <label>日</label>
        <input className="date_box" type="text" value={timeText} onChange={onChangeTime}/>
        <label>年</label>
        <br></br>
        <label>タスク:</label>
        <input type="text" value={taskText} onChange={onChangeTask}/>
        <button onClick={onClickAdd}>追加</button>
      </header>
    </div>
  );
}

export default App;
