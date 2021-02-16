import React, {memo} from 'react'
const defaultFunc = () => {};
export const List = memo(({
  toggleTodoList = defaultFunc(),
  list = []
}) => {
  return (
    <>
      <ul className="plan">
        {
          list.map((item, index)=>{
            return <li key={'todo'+ index} >
              &nbsp;&nbsp;<input onClick={()=>toggleTodoList(item.id)} checked={item.done} readOnly className="checkBox" type="checkbox"/>
              &nbsp;&nbsp;{item.name}
              <div className="priceWrap">
                <p className="singlePrice">₽ {item.rub}</p>
                <p className="singlePrice">￥ {item.rmb}</p>
                <p className="singlePrice">$ {item.usd}</p>
              </div>
            </li>
          })
        }
      </ul>
    </>
  )
})

export default List
