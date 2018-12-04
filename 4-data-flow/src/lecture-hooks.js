import "./index.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

let items = [
  { id: 1, name: "tacos", type: "mexican", price: 6 },
  { id: 2, name: "burrito", type: "mexican", price: 9 },
  { id: 3, name: "tostada", type: "mexican", price: 8 },
  {
    id: 4,
    name: "mushy peas",
    type: "english",
    price: 3
  },
  {
    id: 5,
    name: "fish and chips",
    type: "english",
    price: 12
  },
  {
    id: 6,
    name: "black pudding",
    type: "english",
    price: 12
  }
];

let MenuItem = ({ item, onSelect }) => (
  <li>
    <button onClick={onSelect}>add</button> {item.name} -{" "}
    {item.name} - <small>${item.price}</small>
  </li>
);

function Menu({ title, items, onItemSelect }) {
  let [filterType, setFilterType] = useState("_ALL_");

  let highestPrice = items.reduce((max, item) => {
    return item.price > max ? item.price : max;
  }, 0);

  let [maxPrice, setMaxPrice] = useState(highestPrice);

  let filterByPrice = item => item.price <= maxPrice;

  let filterByType = item => {
    if (filterType === "_ALL_") {
      return true;
    } else {
      return item.type === filterType;
    }
  };

  let handleFilterChange = event => {
    setFilterType(event.target.value);
  };

  let handleMaxPriceChange = event => {
    setMaxPrice(parseInt(event.target.value, 10));
  };

  let filteredItems = items
    .filter(filterByPrice)
    .filter(filterByType)
    .sort(sortBy("name"));

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <select onChange={handleFilterChange}>
              <option value="_ALL_">
                - filter by type
              </option>
              {[
                ...new Set(items.map(item => item.type))
              ].map(type => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label>
              Max Price ${maxPrice}
              <br />
              $0{" "}
              <input
                type="range"
                min="0"
                max={highestPrice}
                defaultValue={highestPrice}
                onChange={handleMaxPriceChange}
              />{" "}
              ${highestPrice}
            </label>
          </div>
        </div>
      </div>
      {filteredItems.length ? (
        <ul>
          {filteredItems.map(item => (
            <MenuItem
              onSelect={() => onItemSelect(item)}
              item={item}
            />
          ))}
        </ul>
      ) : (
        <p>No items!</p>
      )}
    </div>
  );
}

let totalOrder = order =>
  order.reduce((total, item) => item.price + total, 0);

function Order({ menu }) {
  let [order, setOrder] = useState([]);

  let handleItemSelect = item => {
    setOrder(order.concat([item]));
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ background: "#eee", padding: "20px" }}
      >
        <Menu
          title="Menu"
          onItemSelect={handleItemSelect}
          items={menu}
        />
      </div>

      <div style={{ marginLeft: "40px" }}>
        <h2>Your Order ${totalOrder(order)}</h2>
        <ul>
          {order.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Order title="Menu" menu={items} />,
  document.getElementById("root")
);
