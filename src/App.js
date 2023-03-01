import React from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [ list, setList ] = React.useState(JSON.parse(localStorage.getItem('list')) || []);
  const [ isItems , setIsItems ] = React.useState(false);
  const [ alert, setAlert] = React.useState({show: false, message: "", type: ""});
  const [ isEdit,setIsEdit ] = React.useState(false)
  const [ name, setName ] = React.useState("")
  const [ editId, setEditId ] = React.useState(0)

  React.useEffect(()=> {
    list.length > 0? setIsItems(true) : setIsItems(false);
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  React.useEffect(()=> {
    const timer = setTimeout(() => {
      setAlert({ show: false, message: "", type: ""})
    }, 3000)
    return () => clearTimeout(timer)
  }, [alert])

  const generateItem = (idx = list.length) => {
    const id = idx
    const newItem ={text: name, id: id}
    setName("")
    return newItem;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      setAlert({show: true, message:"please enter value", type:"alert-danger"})
    }else if(name && isEdit){
      const newItemsList = list.filter((item) => item.id !== editId)
      const newListWithNewIds = newItemsList.map((item, idx) => {
        return {text: item.text, id: idx}
      })
      const newItem = generateItem(newListWithNewIds.length)
      setList([...newListWithNewIds, newItem])
      setEditId(null)
      setIsEdit(false)
      setAlert({show: true, message:"value updated", type:"alert-success"})
      return
    }else {
      const item = generateItem()
      setList([...list, item])
      setAlert({show: true, message:"item added", type:"alert-success"})
      setName("")
    }
  }
  const onEdit= (id) => {
    const item = list.filter((item) => item.id === id)
    if(item){
      setEditId(id)
      setName(item[0].text);
      setIsEdit(true)
    }
  }
  const onDelete = (id) => {
    const newItemList = list.filter((item) => item.id !== id)
    setList([...newItemList])
    setAlert({show: true, message:"item removed", type:"alert-danger"})
  }

  const onCLearList = () => {
    setList([])
    setAlert({show: true, message:"empty list", type:"alert-danger"})
  }

  return (
  <section className='section-center'>
    { alert.show && <Alert {...alert} />}
    <form className='grocery-form' onSubmit={handleSubmit}>
      <h3>Grocery Bud</h3>
      <div className='form-control'>
      <input type="text" className='grocery' value={name} placeholder="e.g eggs" onChange={(e) => setName(e.target.value)}/>
      <button className='submit-btn' type='submit'>{isEdit? "edit" : "submit"}</button>
      </div>
    </form>
    <section className={`grocery-container`}>
      {list.map((item) => {
        return <List item={item} onEdit={onEdit} onDelete ={onDelete} key={item.id} />
      })}
    </section>
    {isItems && <button className='clear-btn' onClick={onCLearList}>clear items</button>}
  </section>)
}

export default App
