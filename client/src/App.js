import './App.css';
import Navbar from './Components/Nabvar.jsx'
import Projects from './Components/Projects.jsx'
import Hero from './Components/Hero.jsx'
import Footer from './Components/Footer.jsx'
import Contact from './Components/Contact.jsx'

function App() {

  return(
    <div className='App'>
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <Footer /> 
    </div>
  )
  
}

export default App;
