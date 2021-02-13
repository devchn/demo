import React from 'react'
import './Demo.css'
import axios from 'axios'

function Demo () {
  // 汇率
  const [rmbToRub, setRmbToRub] = React.useState(0);
  const [rmbToUsd, setRmbToUsd] = React.useState(0);
  // 输入
  const [task, setTask] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [moneyType, setMoneyType] = React.useState('');
  //  展示数据
  const [todo, setTodo] = React.useState([]);
  const [done, setDone] = React.useState([]);

  React.useEffect(()=>{
    axios.post('https://api.globus.furniture/forex').then(data => {
      setRmbToUsd(data.data.USD.value.toFixed(5));
      setRmbToRub(data.data.RUB.value.toFixed(5))
    }).catch(error=>{
      console.error(error)
    })
  },[]);

  function changeTask(ev) {
    setTask(ev.target.value)
  }
  function changePrice(ev) {
    setPrice(ev.target.value)
  }
  function changeMoneyType(ev) {
    setMoneyType(ev.target.value)
  }

  const addTodo = () => {
    if (task === ''){
      alert('任务名不能为空');
      return;
    }
    if (!price || price < 0){
      alert('请输入正确的价格！');
      return;
    }
    if (!moneyType){
      alert('货币类型不能为空')
      return;
    }
    let list = {};
    if (moneyType === 'RMB') {
      list = {
        name: task,
        rmb: parseFloat(price),
        usd: parseFloat((price * rmbToUsd).toFixed(5)),
        rub: parseFloat((price * rmbToRub).toFixed(5))
      }
    } else if (moneyType === 'USD') {
      list = {
        name: task,
        rmb: parseFloat((price / rmbToUsd).toFixed(5)),
        usd: parseFloat(price),
        rub: parseFloat((price / rmbToUsd * rmbToRub).toFixed(5))
      }
    } else if (moneyType === 'RUB') {
      list = {
        name: task,
        rmb: parseFloat((price / rmbToRub).toFixed(5)),
        usd: parseFloat(((price / rmbToRub) * rmbToUsd).toFixed(5)),
        rub: parseFloat(price)
      }
    } else {
      console.log('未选择正确的货币类型')
    }
    const todoList = [...todo, list];
    setTodo(todoList);
    // 每次添加后清空
    setTask('');
    setPrice(0);
    setMoneyType('')
  };
  function roundFun(value, n) {
    return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
  }
  const removeTodo = (index) => {
    const todoList = [...todo];
    const doneList = [...done];
    const toggleTodo = todoList.splice(index, 1);
    const doneTodo = doneList.concat(toggleTodo);
    setTodo(todoList);
    setDone(doneTodo)
  };
  const restoreTodo = (index) => {
    const todoList = [...todo];
    const doneTodo = [...done];
    const toggleTodo = doneTodo.splice(index, 1);
    const newTodo = todoList.concat(toggleTodo);
    setTodo(newTodo);
    setDone(doneTodo)
  };
  return (
    <div style={{width: "600px", margin: '0 auto'}}>
      {/*{rmbToRub}/{rmbToUsd}*/}
      <div>
        <input value={task} onChange={changeTask} className="inputType" style={{width: "35%"}} type="text" placeholder="任务"/>
        <input value={price} onChange={changePrice} className="inputType" style={{width: "16%"}} type="number" placeholder="价格"/>
        <input type="text" id="interval" className="inputType" onChange={changeMoneyType} style={{width: "25%"}} value={moneyType} name="interval" list="moneyType" datatype="*" placeholder="货币类型"/>
        <datalist id="moneyType" >
          <option value="RMB">人民币</option>
          <option value="USD">美元</option>
          <option value="RUB">卢比</option>
        </datalist>
        <button onClick={addTodo} style={{width: "16%", margin: '0 0 0 5px', height: '30px'}}>添加</button>
        <div style={{textAlign: "right", margin: '10px 0'}}>
          <p className="proportion">{rmbToRub} ₽/￥</p>
          <p className="proportion">{(rmbToRub / rmbToUsd).toFixed(5)} P/$</p>
          <p className="proportion">{rmbToUsd} ￥/$</p>
        </div>
      </div>
      <div>
        <p>计划：</p>
        <ul className="plan">
          {
            todo.map((item, index)=>{
              return <li key={'todo'+ index} >
                &nbsp;&nbsp;<input onClick={()=>removeTodo(index)} checked={false} readOnly className="checkBox" type="checkbox" name="notChoice"/>
                &nbsp;&nbsp;{item.name}
                <div style={{display: 'inline-block', float: 'right'}}>
                  <p className="singlePrice">₽ {item.rub}</p>
                  <p className="singlePrice">￥ {item.rmb}</p>
                  <p className="singlePrice">$ {item.usd}</p>
                </div>
              </li>
            })
          }
        </ul>
        <div style={{textAlign: 'right', height: '30px', lineHeight: '30px'}}>
          <p style={{float: 'left'}}>&nbsp;&nbsp;将要花费：</p>
          <p className="singlePrice">₽ {
            todo.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.rub
            }, 0).toFixed(5)
          }</p>
          <p className="singlePrice">￥ {
            todo.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.rmb
            }, 0).toFixed(5)
          }</p>
          <p className="singlePrice">$ {
            todo.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.usd
            }, 0).toFixed(5)
          }</p>
        </div>
      </div>
      <div>
        <p>已完成：</p>
        <ul className="plan">
          {
            done.map((item, index)=>{
              return <li key={'todo'+ index}>
                &nbsp;&nbsp;<input onClick={()=>restoreTodo(index)} className="checkBox" checked={true} readOnly type="checkbox" name="notChoice" value=""/>
                &nbsp;&nbsp;<del>{item.name}</del>
                <div style={{display: 'inline-block', float: 'right'}}>
                  <p className="singlePrice">₽ {item.rub}</p>
                  <p className="singlePrice">￥ {item.rmb}</p>
                  <p className="singlePrice">$ {item.usd}</p>
                </div>
              </li>
            })
          }
        </ul>
        <div style={{textAlign: 'right', height: '30px', lineHeight: '30px'}}>
          <p style={{float: 'left'}}>&nbsp;&nbsp;一共花了：</p>
          <p className="singlePrice">₽ {
            done.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.rub
            }, 0).toFixed(5)
          }</p>
          <p className="singlePrice">￥ {
            done.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.rmb
            }, 0).toFixed(5)
          }</p>
          <p className="singlePrice">$ {
            done.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.usd
            }, 0).toFixed(5)
          }</p>
        </div>
      </div>
    </div>
  )
}

export default Demo
