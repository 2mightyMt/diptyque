import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Icon from '../../ui/Icon';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryInfo } = useSelector((state) => state.product);
  const { title, desc } = categoryInfo;
  const { categoryName } = useParams();
  const location = useLocation();
  const path = location.pathname.split('/');

  useEffect(() => {
    if (path.length === 2) {
      navigate('/product/eauxdeparfum');
    } else if (path.length === 3) {
      dispatch(productActions.setCategory(categoryName));
    }
  }, [location.pathname]);

  return (
    <>
      {/* 카테고리 위치 상태 바 */}
      <div className="sticky top-0 left-0 z-10 flex items-center w-full h-[50px] tablet:h-11 px-[280px] tablet:px-[60px] mobile:px-4 border-t border-b border-grey-1 text-grey-3 bg-white">
        <p className="text-body3 tablet:text-body3-m">
          Products <Icon name="chevron_right" className="mx-[10px]" /> {title}
        </p>
      </div>

      {/* contents inner */}
      <div className="px-[280px] tablet:px-[60px] mobile:px-4">
        {/* 카테고리 소개 섹션 */}
        <div className="flex flex-col justify-center items-center gap-10 w-[898px] tablet:w-[498px] mobile:w-[358px] m-auto my-[280px] tablet:my-[150px] mobile:my-[100px]">
          <h1 className="text-heading1/[160%] tablet:text-heading1-m text-center">{title}</h1>
          <p className="text-body2/[160%] tablet:text-body2-m/[150%]">{desc}</p>
        </div>

        {/* 제품 리스트 */}
        <Outlet />
      </div>
    </>
  );
};

export default ProductList;
