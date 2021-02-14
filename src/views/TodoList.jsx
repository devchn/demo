import React, {useState,useEffect, useCallback} from 'react'
import './style.css'
import axios from 'axios'
import FormControl from "./FormControl";
import List from "./List";
import Total from "./Total";

function Demo () {
  const [rate, setRate] = useState({});
  //  展示数据
  const [list, setList] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(()=>{
    axios.post('https://api.globus.furniture/rate').then(data => {
      setRate(data.data)
    }).catch(error=>{
      console.error(error)
    })
  },[]);
  useEffect(()=>{
    setTodoList(list.filter(item=>{
      return item.done === false
    }));
    setDoneList(list.filter(item=>{
      return item.done === true
    }));
  }, [list]);
  const toggleTodoList = (id) => {
    // 修改list
    setList(list.map((item,_i) => {
      if (id === item.id) {
        item.done = !item.done
      }
      return item
    }));
    // 获取最新todoList
    setTodoList(list.filter(item=>{
      return item.done === false
    }));
    // 获取最新doneList
    setDoneList(list.filter(item=>{
      return item.done === true
    }));
  };
  const onSaveTodoList = (data) => {
    setList(list.concat(data));
  };

  return (
    <div className="todoWrap">
      <FormControl rate={rate} onSaveTodoList={onSaveTodoList}/>
      <div>
        <p>计划：</p>
        <List toggleTodoList={toggleTodoList} list={todoList}/>
        <div className="summaryWrap">
          <p className="summaryTitle">&nbsp;&nbsp;将要花费：</p>
          <Total list={todoList}/>
        </div>
      </div>
      <div>
        <p>已完成：</p>
        <List toggleTodoList={toggleTodoList} list={doneList}/>
        <div className="summaryWrap">
          <p className="summaryTitle">&nbsp;&nbsp;一共花了：</p>
          <Total list={doneList}/>
        </div>
      </div>
    </div>
  )
}

export default Demo
