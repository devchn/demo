import React, {memo} from 'react'
export const DataList = ({
    toggleTodoList,
    list
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
}

const List = memo(DataList)

export default List
