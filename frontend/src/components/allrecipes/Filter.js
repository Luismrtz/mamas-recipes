import React from 'react'

const Filter = ({sorting, sort}) => {
    return (
        <div>
        <select
            value={sort}
            onChange={sorting}

            >
              <option value="all" >All</option>
              <option value="dish">Savory</option>
              <option value="dessert" >Sweet</option>
              <option value="beverage">Bev</option>
            </select>
        </div>
    )
}

export default Filter
