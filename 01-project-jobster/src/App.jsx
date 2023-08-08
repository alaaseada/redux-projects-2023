import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing, Error, Register, ProtectedRoute } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Profile,
  AddJob,
  AllJobs,
  Stats,
  SharedLayout,
} from './pages/dashboard';

function App() {
  const app_router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <SharedLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Stats />,
        },
        {
          path: 'all-jobs',
          element: <AllJobs />,
        },
        {
          path: 'add-job',
          element: <AddJob />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    { path: '/landing', element: <Landing /> },
    { path: '/register', element: <Register /> },
    { path: '*', element: <Error /> },
  ]);
  return (
    <>
      <RouterProvider router={app_router} />
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
