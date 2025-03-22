import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Controller, FreeMode, Pagination } from 'swiper/modules';
import BarButton from '../../ui/BarButton';
import './style.scss';

const Service = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <div className="service-page-container w-[100vw] overflow-hidden">
      <section className="first-sec flex-col-align-box">
        <h2>Our Service Oddyssey</h2>
        <p className="max-w-[526px] tablet:max-w-[480px]">
          Diptyque takes you by the hand to guide you through your time at the Maison. Explore all our services, special
          touches and inspiration.
        </p>
      </section>

      <section className="flex-align-box engraving-sec">
        <div className="w-1/2 mobile:w-full">
          <h2>Custom engraving</h2>
          <p className="max-w-[708px] m-auto tablet:max-w-[178px] mobile:hidden">
            Initials, a first name, a memorable date… Diptyque offers you the opportunity to personalise your product
            with an engraved message. To make each piece unique, to gift or enjoy.
          </p>
        </div>
        <div className="service-sec-img-size1 bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/engraving.png')]"></div>
        <p className="hidden mobile:block mt-10">
          Initials, a first name, a memorable date… Diptyque offers you the opportunity to personalise your product with
          an engraved message. To make each piece unique, to gift or enjoy.
        </p>
      </section>

      <section className="flex-align-box">
        <h2 className="hidden mobile:block">The Gift by Diptyque</h2>
        <div className="service-sec-img-size1  overflow-hidden ">
          <video
            autoPlay
            muted
            loop
            name="media"
            src="video/giftVideo.mp4"
            type="video/mp4"
            className="object-cover"
          ></video>
        </div>
        <div className="service-sec-img-size1 gift-sec-txt flex flex-col justify-center items-start">
          <h2 className="mobile:hidden">The Gift by Diptyque</h2>
          <Swiper
            slidesPerView={2.9}
            spaceBetween={24}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper gift-sec-swiper mobile:hidden"
          >
            <SwiperSlide>
              <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/gift1.png')]" />
              <p>Origami wrapping</p>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/gift2.png')]" />
              <p>Diptyque gift box</p>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/gift3.png')]" />
              <p>Fabric gift bags</p>
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
          </Swiper>
          <div className="gift-sec-txt-mobile hidden w-full mt-10 mobile:flex">
            <div>
              <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/gift1.png')]" />
              <p>Origami wrapping</p>
            </div>
            <div>
              <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/gift2.png')]" />
              <p>Diptyque gift box</p>
            </div>
            <div>
              <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/gift3.png')]" />
              <p>Fabric gift bags</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-align-box store-sec">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Controller]}
          onSwiper={setFirstSwiper}
          controller={{ control: secondSwiper }}
          className="mySwiper store-info-swiper service-sec-img-size1"
        >
          <SwiperSlide>
            <h2>Diptyque Garosugil</h2>
            <div className="flex-col-align-box store-info-desc">
              <p>15, Garosu-gil, 06035, Seoul</p>
              <p className="mobile:hidden">+82 50 71391 7494</p>
              <p>
                <span className="hidden mobile:inline-block">+82 50 71391 7494, </span> Open - Close{' '}
                <span className="mobile:hidden">|</span> <span className="hidden mobile:inline-block">at</span> 11:00 -
                21:00
              </p>
            </div>
            <ul>
              <li>
                <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store1.png')]" />
                <p>THE DIPTYQUE GIFT BOX</p>
              </li>
              <li>
                <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store2.png')]" />
                <p>PERSONALISED ENGRAVING</p>
              </li>
              <li>
                <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store3.png')]" />
                <p>FREE RETURNS</p>
              </li>
              <li>
                <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store4.png')]" />
                <p>AFTER-SALES ADVICE</p>
              </li>
            </ul>
            <Link to="https://stores.diptyqueparis.com/en_eu/diptyque-garosugil" target="_blank">
              <BarButton type="filled" text="MORE INFORMATION" className="store-info-btn" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <h2>
              Diptyque Seongsu
              <br />
              Pop Up - Holiday
            </h2>
            <div className="flex-col-align-box gap-5 store-info-desc">
              <p>20-1, Yeonmujang-gil, 04781, Seoul</p>
              <p>Open - Close | 11:00 - 21:00</p>
            </div>
            <ul>
              <li></li>
              <li>
                <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store1.png')]" />
                <p>THE DIPTYQUE GIFT BOX</p>
              </li>
              <li>
                <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store2.png')]" />
                <p>PERSONALISED ENGRAVING</p>
              </li>
              <li></li>
            </ul>
            <Link
              to="https://stores.diptyqueparis.com/en_eu/pop-up-seongsu-diptyque-seongsu-pop-up---holiday"
              target="_blank"
            >
              <BarButton type="filled" text="MORE INFORMATION" className="store-info-btn" />
            </Link>
          </SwiperSlide>
        </Swiper>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Controller]}
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}
          className="mySwiper store-img-swiper service-sec-img-size1 store-img-mobile"
        >
          <SwiperSlide>
            <h2>Diptyque Garosugil</h2>
            <div className="store-img bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store-garosu.png')]" />
          </SwiperSlide>
          <SwiperSlide>
            <h2>
              Diptyque Seongsu
              <br />
              Pop Up - Holiday
            </h2>
            <div className="store-img bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/store-seongsu.jpg')]" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section>
        <h2>Everlasting Gifts</h2>
        <p className="max-w-[530px] m-auto tablet:max-w-[462px]">
          Our refillable products and second-life accessories can be enjoyed by their recipients for years to come… For
          endless pleasure.
        </p>
        <div className="refill-img-box w-full flex gap-6 justify-center mt-10">
          <div className="w-1/2">
            <div className="refill-img bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/everlasting1.png')]" />
            <p>Refillable Products</p>
          </div>
          <div className="w-1/2">
            <div className="refill-img bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/everlasting2.png')]" />
            <p>Refillable Fragrances</p>
          </div>
        </div>
      </section>

      <section>
        <h2>For Online Explorers</h2>
        <ul className="online-img-ul grid grid-flow-col grid-rows-1 gap-6 tablet:grid-rows-2">
          <li>
            <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/online1.png')]" />
            <p>
              Free delivery starting
              <br />
              from 99€
            </p>
          </li>
          <li>
            <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/online2.png')]" />
            <p>Free Diptyque Gift Set</p>
          </li>
          <li>
            <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/online3.png')]" />
            <p>
              Fragrances
              <br />
              Try when you Buy
            </p>
          </li>
          <li>
            <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/online4.png')]" />
            <p>
              Two Free Samples
              <br />
              with all orders
            </p>
          </li>
          <li>
            <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/online5.png')]" />
            <p>Free Returns</p>
          </li>
          <li>
            <div className="bg-[url('https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/images/service/online6.png')]" />
            <p>Welcome Gift</p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Diptyque & You</h2>
        <p>Create your Diptyque account to discover the delightful surprises the Maison has in store for you.</p>
        <Link to="/register" className="goto-register-btn">
          <BarButton type="filled" text="CREATE ACCOUNT" />
        </Link>
      </section>
    </div>
  );
};

export default Service;
