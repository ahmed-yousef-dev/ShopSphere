import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from './i18n';
import store from './store/store';
import NavigationBar from './components/Navbar';
import { Spinner } from 'react-bootstrap';

const ProductsList = lazy(() => import('./components/ProductsList'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const Cart = lazy(() => import('./components/Cart'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <NavigationBar />
          <div className="container mt-4">
            <Suspense fallback={<div className="d-flex justify-content-center"><Spinner animation="border" /></div>}>
              <Routes>
                <Route path="/" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
}

export default App;