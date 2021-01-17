import React from 'react'

const Filter = ({sorting, sort}) => {
    return (
        <div>
        <select
            value={sort}
            onChange={sorting}
            // className={styles.quantity}
            >
              {/* <option value="1" onClick={() => showAll()}>All</option>
              <option value="2" onClick={() => showSavory()}>Savory</option>
              <option value="3"  onClick={() => showSweets()}>Sweet</option>
              <option value="4" onClick={() => showBev()}>Bev</option> */}
              <option value="all" >All</option>
              <option value="dish">Savory</option>
              <option value="dessert" >Sweet</option>
              <option value="beverage">Bev</option>
            </select>
        </div>
    )
}

export default Filter
