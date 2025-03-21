import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const PromotionIntro = () => {
  const [opacity, setOpacity] = useState(0);
  const introSectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  const { scrollYProgress: introScrollProgress } = useScroll({
    target: introSectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothIntroProgress = useSpring(introScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lines = ['Fragrance designed', 'for', 'every season'];

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.05, 
        duration: 0.1, 
      },
    }),
  };

  const renderLines = () => {
    let charIndex = 0;

    return (
      <>
        {lines.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className="text-center">
            {line.split('').map((char, index) => (
              <motion.span
                key={`char-${lineIndex}-${index}`}
                variants={characterVariants}
                initial="hidden"
                animate="visible"
                custom={charIndex++}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            {lineIndex < lines.length - 1 && <br />}
          </div>
        ))}
      </>
    );
  };

  const introText =
    'Experience the art of fragrance through the changing seasons—embrace the romance of spring weddings, the refreshing escape of summer, the cozy warmth of autumn, and the festive magic of winter. Each scent is crafted to capture the essence of every moment, turning memories into timeless experiences.';

  const renderIntroText = () => {
    const [renderedChars, setRenderedChars] = useState([]);

    useEffect(() => {
      const updateVisibleChars = () => {
        const progress = smoothIntroProgress.get();
        const newVisibleCount = Math.ceil(progress * introText.length * 2);

        setRenderedChars(
          introText.split('').map((char, index) => ({
            char: char === ' ' ? '\u00A0' : char,
            isVisible: index < newVisibleCount,
          }))
        );
      };

      const unsubscribe = smoothIntroProgress.onChange(updateVisibleChars);
      updateVisibleChars(); 

      return () => unsubscribe();
    }, []);

    return (
      <>
        {renderedChars.map((item, index) => (
          <span
            key={`intro-char-${index}`}
            className="inline-block"
            style={{
              opacity: item.isVisible ? 1 : '50%',
              color: item.isVisible ? '#112856' : '#ccc',
              transition: 'opacity 0.2s, color 0.3s',
            }}
          >
            {item.char}
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      <section className="w-full h-[800px] flex justify-center items-center relative tablet:h-[343px]">
        <div className="w-full text-center ">
          <h3 className="text-display1 tablet:text-heading1 mobile:text-heading2 font-diptyque text-primary mt-[110px] tablet:mt-[20px] leading-[110px] tablet:max-w-[996px] tablet:text-base/8 tabelt:line-hi mx-auto relative text-center">
            {renderLines()}
          </h3>
        </div>
        <div className="absolute bottom-0 w-full translate-y-[2%]">
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/main-full.png?raw=true"
            alt="Seasonal fragrances"
            className="w-full"
            style={{ opacity: opacity, transition: 'opacity 1.5s ease-in' }}
          />
        </div>
      </section>
      <section
        ref={introSectionRef}
        className="w-full flex justify-center items-center py-16 tablet:px-[60px] mobile:px-[16px]"
      >
        <div className="desktop:text-heading1 tablet:text-heading3 font-diptyque text-center w-[896px] items-center leading-relaxed">
          {renderIntroText()}
        </div>
      </section>
    </>
  );
};

export default PromotionIntro;
