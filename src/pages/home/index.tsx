import './style.scss';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';

export function Home() {
    const [isVisible, setIsVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu
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

    // Função que fecha o menu ao clicar em um link
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className={`main-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
            {/* Ícone do menu hambúrguer */}
            <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Menu de opções */}
            <div className={`div-opcoes ${menuOpen ? 'open' : ''}`}>
                <Link to='/' className={isActive('/') || isActive('/addition') || isActive('/subtraction') || isActive('/multiplication') || isActive('/division') ? 'active' : ''} onClick={handleLinkClick}>JOGAR</Link>
                <Link to='/profile' className={isActive('/profile') ? 'active' : ''} onClick={handleLinkClick}>PERFIL</Link>
                <button onClick={() => { sair(); handleLinkClick(); }}>SAIR</button>
            </div>

            <div className='div-content'>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
