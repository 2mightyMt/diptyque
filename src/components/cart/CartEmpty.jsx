import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BarButton } from '../../ui';
import BestSellerItem from './BestSellerItem';
import './styles.scss';

const CartEmpty = () => {
  const { allProductData } = useSelector((state) => state.product);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (allProductData?.length) {
      const sortedData = [...allProductData].sort((a, b) => b.sales - a.sales);
      setBestSeller(sortedData.slice(0, 10));
    }
  }, [allProductData]); // Redux 상태 변경 시 업데이트

  return (
    <div>
      <div className="flex flex-col items-center gap-6 w-[300px] mx-auto pb-[80px]">
        <p className="text-heading3">Discover Your Scent</p>
        <Link to="/product" className="w-full">
          <BarButton text="CONTINUE SHOPPING" type="filled" />
        </Link>
      </div>
      <button></button>

      <Swiper slidesPerView={4.3} spaceBetween={24} className="mySwiper overflow-visible">
        {bestSeller.map((item) => (
          <SwiperSlide key={item.id}>
            <BestSellerItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CartEmpty;
