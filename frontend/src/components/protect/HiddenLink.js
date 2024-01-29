import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'

export const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <span>{children}</span>
    }
    return null
}

export const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <span>{children}</span>
    }
    return null
}
