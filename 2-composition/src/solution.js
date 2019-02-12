////////////////////////////////////////////////////////
// 1. Make a `Menu` component that receives a list of
//    items as a prop
// 2. Make a `MenuItem` component and pass it the props
//    it needs to render
// 3. Render two menus at the same time, one for
//    mexican food and one for english food
// 4. Pass in a custom "name" to each Menu
////////////////////////////////////////////////////////
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import sortBy from 'sort-by'

let items = [
  { id: 1, name: 'tacos', type: 'mexican', price: 6 },
  { id: 2, name: 'burrito', type: 'mexican', price: 9 },
  { id: 3, name: 'tostada', type: 'mexican', price: 8 },
  { id: 4, name: 'mushy peas', type: 'english', price: 3 },
  { id: 5, name: 'fish and chips', type: 'english', price: 12 },
  { id: 6, name: 'black pudding', type: 'english', price: 12 }
]

let MenuItem = ({ item }) => (
  <li>
    {item.name} - <small>${item.price}</small>
  </li>
)

let Menu = ({ title, items }) => (
  <div>
    <h1>{title}</h1>
    <ul>
      {items.sort(sortBy('name')).map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  </div>
)

ReactDOM.render(
  <div>
    <Menu
      title="Mexican"
      items={items.filter(item => item.type === 'mexican')}
    />
    <Menu
      title="English"
      items={items.filter(item => item.type === 'english')}
    />
  </div>,
  document.getElementById('root')
)
