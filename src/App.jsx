import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './common/Layout';
import CategoryList from './components/product/CategoryList';
import {
  Cart,
  Collection,
  GuestOrder,
  Maison,
  Mypage,
  Payment,
  ProductDetail,
  ProductList,
  Promotion,
  Register,
  SearchResult,
  Service,
  SignIn,
} from './pages';
import './styles/globals.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Maison />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/product" element={<ProductList />}>
            <Route path=":categoryName" element={<CategoryList />} />
          </Route>
          <Route path="/product/:categoryName/:productId" element={<ProductDetail />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/service" element={<Service />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/guestorder" element={<GuestOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
