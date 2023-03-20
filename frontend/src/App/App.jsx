import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignIn/SignInPage';
import MoviesPage from '../pages/Movies/MoviesPage';
import BookingPage from '../pages/Booking/BookingPage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MoviesPage />
    },
    {
      path: '/signin',
      element: <SignInPage />
    }, {
      path: '/movies',
      element: <MoviesPage />
    }, {
      path: '/:movieId/booking',
      element: <BookingPage />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
