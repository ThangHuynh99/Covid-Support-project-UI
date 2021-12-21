import moment from 'moment'

const logout = () => {
    localStorage.removeItem('expire')
    window.location.reload()
}

export default logout;