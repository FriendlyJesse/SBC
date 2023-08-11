import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../pages/Login'


const router = createBrowserRouter([
  // 重定向
  {
    path: '/',
    element: <Navigate to='/Login' replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/' />
  }
])

export default router