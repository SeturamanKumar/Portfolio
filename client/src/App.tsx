import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import ProtectedRoutes from './Components/pages/auth/ProtectedRoutes';

import ProjectPage from './Components/pages/ProjectPage';
import AdminDashboard from './Components/pages/admin/AdminDashboard';
import EditProject from './Components/pages/admin/EditProject';
import AddProject from './Components/pages/admin/AddProject';
import LoginPage from './Components/pages/auth/LoginPage';

// Layout components import
import Navbar from './Components/pages/HomePage/Navbar';
import Projects from './Components/pages/HomePage/Projects';
import Hero from './Components/pages/HomePage/Hero';
import Footer from './Components/pages/HomePage/Footer';
import Contact from './Components/pages/HomePage/Contact';

function MainLayout(): React.JSX.Element {

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

function App(): React.JSX.Element {

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
