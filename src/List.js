import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({item, onEdit, onDelete}) => {

  return (
  <article className='grocery-item'>
    <p className='title'>{item.text}</p>
    <div className='btn-container'>
    <button className='edit-btn' onClick={() => onEdit(item.id)}> {<FaEdit />}</button>
    <button className='delete-btn' onClick={() => onDelete(item.id)}> {<FaTrash />}</button>
    </div>
  </article>)
}

export default List
