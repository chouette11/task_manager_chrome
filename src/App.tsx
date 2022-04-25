import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, Timestamp, updateDoc, Firestore, FieldValue, arrayUnion, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { timeStamp } from 'console';
import { firebaseConfig, loginWithGoogle, logout } from './fireconfig';
import firebase from 'firebase/compat/app'
import admin from 'firebase-admin'
import 'firebase/compat/auth'

interface TaskData {
  id: string,
  limit: Timestamp,
  task: string,
  noLimit: boolean;
}

const app = firebase.initializeApp(firebaseConfig);

var db = getFirestore();

function App() {
  let now = new Date();

  var [yearText, setYearText] = useState(now.getFullYear().toString());
  const [monthText, setMonthText] = useState((now.getMonth() + 1).toString());
  const [dayText, setDayText] = useState(now.getDate().toString());
  const [hourText, setHourText] = useState(now.getHours().toString());
  const [minuteText, setMinuteText] = useState(now.getMinutes().toString());
  const [taskText, setTaskText] = useState('タスクを入力してください');
  const [check, setCheck] = useState(false);

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
  
  const [user, setUser] = React.useState<firebase.User>()
  // バックグラウンドにサインイン状態を問い合わせる
  // 一度サインイン後はポップアップを閉じてもバックグラウンドからサインイン状態を復帰できる
  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: 'signin-state' }, function (response) {
      if (response?.type === 'signin-state') {
        setUser(response.user)
      }
    })
  }, [])
  // サインイン状態をウォッチする
  // ポップアップ画面でサインインやサインアウトをした時、即座に画面に反映させるために使用
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(before => {
          if (before && before.uid === user.uid) {
            return before
          }
          return user
        })
      } else {
        setUser(undefined)
      }
    })
  }, [])

  const onClickAdd = async () => {
    try {
      var uid: string = "";
      if (user?.uid != undefined) {
        uid = user.uid;
      }
      await addDoc(collection(db, 'tasks'), {
        id: uid,
        limit: Timestamp.fromDate(new Date(parseInt(yearText), parseInt(monthText) - 1, parseInt(dayText), parseInt(hourText), parseInt(minuteText))),
        title: taskText,
        isLimit: check,
      })
      alert(`${taskText}を追加しました`)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
          <input type="checkbox" onChange={() => setCheck(!check)}/>
          <br></br>
          {user && (<p>{user.displayName}がサインインしています</p>)}
          <button onClick={onClickAdd}>追加</button>
          <button onClick={loginWithGoogle}>ログイン</button>
          <button onClick={logout}>ログアウト</button>
        </div>
      </header>
    </div>
  );
}

export default App;
