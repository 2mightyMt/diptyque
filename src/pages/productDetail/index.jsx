import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Icon from '../../ui/Icon';
import './style.scss';
import BelovedSection from '../../components/productDetail/BelovedSection';
import { categoryActions } from '../../store/modules/categorySlice';
import ProductInfo from '../../components/productDetail/ProductInfo';
import NotesSection from '../../components/productDetail/NotesSection';
import { useScroll, useSpring } from 'framer-motion';
import { cartActions } from '../../store/modules/cartSlice';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData, loading, popularProducts } = useSelector((state) => state.product);
  const { addedToBag } = useSelector((state) => state.cart);
  const { name, notes, keyword, options } = productData;

  useEffect(() => {
    if (productId) {
      dispatch(productActions.getProduct(Number(productId)));
      dispatch(productActions.getPopularProducts(Number(productId)));
    }

    return () => {
      dispatch(categoryActions.resetCategory());
      dispatch(productActions.resetProduct());
      dispatch(cartActions.resetAddedToBag());
    };
  }, [productId]);

  const { scrollYProgress } = useScroll();
  const { scrollXProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleY = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (loading) return <div>Loading . . . </div>;

  if (!options || options.length === 0) return <div>Product information not available</div>;

  return (
    <>
      <div className="flex mt-header-h min-h-screen tablet:mt-header-h-m mobile:flex-col">
        <div className="product-img-swiper-container w-1/2 mobile:w-full mobile:h-[512px]">
          <Swiper
            direction={'vertical'}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Pagination, Autoplay]}
            className="product-img-swiper mySwiper h-full mobile:hidden"
          >
            {options &&
              options[0].images.detail &&
              options[0].images.detail.map((img, idx) => (
                <SwiperSlide key={idx} className="h-full">
                  <img src={img} alt={`${name + idx}`} className="w-full h-full" />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className="product-img-swiper mySwiper h-full"
          >
            {options &&
              options[0].images.detail &&
              options[0].images.detail.map((img, idx) => (
                <SwiperSlide key={idx} className="h-full">
                  <img src={img} alt={`${name + idx}`} className="w-full h-full" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="w-1/2 text-body3 mobile:w-full">
          <div className="sticky top-0 right-0 flex flex-col gap-5 p-[9.3750vw] pt-20 tablet:px-6 tablet:py-10 mobile:px-4">
            <ProductInfo productData={productData} />
          </div>
        </div>
      </div>

      <div className="pl-[50px] overflow-hidden mobile:pl-4">
        {/* Notes section */}
        {(Array.isArray(notes) || Array.isArray(keyword)) && <NotesSection />}

        {/* Best seller section */}
        <BelovedSection popularProducts={popularProducts} />
      </div>

      <div className={`cart-added-btn ${addedToBag && 'opacity-100 z-10'}`}>
        <Icon name="keyboard_arrow_down" />
        ADDED TO BAG
      </div>
    </>
  );
};

export default ProductDetail;
