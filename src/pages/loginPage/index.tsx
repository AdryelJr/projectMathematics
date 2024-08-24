import './style.scss'
import { useEffect } from 'react';
import { ButtonGoogle } from '../../components/Buttons/ButtonGoogle';
import { useAuth } from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import imgLogo from '../../assets/img/logo matemagica_00000.png';

export function Login() {
    const { signInWithGoogle } = useAuth();

    useEffect(() => {
        const storageDarkMode = localStorage.getItem('darkMode');
        if (storageDarkMode) {
            document.body.classList.toggle('dark-mode', JSON.parse(storageDarkMode));
        }
    }, [])

    return (
        <div className='container-login'>

            <div className='content-logo'>
                <img src={imgLogo} alt="logo" />
            </div>

            <div className='content-login'>
                <h1>BEM-VINDO</h1>
                <div className='form'>
                    <div className='login-register'>
                        <Outlet />
                    </div>

                    <ButtonGoogle onClick={signInWithGoogle} />
                </div>
            </div>
        </div>
    )
}