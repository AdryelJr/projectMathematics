import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/userAuth";
import { Home } from './pages/home';
import { Login } from './pages/loginPage';

export function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}