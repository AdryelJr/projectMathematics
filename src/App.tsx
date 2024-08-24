import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/userAuth";
import { Home } from './pages/home';
import { Login } from './pages/loginPage';
import { PlayPage } from './pages/play';
import { PlayButtonProvider } from './contexts/playButtonContext';
import { LoginOutlet } from './pages/loginPage/Login';
import { RegisterOutlet } from './pages/loginPage/Register';

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
            <Route path='/login' element={<Login />}>
              <Route path='/login' element={<LoginOutlet />} />
              <Route path='register' element={<RegisterOutlet />} />
            </Route>
          </Routes>
        </PlayButtonProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}