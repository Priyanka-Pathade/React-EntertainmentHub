import React from 'react'
import Header from './Components/Header';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SimpleBottomNavigation from './Components/MainNav';
import Container from '@mui/material/Container';
import Movies from './Components/Movies';
import Trending from './Components/Trending';
import Series from './Components/Series';
import Search from './Components/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Route path='/' component={Trending} exact></Route>
          <Route path='/movies' component={Movies}></Route>
          <Route path='/series' component={Series}></Route>
          <Route path='/search' component={Search}></Route>

        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
    
  )
}

export default App
