import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          'https://react-project-8d949-default-rtdb.firebaseio.com'
        )
  
        if (!response.ok) {
          throw new Error('장바구니 데이터 받아오기를 실패했습니다')
        }
  
        const data = await response.json();
  
        return data;
      };
  
      try {
        const cartData = await fetchData();
        dispatch(
          cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity,
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: '실패!',
            message: '장바구니 데이터 받아오기를 실패했습니다',
          })
        )
      }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: '전송중...',
        message: '장바구니 데이터 전송중!'
      }))
      const sendRequest = async () => {
        const response = await fetch('https://react-project-8d949-default-rtdb.firebaseio.com/cart.json/',
          { 
            method: 'PUT',
            body: JSON.stringify(cart)
          }
        )
        if (!response.ok) {
          throw new Error('장바구니 데이터 전송을 실패했습니다')
        } 
      } 
  
      try {
        await sendRequest()
        
        dispatch(uiActions.showNotification({
          status: 'success',
          title: '성공!',
          message: '장바구니 데이터 전송 완료!'
        }))
      } catch (error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            title: '실패',
            message: '장바구니 데이터 전송을 실패했습니다'
          }))
      }
    }
}