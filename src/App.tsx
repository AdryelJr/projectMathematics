import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/userAuth";
import { Home } from './pages/home';
import { Login } from './pages/loginPage';
import { PlayPage } from './pages/play';
import { PlayButtonProvider } from './contexts/playButtonContext';

export function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PlayButtonProvider>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path='/' element={<Home />}>
              <Route path='/play' element={<PlayPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </PlayButtonProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}