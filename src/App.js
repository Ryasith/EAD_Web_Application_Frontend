import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './ProtectedRoute'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Authentication from './pages/Authentication'
import UserList from './pages/UserList'
import ReservationList from './pages/ReservationList'
import EditReservation from './pages/EditReservation'
import CreateReservation from './pages/CreateReservation'
import AvailableTrainsList from './pages/AvailableTrainsList'
import AddReservation from './pages/AddReservation'
import TravelersList from './pages/TravelersList'
import EditTraveler from './pages/EditTraveler'
import TrainList from './pages/TrainList'
import CreateTraveler from './pages/CreateTraveler'
import CreateTrains from './pages/CreateTrains'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/userList" element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            } />
            <Route path="/reservationList" element={
              <ProtectedRoute>
                <ReservationList />
              </ProtectedRoute>
            } />
            <Route path="/editReservation" element={
              <ProtectedRoute>
                <EditReservation />
              </ProtectedRoute>
            } />
            <Route path="/createReservation" element={
              <ProtectedRoute>
                <CreateReservation />
              </ProtectedRoute>
            } />
            <Route path="/availableTrains" element={
              <ProtectedRoute>
                <AvailableTrainsList />
              </ProtectedRoute>
            } />
            <Route path="/addReservation" element={
              <ProtectedRoute>
                <AddReservation />
              </ProtectedRoute>
            } />
            <Route path="/travelersList" element={
              <ProtectedRoute>
                <TravelersList />
              </ProtectedRoute>
            } />
            <Route path="/editTraveler" element={
              <ProtectedRoute>
                <EditTraveler />
              </ProtectedRoute>
            } />
            <Route path="/trainList" element={
              <ProtectedRoute>
                <TrainList />
              </ProtectedRoute>
            } />
            <Route path="/createTraveler" element={
              <ProtectedRoute>
                <CreateTraveler />
              </ProtectedRoute>
            } />
            <Route path="/createTrain" element={
              <ProtectedRoute>
                <CreateTrains />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App