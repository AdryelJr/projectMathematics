import './style.scss';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            home aqui
            <p>Bem-Vindo {user ? user.name : 'deslogado'}</p>
        </div>
    );
}
