import "./index.css";
import React from "react";
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

let MenuItem = ({ item }) => (
  <li>
    <button>add</button> {item.name} -{" "}
    <small>${item.price}</small>
  </li>
);

class Menu extends React.Component {
  state = {
    filterType: "_ALL_",
    maxPrice: this.getMax()
  };

  getMax() {
    return this.props.items.reduce((max, item) => {
      return item.price > max ? item.price : max;
    }, 0);
  }

  filterByPrice = item => {
    return item.price <= this.state.maxPrice;
  };

  filterByType = item => {
    if (this.state.filterType === "_ALL_") {
      return true;
    } else {
      return item.type === this.state.filterType;
    }
  };

  handleFilterChange = event => {
    this.setState({ filterType: event.target.value });
  };

  handleMaxPriceChange = event => {
    this.setState({
      maxPrice: parseInt(event.target.value, 10)
    });
  };

  render() {
    let { title, items } = this.props;
    let max = this.getMax();

    let filteredItems = items
      .filter(this.filterByPrice)
      .filter(this.filterByType)
      .sort(sortBy("name"));

    return (
      <div>
        <h2>{title}</h2>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <select onChange={this.handleFilterChange}>
                <option value="_ALL_">
                  - filter by type
                </option>
                {[
                  ...new Set(items.map(item => item.type))
                ].map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                Max Price ${this.state.maxPrice}
                <br />
                $0{" "}
                <input
                  type="range"
                  min="0"
                  max={max}
                  defaultValue={max}
                  onChange={this.handleMaxPriceChange}
                />{" "}
                ${max}
              </label>
            </div>
          </div>
        </div>
        {filteredItems.length ? (
          <ul>
            {filteredItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <p>No items!</p>
        )}
      </div>
    );
  }
}

class Order extends React.Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ background: "#eee", padding: "20px" }}
        >
          <Menu title="Menu" items={this.props.menu} />
        </div>

        <div style={{ marginLeft: "40px" }}>
          <h2>Your Order</h2>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Order title="Menu" menu={items} />,
  document.getElementById("root")
);

// import "./index.css";
// import React from "react";
// import ReactDOM from "react-dom";
// import sortBy from "sort-by";

// let items = [
//   { id: 1, name: "tacos", type: "mexican", price: 6 },
//   { id: 2, name: "burrito", type: "mexican", price: 9 },
//   { id: 3, name: "tostada", type: "mexican", price: 8 },
//   {
//     id: 4,
//     name: "mushy peas",
//     type: "english",
//     price: 3
//   },
//   {
//     id: 5,
//     name: "fish and chips",
//     type: "english",
//     price: 12
//   },
//   {
//     id: 6,
//     name: "black pudding",
//     type: "english",
//     price: 12
//   }
// ];

// let MenuItem = ({ item, onSelect }) => (
//   <li>
//     <button onClick={onSelect}>add</button> {item.name} -{" "}
//     <small>${item.price}</small>
//   </li>
// );

// class Menu extends React.Component {
//   state = {
//     filterType: "_ALL_",
//     maxPrice: this.getMax()
//   };

//   getMax() {
//     return this.props.items.reduce((max, item) => {
//       return item.price > max ? item.price : max;
//     }, 0);
//   }

//   filterByPrice = item => {
//     return item.price <= this.state.maxPrice;
//   };

//   filterByType = item => {
//     if (this.state.filterType === "_ALL_") {
//       return true;
//     } else {
//       return item.type === this.state.filterType;
//     }
//   };

//   handleFilterChange = event => {
//     this.setState({ filterType: event.target.value });
//   };

//   handleMaxPriceChange = event => {
//     this.setState({
//       maxPrice: parseInt(event.target.value, 10)
//     });
//   };

//   render() {
//     let { title, items } = this.props;
//     let max = this.getMax();

//     let filteredItems = items
//       .filter(this.filterByPrice)
//       .filter(this.filterByType)
//       .sort(sortBy("name"));

//     return (
//       <div>
//         <h2>{title}</h2>
//         <div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center"
//             }}
//           >
//             <div style={{ marginRight: "10px" }}>
//               <select onChange={this.handleFilterChange}>
//                 <option value="_ALL_">
//                   - filter by type
//                 </option>
//                 {[
//                   ...new Set(items.map(item => item.type))
//                 ].map(type => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label>
//                 Max Price ${this.state.maxPrice}
//                 <br />
//                 $0{" "}
//                 <input
//                   type="range"
//                   min="0"
//                   max={max}
//                   defaultValue={max}
//                   onChange={this.handleMaxPriceChange}
//                 />{" "}
//                 ${max}
//               </label>
//             </div>
//           </div>
//         </div>
//         {filteredItems.length ? (
//           <ul>
//             {filteredItems.map(item => (
//               <MenuItem
//                 key={item.id}
//                 onSelect={() =>
//                   this.props.onItemSelect(item)
//                 }
//                 item={item}
//               />
//             ))}
//           </ul>
//         ) : (
//           <p>No items!</p>
//         )}
//       </div>
//     );
//   }
// }

// let totalOrder = order =>
//   order.reduce((total, item) => item.price + total, 0);

// class Order extends React.Component {
//   state = {
//     order: []
//   };

//   handleItemSelect = item => {
//     this.setState({
//       order: this.state.order.concat([item])
//     });
//   };

//   render() {
//     return (
//       <div style={{ display: "flex" }}>
//         <div
//           style={{ background: "#eee", padding: "20px" }}
//         >
//           <Menu
//             title="Menu"
//             onItemSelect={this.handleItemSelect}
//             items={this.props.menu}
//           />
//         </div>

//         <div style={{ marginLeft: "40px" }}>
//           <h2>
//             Your Order ${totalOrder(this.state.order)}
//           </h2>
//           <ul>
//             {this.state.order.map((item, index) => (
//               <li key={index}>{item.name}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Order title="Menu" menu={items} />,
//   document.getElementById("root")
// );
