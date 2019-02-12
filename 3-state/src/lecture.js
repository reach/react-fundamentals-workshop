import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const items = [
  { id: 1, name: "tacos", type: "mexican", price: 6 },
  { id: 2, name: "burrito", type: "mexican", price: 9 },
  { id: 3, name: "tostada", type: "mexican", price: 8 },
  { id: 4, name: "mushy peas", type: "english", price: 3 },
  { id: 5, name: "fish and chips", type: "english", price: 12 },
  { id: 6, name: "black pudding", type: "english", price: 12 }
];

const MenuItem = ({ item }) => (
  <li>
    {item.name} - <small>${item.price}</small>
  </li>
);

const Menu = ({ title, items }) => (
  <div>
    <h1>{title}</h1>
    <ul>
      {items
        .sort(sortBy("name"))
        .map(item => <MenuItem key={item.id} item={item} />)}
    </ul>
  </div>
);

ReactDOM.render(
  <Menu title="Menu" items={items} />,
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
//   { id: 4, name: "mushy peas", type: "english", price: 3 },
//   { id: 5, name: "fish and chips", type: "english", price: 12 },
//   { id: 6, name: "black pudding", type: "english", price: 12 }
// ];

// let MenuItem = ({ item }) => (
//   <li>
//     {item.name} - <small>${item.price}</small>
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
//         <h1>{title}</h1>
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
//                   <option value={type}>{type}</option>
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
//               <MenuItem item={item} />
//             ))}
//           </ul>
//         ) : (
//           <p>No items!</p>
//         )}
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Menu title="Menu" items={items} />,
//   document.getElementById("root")
// );
