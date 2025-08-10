import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import ProtectedRoutes from './Components/pages/auth/ProtectedRoutes.jsx';

import ProjectPage from './Components/pages/ProjectPage.jsx';
import AdminDashboard from './Components/pages/admin/AdminDashboard.jsx';
import EditProject from './Components/pages/admin/EditProject.jsx';
import AddProject from './Components/pages/admin/AddProject.jsx';
import LoginPage from './Components/pages/auth/LoginPage.jsx';

// Layout components import
import Navbar from './Components/pages/HomePage/Navbar.jsx';
import Projects from './Components/pages/HomePage/Projects.jsx';
import Hero from './Components/pages/HomePage/Hero.jsx';
import Footer from './Components/pages/HomePage/Footer.jsx';
import Contact from './Components/pages/HomePage/Contact.jsx';

function MainLayout() {

  return(
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <Footer /> 
    </>
  );
  
}

function App(){

  return(
    <div className='App'>
      <Suspense fallback={<div className='loading-fallback'>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<MainLayout />} />
          <Route path='/project/:projectSlug' element={<ProjectPage />} />
          <Route path='/login' element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path='/admin' element={<ProtectedRoutes><AdminDashboard /></ProtectedRoutes>} />
          <Route path='/admin/edit/:projectId' element={<ProtectedRoutes><EditProject /></ProtectedRoutes>} />
          <Route path='/admin/add' element={<ProtectedRoutes><AddProject /></ProtectedRoutes>} />
        </Routes>
      </Suspense>
    </div>
  );

}

export default App;
