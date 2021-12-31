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

  const [yearText, setYearText] = useState(now.getFullYear.toString);
  const [monthText, setMonthText] = useState(now.getMonth.toString);
  const [dayText, setDayText] = useState(now.getDay.toString);
  const [timeText, setTimeText] = useState(now.getTime.toString);
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
        name: yearText.toString
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
      
      </header>
    </div>
  );
}

export default App;
