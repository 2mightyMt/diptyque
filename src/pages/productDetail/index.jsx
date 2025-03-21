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
import ProductImg from '../../components/productDetail/ProductImg';
import { cartActions } from '../../store/modules/cartSlice';
import { Pagination } from 'swiper/modules';
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
        <div className="w-1/2 h-[100vh] overflow-y-auto snap-y snap-mandatory scrollbar-hide mobile:w-full mobile:h-[512px]">
          <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper z-0"
          >
            {options &&
              options[0].images.detail &&
              options[0].images.detail.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={`${name + idx}`} className="w-full" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="w-1/2 text-body3 mobile:w-full">
          <div className="sticky top-0 right-0 flex flex-col gap-5 p-[9.3750vw] pt-20 tablet:px-6 tablet:py-10">
            <ProductInfo productData={productData} />
          </div>
        </div>
      </div>

      <div className="pl-[50px] overflow-hidden">
        {/* Notes section */}
        {(Array.isArray(notes) || Array.isArray(keyword)) && <NotesSection />}

        {/* Best seller section */}
        <BelovedSection popularProducts={popularProducts} />
      </div>

      <div
        className={`flex fixed bottom-[1.6667vw] right-[9.3750vw] justify-center items-center w-[600px] h-[58px] bg-black text-white transition-all duration-300 ease-in opacity-0 z-0 ${addedToBag && 'opacity-100 z-10'} tablet:w-[336px]`}
      >
        <Icon name="keyboard_arrow_down" />
        ADDED TO BAG
      </div>
    </>
  );
};

export default ProductDetail;
