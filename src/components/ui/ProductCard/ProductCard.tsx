'use client';
import { useEffect, useMemo, useState } from 'react';
import styles from './ProductCard.module.scss';
import type { Props } from './ProductCard.types';
import { ImgType } from '@/global/types';
import Img from '../image';
import { formatPrice } from '@/utils/price-formatter';
import Button from '../Button';
import { useCart } from 'react-use-cart';
import { courseComplexityEnum, pageUrls } from '@/global/constants';
import Link from 'next/link';

const ProductCard = ({ data, inCart = false, horizontal }: Props) => {
  const { addItem } = useCart();
  const [buttonText, setButtonText] = useState(inCart ? 'Już w koszyku' : 'Dodaj do koszyka');
  const mainVariant = useMemo(() => {
    const productData: {
      price: string;
      discount?: number;
      stock?: number;
      image?: ImgType;
      type?: 'normal' | 'variable';
      name?: string;
    } = {
      price: '',
      discount: undefined,
      stock: undefined,
      image: undefined,
      type: 'normal',
      name: data.name,
    };

    if (data.variants?.length > 0) {
      const minPrice = Math.min(...data.variants.map((variant) => variant.price));
      const maxPrice = Math.max(...data.variants.map((variant) => variant.price));

      productData['price'] = formatPrice(minPrice) + ' - ' + formatPrice(maxPrice);
      productData['stock'] = data.variants[0]!.countInStock;
      productData['image'] = data.variants[0]!.gallery;
      productData['type'] = 'variable';
    } else {
      productData['price'] = formatPrice(data!.price!);
      productData['discount'] = data!.discount;
      productData['stock'] = data!.countInStock;
      productData['image'] = data!.gallery;
    }

    return productData;
  }, [data]);

  useEffect(() => {
    if (buttonText !== 'Dodano do koszyka') setButtonText(inCart ? 'Już w koszyku' : 'Dodaj do koszyka');
  }, [inCart, buttonText]);

  return (
    <div className={`${styles['productCard']} ${horizontal ? styles['horizontal'] : ''}`}>
      <Link
        href={`${pageUrls[data.basis]}/${data.slug}`}
        className={styles['link']}
      />
      {mainVariant.image && (
        <div className={styles['image-wrap']}>
          {data.course?.complexity && (
            <span
              style={{
                color: courseComplexityEnum[data.course.complexity].color,
                backgroundColor: courseComplexityEnum[data.course.complexity].background,
              }}
              className={styles['badge']}
            >
              <span>{courseComplexityEnum[data.course.complexity].name}</span>
            </span>
          )}
          <Img
            data={mainVariant.image}
            sizes='380px'
          />
        </div>
      )}
      <div className={styles['data']}>
        <div>
          {data.course?.rating !== undefined && data.course.reviewsCount > 0 && (
            <p className={styles['rating']}>
              <Hearth />{' '}
              <span>
                <b>{data.course.rating}</b>/5 ({data.course.reviewsCount})
              </span>
            </p>
          )}
          <h3 className={styles['names']}>{mainVariant.name}</h3>
          <p
            className={styles['price']}
            dangerouslySetInnerHTML={{ __html: mainVariant.price }}
          />
        </div>
        {mainVariant.type === 'variable' ? (
          <Button href={`${pageUrls[data.basis]}/${data.slug}`}>Wybierz wariant</Button>
        ) : (
          <Button
            disabled={buttonText !== 'Dodaj do koszyka'}
            onClick={() => {
              addItem({ quantity: 1, id: data._id, price: 0 });
              setButtonText('Dodano do koszyka');
            }}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

const Hearth = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='23'
    fill='none'
  >
    <path
      stroke='#B4A29C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13.378 19.691c2.61-.846 10.89-7.363 10.615-13.27C23.7.06 18.137 1.202 15.61 3.551c-3.09 2.87-5.359 8.365-3.457 9.048 2.353.844 2.465-1.361 1.986-2.794C13.55 8.039 8.684-1.293 3.107 2.303c-6.43 4.146 3.521 13.42 7.689 18.814.56.724 1.297.884 1.356 0'
    />
  </svg>
);
