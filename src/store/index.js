import { configureStore } from '@reduxjs/toolkit';
import cart from './modules/cartSlice';
import collection from './modules/collectionSlice';
import guestOrder from './modules/guestOrderSlice';
import maison from './modules/maisonSlice';
import member from './modules/memberSlice';
import mypage from './modules/mypageSlice';
import payment from './modules/paymentSlice';
import product from './modules/productSlice';
import promotion from './modules/promotionSlice';
import searchResult from './modules/searchResultSlice';
import service from './modules/serviceSlice';

const store = configureStore({
  reducer: {cart,collection,guestOrder,maison,member,mypage,payment,product,promotion,searchResult,service},
});

export default store;
