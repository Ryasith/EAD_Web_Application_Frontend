import React from "react"
import { AiOutlineSelect } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

export const SingleCard = ({ key, id, cover, name, to }) => {
  const dispatch = useDispatch()
  
  return (
    <>
    <Link to={to}>
      <div className='box boxItems' id='product'>
        <div className='img'>
          <Link>
            <img src={cover} alt='cover' />
          </Link>
        </div>
        <div className='details'>
          <p>{name}</p>
          <button>
            <AiOutlineSelect />
          </button>
        </div>
      </div>
      </Link>
    </>
  )
}
