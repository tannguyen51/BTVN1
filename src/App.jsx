import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardMember from './pages/DashboardMember';
import DashboardCoach from './pages/DashboardCoach';
import DoctorPage from './pages/DoctorPage';
import HomepageMember from './pages/HomepageMember';
import TrackStatus from './pages/TrackStatus';
import ContactStaff from './pages/ContactStaff';
// ...existing code...
      <Route path="/contact-staff" element={<ContactStaff />} />
// ...existing code...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-member" element={<DashboardMember />} />
        <Route path="/dashboard-coach" element={<DashboardCoach />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/homepage-member" element={<HomepageMember />} />
        <Route path="/track-status" element={<TrackStatus />} />
        <Route path ="/contact-staff" element ={<ContactStaff />} />
      </Routes>
    </Router>
  );
}

export default App;
