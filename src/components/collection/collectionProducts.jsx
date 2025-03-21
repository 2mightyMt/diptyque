import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCollection } from '../../store/modules/collectionSlice';
import { BarButton, Icon } from '../../ui';
import Accordion from '../../ui/Accordion';

const CollectionProducts = ({ onChangeCollection }) => {
  const dispatch = useDispatch();
  const {
    allCollectionNames,
    selectedCollection,
    allProducts: globalAllProducts,
  } = useSelector((state) => state.collection);

  // 상태 변수들
  const [expandedProducts, setExpandedProducts] = useState({});
  const [currentVisibleProduct, setCurrentVisibleProduct] = useState(null);
  const [previousProduct, setPreviousProduct] = useState(null);
  const [transitionState, setTransitionState] = useState('stable');
  const [hasScrolled, setHasScrolled] = useState(false);

  // 컬렉션별로 상품 데이터 구조화
  const [productsByCollection, setProductsByCollection] = useState({});
  // 현재 표시되는 모든 상품 목록 (현재 컬렉션 + 다음 컬렉션)
  const [displayedProducts, setDisplayedProducts] = useState([]);
  // 마지막으로 보여진 상품의 컬렉션
  const [lastVisibleCollection, setLastVisibleCollection] = useState(null);

  // 다양한 참조 변수들
  const contentRefs = useRef({});
  const productRefs = useRef({});
  const productInfoRef = useRef(null);
  const lastVisibleProductRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isInitialLoadRef = useRef(true);
  const hasManuallyChangedRef = useRef(false);
  const collectionBoundaryRefs = useRef({});

  // 현재 선택된 컬렉션의 인덱스 찾기
  const currentCollectionIndex = allCollectionNames.indexOf(selectedCollection);

  // 다음 컬렉션 이름 찾기
  const nextCollectionName =
    currentCollectionIndex < allCollectionNames.length - 1 ? allCollectionNames[currentCollectionIndex + 1] : null;

  // 제품과 컬렉션 매핑
  const productCollectionMap = useRef({});
  // 제품 ID와 객체 매핑
  const productsMap = useRef({});

  // 모든 상품을 컬렉션별로 그룹화
  useEffect(() => {
    if (globalAllProducts.length > 0) {
      // 컬렉션별 상품 그룹화
      const groupedProducts = {};

      // 모든 컬렉션 초기화
      allCollectionNames.forEach((name) => {
        groupedProducts[name] = [];
      });

      // 상품을 적절한 컬렉션에 할당
      globalAllProducts.forEach((product) => {
        let collectionName = null;

        // 컬렉션 정보 추출
        if (Array.isArray(product.collection)) {
          const collectionObj = product.collection.find((col) => col && typeof col === 'object' && col.collectionName);
          if (collectionObj) {
            collectionName = collectionObj.collectionName;
          }
        } else if (product.collection && typeof product.collection === 'object' && product.collection.collectionName) {
          collectionName = product.collection.collectionName;
        }

        // 해당 컬렉션이 있으면 상품 추가
        if (collectionName && groupedProducts[collectionName]) {
          groupedProducts[collectionName].push({ ...product });
        }
      });

      setProductsByCollection(groupedProducts);
    }
  }, [globalAllProducts, allCollectionNames]);

  // 표시할 상품 목록 업데이트 (현재 컬렉션 + 다음 컬렉션)
  useEffect(() => {
    if (selectedCollection) {
      let products = [];

      // 현재 컬렉션의 상품 추가
      if (productsByCollection[selectedCollection]) {
        products = [...productsByCollection[selectedCollection]];
      }

      // 다음 컬렉션이 있으면 해당 상품도 추가
      if (nextCollectionName && productsByCollection[nextCollectionName]) {
        products = [...products, ...productsByCollection[nextCollectionName]];
      }

      setDisplayedProducts(products);

      // 최초 로드 시 현재 상품 설정
      if (products.length > 0 && (currentVisibleProduct === null || !productsMap.current[currentVisibleProduct])) {
        setTimeout(() => {
          const firstProductId = String(products[0].id);
          setCurrentVisibleProduct(firstProductId);
          lastVisibleProductRef.current = firstProductId;
        }, 0);
      }
    }
  }, [selectedCollection, nextCollectionName, productsByCollection]);

  // 상품 맵 초기화
  useEffect(() => {
    const pMap = {};
    const cMap = {};

    displayedProducts.forEach((product) => {
      const productId = String(product.id);
      pMap[productId] = product;

      // 컬렉션 정보 추출
      let collectionName = null;

      if (Array.isArray(product.collection)) {
        const collectionObj = product.collection.find((col) => col && typeof col === 'object' && col.collectionName);
        if (collectionObj) {
          collectionName = collectionObj.collectionName;
        }
      } else if (product.collection && typeof product.collection === 'object' && product.collection.collectionName) {
        collectionName = product.collection.collectionName;
      }

      cMap[productId] = collectionName;
    });

    productsMap.current = pMap;
    productCollectionMap.current = cMap;
  }, [displayedProducts]);

  // 상품 설명 접기/펼치기 토글
  const toggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (displayedProducts.length === 0) return;

    // 현재 스크롤 위치 저장
    scrollPositionRef.current = window.scrollY;

    // 초기 로드 후 스크롤 발생 시 플래그 설정
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      setHasScrolled(true);
    }

    // 화면 중앙의 위치 계산
    const windowHeight = window.innerHeight;
    const windowMiddle = window.scrollY + windowHeight / 2;

    // 어떤 요소가 화면 중앙에 가장 가까운지 확인
    let closestProduct = null;
    let minDistance = Number.MAX_VALUE;

    // 모든 상품 체크
    Object.keys(productRefs.current).forEach((productId) => {
      const element = productRefs.current[productId];
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementMiddle = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(windowMiddle - elementMiddle);

        if (distance < minDistance) {
          minDistance = distance;
          closestProduct = productId;
        }
      }
    });

    // 가장 가까운 상품이 변경된 경우
    if (closestProduct && closestProduct !== lastVisibleProductRef.current) {
      lastVisibleProductRef.current = closestProduct;

      // 현재 상품 업데이트
      if (productsMap.current[closestProduct]) {
        setPreviousProduct(currentVisibleProduct);
        setCurrentVisibleProduct(closestProduct);

        // 애니메이션 효과
        setTransitionState('fadeOut');
        requestAnimationFrame(() => {
          setTransitionState('changing');
          requestAnimationFrame(() => {
            setTransitionState('fadeIn');
          });
        });

        // 현재 상품의 컬렉션 확인
        const productCollectionName = productCollectionMap.current[closestProduct];

        // 컬렉션이 변경된 경우 (사용자가 수동으로 변경하지 않은 경우에만)
        if (
          productCollectionName &&
          productCollectionName !== lastVisibleCollection &&
          !hasManuallyChangedRef.current
        ) {
          // 컬렉션이 변경되었음을 저장
          setLastVisibleCollection(productCollectionName);

          // Redux 상태 업데이트
          if (productCollectionName !== selectedCollection) {
            dispatch({
              type: 'collection/updateSelectedCollectionOnly',
              payload: productCollectionName,
            });

            // 부모 컴포넌트에 변경 알림
            if (onChangeCollection) {
              onChangeCollection(productCollectionName);
            }
          }
        }
      }
    }
  };

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayedProducts, selectedCollection]);

  // 컬렉션 변경 시 해당 컬렉션의 첫 상품으로 스크롤
  useEffect(() => {
    if (
      selectedCollection &&
      productsByCollection[selectedCollection] &&
      productsByCollection[selectedCollection].length > 0 &&
      !isInitialLoadRef.current
    ) {
      // 수동 변경 플래그 설정
      hasManuallyChangedRef.current = true;

      // 선택된 컬렉션의 첫 상품 찾기
      const firstProduct = productsByCollection[selectedCollection][0];

      if (firstProduct) {
        const productId = String(firstProduct.id);
        const element = productRefs.current[productId];

        if (element) {
          // 해당 요소로 스크롤
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // 현재 상품 업데이트
          setCurrentVisibleProduct(productId);
          lastVisibleProductRef.current = productId;

          // 플래그 초기화 타이머
          setTimeout(() => {
            hasManuallyChangedRef.current = false;
          }, 1000);
        }
      }
    }
  }, [selectedCollection, productsByCollection]);

  // 현재 상품 객체 찾기
  const currentProduct = currentVisibleProduct
    ? productsMap.current[currentVisibleProduct]
    : displayedProducts.length > 0
      ? displayedProducts[0]
      : null;

  // 상품이 없으면 로딩 표시
  if (!displayedProducts || displayedProducts.length === 0) {
    return <div className="p-4">상품을 불러오는 중...</div>;
  }

  // 트랜지션 클래스 결정
  const getTransitionClass = () => {
    if (!hasScrolled) {
      return 'transform translate-x-0 opacity-100';
    }

    switch (transitionState) {
      case 'fadeOut':
        return 'transform translate-x-[-80px] opacity-0';
      case 'changing':
        return 'transform translate-x-[80px] opacity-0';
      case 'fadeIn':
      case 'stable':
        return 'transform translate-x-0 opacity-100';
      default:
        return 'transform translate-x-0 opacity-100';
    }
  };

  // 기존 코드에서 태블릿 그리드 관련 부분만 수정

  // 오른쪽 섹션을 태블릿에서 숨기기 위한 코드 수정

  return (
    <div className="product-container">
      <div className="flex flex-col md:flex-row relative">
        {/* 왼쪽: 상품 이미지 (스크롤 될 부분) - 태블릿에서는 전체 너비 차지 */}
        <div className="md:w-1/2 tablet:w-full">
          <div className="space-y-12">
            {/* 현재 컬렉션의 상품 렌더링 - 태블릿에서 그리드로 표시 */}
            {selectedCollection && productsByCollection[selectedCollection] && (
              <div
                className="collection-group tablet:grid tablet:grid-cols-2 tablet:gap-6"
                data-collection={selectedCollection}
              >
                {productsByCollection[selectedCollection].map((product, index) => (
                  <div
                    key={product.id}
                    ref={(el) => {
                      if (el) {
                        productRefs.current[String(product.id)] = el;

                        // 첫 번째 상품은 컬렉션 경계로 표시
                        if (index === 0) {
                          collectionBoundaryRefs.current[selectedCollection] = el;
                        }
                      }
                    }}
                    data-product-id={String(product.id)}
                    data-collection={selectedCollection}
                    className="mb-12 tablet:mb-6"
                  >
                    {product.options && product.options[0]?.images?.thumbnail?.default && (
                      <div className="tablet:flex tablet:flex-col tablet:items-center">
                        <img
                          src={product.options[0].images.thumbnail.default}
                          alt={product.name}
                          className="w-full h-[803px] tablet:h-[263px] tablet:w-auto mobile:h-[225px] object-contain mx-auto"
                        />
                        <div className="hidden tablet:block tablet:mt-3 tablet:text-center">
                          <h4 className="text-body1 tablet:text-body2">{product.name}</h4>
                          <p className="text-body3 text-darkgrey-3">{product.options[0].price} €</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 다음 컬렉션의 상품 렌더링 - 태블릿에서 그리드로 표시 */}
            {nextCollectionName && productsByCollection[nextCollectionName] && (
              <div
                className="collection-group tablet:grid tablet:grid-cols-2 tablet:gap-4"
                data-collection={nextCollectionName}
              >
                {productsByCollection[nextCollectionName].map((product, index) => (
                  <div
                    key={product.id}
                    ref={(el) => {
                      if (el) {
                        productRefs.current[String(product.id)] = el;

                        // 첫 번째 상품은 컬렉션 경계로 표시
                        if (index === 0) {
                          collectionBoundaryRefs.current[nextCollectionName] = el;
                        }
                      }
                    }}
                    data-product-id={String(product.id)}
                    data-collection={nextCollectionName}
                    className="mb-12 tablet:mb-6"
                  >
                    {product.options && product.options[0]?.images?.thumbnail?.default && (
                      <div className="tablet:flex tablet:flex-col tablet:items-center">
                        <img
                          src={product.options[0].images.thumbnail.default}
                          alt={product.name}
                          className="w-full h-[803px] tablet:h-[250px] tablet:w-auto object-contain mx-auto"
                        />
                        <div className="hidden tablet:block tablet:mt-3 tablet:text-center">
                          <h4 className="text-body1 tablet:text-body2">{product.name}</h4>
                          <p className="text-body3 text-darkgrey-3">{product.options[0].price} €</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 상품 정보 (고정된 위치) - 태블릿에서는 숨김 */}
        <div className="relative tablet:hidden">
          {/* 상품 정보 컨테이너 */}
          <div
            ref={productInfoRef}
            className="md:w-[500px] ml-[90px] h-[800px] inline-grid sticky"
            style={{ position: 'sticky', top: '10vh', zIndex: 10 }}
          >
            {/* PC에서만 보이는 상세 정보 */}
            {currentProduct && (
              <div
                key={currentProduct.id}
                className={`space-y-5 transition-all duration-500 ease-in-out ${getTransitionClass()}`}
              >
                {/* 기존 PC 상세 내용 유지 */}
                <h3 className="font-diptyque lg:text-heading1 md:text-heading3 h-[58px]">{currentProduct.name}</h3>
                <div className="flex place-content-between">
                  <div className="text-darkgrey-3 text-body3">{currentProduct.type}</div>

                  {currentProduct.options && currentProduct.options.length > 0 && (
                    <div className="flex text-body3 text-darkgrey-3">
                      <div>{currentProduct.options[0].price} €</div>
                      <div className="mx-1">|</div>
                      <div>{currentProduct.options[0].size}</div>
                    </div>
                  )}
                </div>
                <div className="text-body3 border-solid border-b-[1px] w-full bg-slate-400 border-darkgrey-3"></div>
                <div className="text-body3 text-grey-4 mb-4">{currentProduct.notes}</div>

                <div className="relative mb-4">
                  {/* 전체 설명 컨테이너 */}
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[currentProduct.id] = el;
                    }}
                    className="text-body3 text-darkgrey-1 overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: expandedProducts[currentProduct.id]
                        ? `${contentRefs.current[currentProduct.id]?.scrollHeight}px`
                        : '3em', // 약 1.5줄
                    }}
                  >
                    <p className="m-0">{currentProduct.description}</p>
                  </div>

                  {/* ...more 버튼 (접혀있을 때만 표시) */}
                  {!expandedProducts[currentProduct.id] && (
                    <div className="absolute bottom-0 right-0 bg-white pl-1 text-body3 text-darkgrey-1">
                      ...{' '}
                      <button
                        onClick={() => toggleDescription(currentProduct.id)}
                        className="text-darkgrey-3 underline"
                      >
                        more
                      </button>
                    </div>
                  )}

                  {/* Less 버튼 (펼쳐져 있을 때만 표시) */}
                  {expandedProducts[currentProduct.id] && (
                    <button
                      onClick={() => toggleDescription(currentProduct.id)}
                      className="text-body3 text-darkgrey-3 underline transition-opacity duration-500 ease-in-out"
                    >
                      Less
                    </button>
                  )}
                </div>

                <div className="space-y-[10px]">
                  <div>Free Returns</div>
                  <div>2 free samples of your choice with every order</div>
                </div>

                <div>
                  <Accordion
                    title="Directions for use"
                    content="After washing your hair, rinse with cold water to strengthen the capillary fibres. This will help your hair absorb the Hair mist more effectively."
                  />
                  <Accordion
                    title="Ingredients"
                    content="alcohol denat. (sd alcohol 40-b), aqua (water), parfum (fragrance),
                      peg-40 hydrogenated castor oil, coco-caprylate/caprate, ethylhexyl methoxycinnamate, limonene, 
                      camellia oleifera seed oil, ethylhexyl salicylate, butyl methoxydibenzoylmethane, linalool, 
                      alpha-isomethyl ionone, farnesol, geraniol, citral, bht, tocopherol"
                  />
                </div>

                <div className="absolute bottom-0 w-full space-y-5">
                  {/* 상세페이지 이동 버튼 */}
                  <Link
                    to={`/product/detail/${currentProduct.id}`}
                    className="text-body2 flex place-content-between h-[50px] cursor-pointer items-center"
                  >
                    <div className="text-body3">Detail Page</div>
                    <div>
                      <Icon name="north_east" size={20} />
                    </div>
                  </Link>

                  {/* 장바구니 버튼 */}
                  <BarButton text="ADD TO BAG" type="filled" className="text-body3" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProducts;
