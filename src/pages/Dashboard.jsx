import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { Card } from "./Card/card"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <section className='heading'>
        <br/>
        <h1>Welcome {user && user.name}</h1>
        <p>Dashboard</p>
      </section>
      <Card />
    </>
  )
}

export default Dashboard