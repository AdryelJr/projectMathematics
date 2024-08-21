import './style.scss';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonSair } from '../../components/Buttons/ButtonSair';

export function Home() {
    const [isVisible, setIsVisible] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

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

    return (
        <div className={`main-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
            home aqui
            <p>Bem-Vindo {user ? user.name : 'deslogado'}</p>

            <div>
                <ButtonSair />
            </div>
        </div>
    );
}
