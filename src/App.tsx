import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/userAuth";
import { Home } from './pages/home';
import { Login } from './pages/loginPage';
import { PlayButtonProvider } from './contexts/playButtonContext';
import { LoginOutlet } from './pages/loginPage/Login';
import { RegisterOutlet } from './pages/loginPage/Register';
import { Profile } from './pages/profile';
import { Play } from './pages/play';
import { Addition } from './Questions/Addition';
import { Division } from './Questions/Division';
import { Multiplication } from './Questions/Multiplication';
import { Subtraction } from './Questions/Subtraction';

export function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PlayButtonProvider>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path='/' element={<Home />}>
              <Route path='/' element={<Play />} />
              <Route path='/' element={<Play />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="addition" element={<Addition />} />
              <Route path="subtraction" element={<Subtraction />} />
              <Route path="multiplication" element={<Multiplication />} />
              <Route path="division" element={<Division />} />
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