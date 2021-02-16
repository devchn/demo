import React, {useState,useEffect, useCallback} from 'react'
import './style.css'
import axios from 'axios'
import FormControl from "../components/FormControl";
import List from "../components/List";
import Total from "../components/Total";

function TodoList () {
  const [forex, setForex] = useState({});
  //  展示数据
  const [list, setList] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(()=>{
    axios.get('https://api.globus.furniture/forex').then(data => {
      setForex(data.data)
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
  const toggleTodoList = useCallback((id) => {
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
  }, [list, todoList, doneList]);
  const onSaveTodoList = useCallback((data) => {
    setList(list.concat(data));
  }, [list]);

  return (
    <div className="todoWrap">
      <FormControl forex={forex} onSaveTodoList={onSaveTodoList}/>
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

export default TodoList
