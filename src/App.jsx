import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemsList from './ItemsList'
import AddButton from './AddButton';
import ListItemForm from './ListItemForm';

class ListItemsService {
  
  keyname = 'ListItems';

  constructor() {
    if (!this.getAllItems()) {
      this.setLocalStorageKey([])
    }
  }

  setLocalStorageKey(data) {
    window.localStorage.setItem(this.keyname, JSON.stringify(data))
  }

  getAllItems() {
    return JSON.parse(window.localStorage.getItem(this.keyname))
  }

  setItem(item) {
    const items = this.getAllItems();
    items.push({
      id: Math.round(Math.random() * 100000),
      text: item,
      done: false
    })
    this.setLocalStorageKey(items)
  }

  getItemById(id) {
    const items = this.getAllItems();
    return items.find(item => item.id === id)
  }

  updateItem(id, data) {
    const items = this.getAllItems();
    this.setLocalStorageKey(items.map((item) => {
      if (item.id === id) {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            item[key] = data[key];
          }
        }
      }
      return item;
    }))    
  }
  
  deleteItem(id) {
    const items = this.getAllItems();
    this.setLocalStorageKey(items.filter((item) => item.id !== id))
  }
}


function App() {

  const listService = new ListItemsService()
  const [list, setList] = useState(listService.getAllItems());
  
  const storeItem = (item) => {
    listService.setItem(item)
    setList(listService.getAllItems())
  }
  
  const deleteItem = (id) => {
    listService.deleteItem(id)
    setList(listService.getAllItems())
  }

  const markAsDone = (id) => {
    listService.updateItem(id, { done: true })
    setList(listService.getAllItems())
  }
  
  const markAsNew = (id) => {
    listService.updateItem(id, { done: false })
    setList(listService.getAllItems())
  }

  const [addItem, setAddItem] = useState(false)

  const onStore = (text) => {
    storeItem(text)
    setAddItem(false)
  }

  const onReorder = (reorderedList) => {
    listService.setLocalStorageKey(reorderedList)
    setList(listService.getAllItems())
  }

  return (
    <div className="App">
      
      <header>
        <div className="container">
          <div className="flex items-center py-4">
            <img src={logo} className="w-16" alt="logo"/>
            <div>
              <h1 className="text-white text-3xl font-bold">React.js Todo List</h1>
            </div>
          </div>
          <p className="text-xs text-white px-6">
            Había usado React.js muy poquito, así que quise hacer esta Lista de tareas para aprender un poquito más.
            <br/>
            <br/>
            Puedes <b>Agregar tareas, Eliminarlas, Marcarlas como hechas y moverlas de orden.</b>
            <br/>
            <br/>
            <ul>
              <li> <b>Las tareas se guardan localmente en tu dispositivo</b> por lo cual son totalmente privadas. </li>
            </ul>
          </p>
        </div>
      </header>
      
      <div className="container">
        <div className="flex flex-col gap-4 p-4">
          <ItemsList items={list} onDeleteItem={deleteItem} onMarkAsDone={markAsDone} onMarkAsNew={markAsNew} onReordered={onReorder}></ItemsList>
          {
            addItem
              ? <ListItemForm onStore={onStore}></ListItemForm>
              : <AddButton onClick={() => setAddItem(true)}></AddButton>
          }
        </div>
      </div>
        
      <p className="text-center py-4">
        <a className="text-xs text-slate-500" href="https://github.com/rdrglpzcnt" target="_blank" rel="noreferrer">
          RDRGLPZCNT
        </a>
      </p>

    </div>
  );
  
}

export default App;
