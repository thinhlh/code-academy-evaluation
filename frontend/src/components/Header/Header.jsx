import { useNavigate } from 'react-router-dom'
import './Header.scss'
export default function Header() {

    const navigate = useNavigate()

    return (
        <div className='app-header'>
            <p onClick={() => navigate('/signin')}>
                Book My Movie
            </p>
        </div>
    )
}