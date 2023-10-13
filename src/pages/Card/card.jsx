import React from "react"
import { Backoffice, Travel_Agent } from "../../assets/data/data"
import "./card.css"
import { SingleCard } from "./singleCard"
import { useSelector } from 'react-redux'

export const Card = () => {

  const { user } = useSelector((state) => state.auth)
  const userRole = user?.user_Role?user?.user_Role:0;
  const newUser = userRole == 1?Backoffice:Travel_Agent

  return (
    <>
      <section className='product'>
        <div className='container grid3'>
          {newUser.map((item) => (
            <SingleCard key={item.id} id={item.id} cover={item.cover} name={item.name} to={item.to} />
          ))}
        </div>
      </section>
    </>
  )
}
