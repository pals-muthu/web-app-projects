import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './components/HomePage';
import InnerPage from './components/InnerPage';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [{
      path: '/inner',
      element: <InnerPage />
    }]
  },
]);

function App() {
  return (
    < Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
