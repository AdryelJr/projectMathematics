import './style.scss'
import { useEffect } from 'react';
import { ButtonGoogle } from '../../components/Buttons/ButtonGoogle';
import { useAuth } from '../../hooks/useAuth';

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
            <div className='content-login'>
                <span>Login Project Mathematics</span>
                <ButtonGoogle onClick={signInWithGoogle} />
            </div>
        </div>
    )
}