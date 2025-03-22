import Accordion from '../../ui/Accordion';
import BarButton from '../../ui/BarButton';
import { useDispatch, useSelector } from 'react-redux';
import SelectOption from './SelectOption';
import { cartActions } from '../../store/modules/cartSlice';
import { useEffect, useState } from 'react';

const ProductInfo = ({ productData }) => {
  const dispatch = useDispatch();
  const { engravingTxt } = useSelector((state) => state.product);
  const { addedToBag } = useSelector((state) => state.cart);
  const [clickedMore, setClickedMore] = useState(false);

  const { name, type, notes, keyword, description, story, options } = productData;

  const maxChars = 166;
  const [desc, setDesc] = useState('');

  useEffect(() => {
    let result = description;

    if (description.length > maxChars) {
      result = description.substring(0, maxChars - 3) + '...';
    } else return;

    setDesc(result);
  }, [description]);

  const addToBag = () => {
    if (addedToBag) {
      alert('Processing your previous request. Please hold for a moment.');
      return;
    }

    const updatedProductData = engravingTxt ? { ...productData, engraving: engravingTxt } : productData;

    dispatch(cartActions.addToCart(updatedProductData));

    setTimeout(() => {
      dispatch(cartActions.resetAddedToBag());
    }, 3000);
  };

  return (
    <>
      <h1 className="mb-0 text-left detail-sec-title tablet:text-heading2-m">{name}</h1>
      <div className="flex flex-col gap-5 text-body3">
        <p className="flex justify-between items-center">
          {type}
          <span>
            {options[0].size} {typeof options[0].size === 'number' && 'ml'} | €{options[0].price}
          </span>
        </p>
        <hr className="border-none h-[.0625rem] bg-darkgrey-3" />
        <p className="text-grey-4">
          {notes !== undefined &&
            Array.isArray(notes) &&
            notes.map((note, idx) => (notes.length - 1 === idx ? `${note.note}` : `${note.note}, `))}
          {notes !== undefined && typeof notes === 'string' && `${notes}`}
          {keyword !== undefined &&
            Array.isArray(keyword) &&
            keyword.map((word, idx) => (keyword.length - 1 === idx ? `${word.note}` : `${word.note}, `))}
          {keyword !== undefined && typeof keyword === 'string' && `${keyword}`}
        </p>
        <p className="text-darkgrey-1">
          {clickedMore && desc.length > 0 ? `${description} ` : desc}
          <span>
            <span
              onClick={() => {
                setClickedMore(!clickedMore);
              }}
              className="underline cursor-pointer"
            >
              {clickedMore ? 'less' : 'more'}
            </span>
          </span>
        </p>
      </div>

      {/* 각인 선택 */}
      {type === 'Eau de parfum' || type === 'Eau de toilette' ? <SelectOption /> : <></>}

      {/* 아코디언 : 상세정보 */}
      <div>
        <Accordion title="Story" content={story} />
        <Accordion
          title="Ingredients"
          content="alcohol denat., parfum (fragrance), aqua (water), coumarin, linalool, ethylhexyl methoxycinnamate, alpha-isomethyl ionone, limonene, ethylhexyl salicylate, geraniol, butyl methoxydibenzoylmethane, cinnamyl alcohol, farnesol, citral"
        />
      </div>

      <div onClick={addToBag} className="add-cart-btn">
        <BarButton type="filled" text="ADD TO BAG" />
      </div>
    </>
  );
};

export default ProductInfo;
