import { Link } from 'react-router-dom'
import padLock from '../../assets/svg/padLock.svg';
import './style.scss'

export function Play() {
    return (
        <div className='container-play'>
            <h1>ESCOLHA A OPERAÇÃO</h1>

            <ul>
                <Link to="addition">ADIÇÃO</Link>
                <Link to="subtraction" className='blocked'>SUBTRAÇÃO</Link>
                <Link to="multiplication">MULTIPLICAÇÃO</Link>
                <Link to="division">DIVISÃO</Link>

                <img width={50} src={padLock} alt="padlok" />
            </ul>
        </div>
    )
}