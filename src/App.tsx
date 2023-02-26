import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Route, Routes } from 'react-router-dom'
import { AppLayout, AuthLayout } from './layout'
import { Board, Home, Login, SignUp } from './pages'

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route path={'login'} element={<Login />} />
                <Route path={'signup'} element={<SignUp />} />
            </Route>
            <Route path={'/'} element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path={'boards/:id'} element={<Board />} />
            </Route>
        </Routes>
    )
}

export default App
