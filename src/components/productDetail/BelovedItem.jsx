import { Link } from 'react-router-dom';
import BarButton from '../../ui/BarButton';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';

const BelovedItem = ({ item }) => {
  const dispatch = useDispatch();
  const { addedToBag } = useSelector((state) => state.cart);
  const { id, name, options, type } = item;
  const price = options[0].price;
  const thumbImg = options[0].images.thumbnail.default;
  const hoverImg = options[0].images.thumbnail.hover;

  const addToBag = () => {
    if (addedToBag) {
      alert('Processing your previous request. Please hold for a moment.');
      return;
    }

    dispatch(cartActions.addToCart(item));

    setTimeout(() => {
      dispatch(cartActions.resetAddedToBag());
    }, 3000);
  };

  return (
    <>
      <Link
        to={`/product/detail/${id}`}
        className="relative flex flex-col justify-between gap-[10px] cursor-pointer group"
      >
        <img className="object-cover group-hover:opacity-0 " src={thumbImg} alt={name} />
        <img className="absolute object-cover opacity-0 group-hover:opacity-100" src={hoverImg} alt={name} />
        <h2 className="text-heading3/[160%] mt-[6px] mobile:mt-0">{name}</h2>
        <p className="flex justify-between text-body3/[150%] tablet:flex-col tablet:gap-[10px] tablet:text-body3-m">
          {type}
          <span className="ml-auto tablet:ml-0">
            {options[0].size} | €{price}
          </span>
        </p>
      </Link>

      <div onClick={addToBag}>
        <BarButton type="filled" text="ADD TO BAG" className="mt-5 mobile:mt-[10px]" />
      </div>
    </>
  );
};

export default BelovedItem;
