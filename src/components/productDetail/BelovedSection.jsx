import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import BelovedItem from './BelovedItem';

const BelovedSection = ({ popularProducts }) => {
  return (
    <div className="w-full mb-[12.5rem] beloved-sec">
      <h2 className="detail-sec-title">Our most beloved</h2>
      <Swiper
        breakpoints={{
          390: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3.2, spaceBetween: 24 },
          1024: { slidesPerView: 4.2, spaceBetween: 24 },
        }}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {popularProducts.map((item) => (
          <SwiperSlide
            key={item.id}
            className="max-w-[437px] max-h-[642px] tablet:max-w-[200px] tablet:max-h-[423px] mobile:max-w-[171px] mobile:max-h-[358px]"
          >
            <BelovedItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BelovedSection;
