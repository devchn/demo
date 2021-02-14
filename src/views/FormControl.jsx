import React, {memo, useState} from 'react'
const defaultFunc = () => {};
export const FormControl = memo(({
  onSaveTodoList = defaultFunc(),
  rate: {}
}) => {
    const [form, setForm] = useState({
      id: '',
      task: '',
      price: 0,
      moneyType: '',
      done: false
    });

    const changeTask = (ev) => {
      setForm({
        id: form.id,
        task: ev.target.value,
        price: form.price,
        moneyType: form.moneyType,
        done: form.done
      })
    };
    const changePrice = (ev) => {
      setForm({
        id: form.id,
        task: form.task,
        price: ev.target.value,
        moneyType: form.moneyType,
        done: form.done
      })
    };
    const changeMoneyType = (ev) => {
      setForm({
        id: form.id,
        task: form.task,
        price: form.price,
        moneyType: ev.target.value,
        done: form.done
      })
    };
    /* 模拟数据,接口请求不到 */
    const rate = {};
    rate.rmbToUsd = 0.1520248078866076;
    rate.rmbToRub = 11.5257;
    const addTodo = () => {
      if (form.task === ''){
        alert('任务名不能为空');
        return;
      }
      if (!form.price || form.price < 0){
        alert('请输入正确的价格！');
        return;
      }
      if (!form.moneyType){
        alert('货币类型不能为空');
        return;
      }
      let list = {};
      if (form.moneyType === 'RMB') {
        list = {
          id: new Date(),
          name: form.task,
          rmb: parseFloat(form.price),
          usd: parseFloat((form.price * rate.rmbToUsd).toFixed(5)),
          rub: parseFloat((form.price * rate.rmbToRub).toFixed(5)),
          done: form.done
        }
      } else if (form.moneyType === 'USD') {
        list = {
          id: new Date(),
          name: form.task,
          rmb: parseFloat((form.price / rate.rmbToUsd).toFixed(5)),
          usd: parseFloat(form.price),
          rub: parseFloat((form.price / rate.rmbToUsd * rate.rmbToRub).toFixed(5)),
          done: form.done
        }
      } else if (form.moneyType === 'RUB') {
        list = {
          id: new Date(),
          name: form.task,
          rmb: parseFloat((form.price / rate.rmbToRub).toFixed(5)),
          usd: parseFloat(((form.price / rate.rmbToRub) * rate.rmbToUsd).toFixed(5)),
          rub: parseFloat(form.price),
          done: form.done
        }
      } else {
        alert('请选择正确的货币类型！');
        return;
      }
      onSaveTodoList(list);
      // 每次添加后清空
      setForm({
        id: '',
        task: '',
        price: 0,
        moneyType: '',
        done: false
      })
    };
    return (
      <>
        <input className="taskInput" value={form.task} onChange={changeTask} type="text" placeholder="任务"/>
        <input className="priceInput" value={form.price} onChange={changePrice} type="number" placeholder="价格"/>
        <input className="moneyTypeInput" value={form.moneyType} type="text" id="interval" onChange={changeMoneyType} name="interval" list="moneyType" datatype="*" placeholder="货币类型"/>
        <datalist id="moneyType" >
          <option value="RMB">人民币</option>
          <option value="USD">美元</option>
          <option value="RUB">卢比</option>
        </datalist>
        <button className="addBtn" onClick={addTodo}>添加</button>
        <div className="rateList">
          <p className="proportion">{rate.rmbToRub.toFixed(5)} ₽/￥</p>
          <p className="proportion">{(rate.rmbToRub / rate.rmbToUsd).toFixed(5)} P/$</p>
          <p className="proportion">{rate.rmbToUsd.toFixed(5)} ￥/$</p>
        </div>
      </>
    )
});

export default FormControl
