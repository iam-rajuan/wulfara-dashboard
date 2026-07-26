import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/Routes'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
  </Provider>
)
