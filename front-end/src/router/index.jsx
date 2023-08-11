import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Main from '../pages/Main'

const router = createBrowserRouter([
  // 重定向
  {
    path: '/',
    element: <Navigate to='/login' replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/main',
    element: <Main />
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/' />
  }
])

export default router