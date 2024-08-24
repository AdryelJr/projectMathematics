import './style.scss';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';

export function Home() {
    const [isVisible, setIsVisible] = useState(true);
    const { user, deslogar } = useAuth();
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
        }, 300); // Duração da transição

        return () => clearTimeout(timer);
    }, [location.pathname]);

    function sair() {
        deslogar();
    }
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className={`main-container ${isVisible ? 'fade-in' : 'fade-out'}`}>

            <div className='div-opcoes'>
                <Link to='/' className={isActive('/') || isActive('/addition') || isActive('/subtraction') || isActive('/multiplication') || isActive('/division') ? 'active' : ''}>JOGAR</Link>
                <Link to='/profile' className={isActive('/profile') ? 'active' : ''}>PERFIL</Link>
                <button onClick={sair}>SAIR</button>
            </div>

            <div className='div-content'>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
