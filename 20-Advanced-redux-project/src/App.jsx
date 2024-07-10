import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart) 
  const notification = useSelector(state => state.ui.notification)


  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  // 장바구니의 변화가 있을때마다 백엔드로 데이터 전송
  useEffect(() => {
    // 첫 화면 로딩시 장바구니 데이터 미전송
    if(isInitial) {
      isInitial = false
       return
    }
    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <>
      {
        notification && 
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;