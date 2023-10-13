import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './ProtectedRoute'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Authentication from './pages/Authentication/Authentication'
import UserList from './pages/UserManagement/UserList'
import ReservationList from './pages/TicketManagement/ReservationList'
import EditReservation from './pages/TicketManagement/EditReservation'
import CreateReservation from './pages/TicketManagement/CreateReservation'
import AvailableTrainsList from './pages/TicketManagement/AvailableTrainsList'
import AddReservation from './pages/TicketManagement/AddReservation'
import TravelersList from './pages/UserManagement/TravelersList'
import EditTraveler from './pages/UserManagement/EditTraveler'
import TrainList from './pages/TrainManagement/TrainList'
import CreateTraveler from './pages/UserManagement/CreateTraveler'
import CreateTrains from './pages/TrainManagement/CreateTrains'
import EditTrain from './pages/TrainManagement/EditTrain'
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
            <Route path="/editTrain" element={
              <ProtectedRoute>
                <EditTrain />
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