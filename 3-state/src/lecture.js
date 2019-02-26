import './index.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import sortBy from 'sort-by'

const items = [
  { id: 1, name: 'tacos', type: 'mexican', price: 6 },
  { id: 2, name: 'burrito', type: 'mexican', price: 9 },
  { id: 3, name: 'tostada', type: 'mexican', price: 8 },
  { id: 4, name: 'mushy peas', type: 'english', price: 3 },
  { id: 5, name: 'fish and chips', type: 'english', price: 12 },
  { id: 6, name: 'black pudding', type: 'english', price: 12 }
]

// class MenuItem extends React.Component {
//   render() {
//     return (
//       <li>
//         {this.props.item.name} -{' '}
//         <small>${this.props.item.price}</small>
//       </li>
//     )
//   }
// }

const MenuItem = ({ item }) => (
  <li>
    {item.name} - <small>${item.price}</small>
  </li>
)

const Menu = ({ title, items }) => {
  const highestPrice = items.reduce((highest, item) => {
    return item.price > highest ? item.price : highest
  }, 0)

  const [maxPrice, setMaxPrice] = useState(highestPrice)
  const [filterType, setFilterType] = useState('_ALL_')

  const customSetMaxPrice = price => {
    if (price < 3) {
      return
    }
    setMaxPrice(price)
  }

  const filterByType = item => {
    if (filterType === '_ALL_') {
      return item
    } else {
      return item.type === filterType
    }
  }

  return (
    <div>
      <h1>{title}</h1>
      <select
        onChange={event => {
          setFilterType(event.target.value)
        }}
      >
        <option value="_ALL_">- filter by type -</option>
        {[...new Set(items.map(item => item.type))].map(type => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <br />
      <br />
      <div>
        <label>
          Max Price {maxPrice}
          <br />
          $0{' '}
          <input
            type="range"
            min="0"
            max={highestPrice}
            onChange={event => {
              customSetMaxPrice(event.target.value)
            }}
            value={maxPrice}
          />
          {highestPrice}
        </label>
        <button
          onClick={() => {
            setMaxPrice(highestPrice)
          }}
        >
          Max us out
        </button>
      </div>
      <ul>
        {items
          .filter(filterByType)
          .filter(item => {
            return item.price <= maxPrice
          })
          .sort(sortBy('name'))
          .map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
      </ul>
    </div>
  )
}

ReactDOM.render(
  <Menu title="Menu" items={items} />,
  document.getElementById('root')
)
