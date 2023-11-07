import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Create from './pages/Create_tmp';
import Update from './pages/Update';
import About from './pages/About';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
          <div className="contents">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/create' element={<Create />}></Route>
              <Route path='/detail/:id' element={<Update />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App
