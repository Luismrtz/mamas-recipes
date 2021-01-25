import React from "react";
import styles from "./filter.module.scss";
const Filter = ({ sorting, sort }) => {
  return (
    <div>
      <select className={styles.filter} value={sort} onChange={sorting}>
        <option value="all">All</option>
        <option value="dish">Savory</option>
        <option value="dessert">Sweet</option>
        <option value="beverage">Bev</option>
      </select>
    </div>
  );
};

export default Filter;
