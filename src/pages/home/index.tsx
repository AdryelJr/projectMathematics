import './style.scss';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ButtonSair } from '../../components/Buttons/ButtonSair';
import { usePlayButton } from '../../contexts/playButtonContext';

export function Home() {
    const { playButton, setPlayButton } = usePlayButton();
    const [isVisible, setIsVisible] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        setIsVisible(false);

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); // Duração da transição

        return () => clearTimeout(timer);
    }, [location.pathname]);

    function handlePlay() {
        setPlayButton(true);
        navigate('/play');
    }

    return (
        <div className={`main-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <header>
                <div className='div-title'>
                    <p>Bem-Vindo {user ? user.name : 'deslogado'}!</p>
                </div>
            </header>

            <main>
                <div className='div-content'>
                    {!playButton ? (
                        <button className='btn-comecar' onClick={handlePlay}>Começar</button>
                    ) : null}
                    <Outlet />
                </div>
                <div>
                    <ButtonSair />
                </div>
            </main>
        </div>
    );
}
