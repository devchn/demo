import React, {memo} from 'react'

export const TotalData = ({
  list = []
}) => {
  return (
    <>
      <p className="singlePrice">₽ {
        list.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.rub
        }, 0).toFixed(5)
      }</p>
      <p className="singlePrice">￥ {
        list.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.rmb
        }, 0).toFixed(5)
      }</p>
      <p className="singlePrice">$ {
        list.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.usd
        }, 0).toFixed(5)
      }</p>
    </>
  )
}

const Total = memo(TotalData)

export default Total
