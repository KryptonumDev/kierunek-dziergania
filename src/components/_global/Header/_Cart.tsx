'use client';
import { useEffect, useMemo, useState } from 'react';
import styles from './Header.module.scss';
import { useForm } from 'react-hook-form';
import Img from '@/components/ui/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ProductCard from '@/components/ui/ProductCard';
import Checkbox from '@/components/ui/Checkbox';
import { formatPrice } from '@/utils/price-formatter';
import { formatToOnlyDigits } from '@/utils/format-to-only-digits';
import type { EmptyCart, Grid, Cart, CartForm } from './Header.types';
import PickQuantity from '@/components/ui/PickQuantity';
import { toast } from 'react-toastify';
import { calculateDiscountAmount } from '@/utils/calculate-discount-amount';
import Link from 'next/link';
import { CrochetingLogo, KnittingLogo } from '@/components/ui/Icons';
import Popup from './Popup/Popup';

export default function Cart({
  goToCheckout,
  setShowCart,
  setPopupState,
  popupState,
  showCart,
  image_crochet,
  image_knitting,
  highlighted_products,
  NavigationCrossIcon,
  PopupCrossIcon,
  VirtualCoinsCrossIcon,
  PromoCodeCrossIcon,
  cart,
  fetchedItems,
  updateItemQuantity,
  removeItem,
  virtualWallet,
  setUsedVirtualMoney,
  usedVirtualMoney,
  usedDiscount,
  setUsedDiscount,
  userId,
  ownedCourses,
}: Cart) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CartForm>();

  const [isVirtualCoins, setIsVirtualCoins] = useState<boolean>(false);
  const [isPromoCode, setIsPromoCode] = useState(false);
  const [couponVerifying, setCouponVerifying] = useState(false);
  const totalItemsCount = useMemo(() => {
    return cart?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0;
  }, [cart]);
  const totalItemsPrice = useMemo(() => {
    if (!fetchedItems) return null;
    return fetchedItems?.reduce((acc, item) => acc + (item.discount ?? item.price!) * item.quantity!, 0) ?? 0;
  }, [fetchedItems]);

  const discountCode = watch('discount');

  useEffect(() => {
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setShowCart();
    });
    return () => removeEventListener('keydown', () => setShowCart());
  }, [setShowCart]);

  useEffect(() => {
    if (usedDiscount?.discounted_product) {
      const product = cart?.find((item) => item._id === usedDiscount.discounted_product.id);

      if (!product) {
        setUsedDiscount(null);
        toast('Produkt, do którego przypisany jest kupon, został usunięty z koszyka');
      }
    }
  }, [cart, usedDiscount, setUsedDiscount]);

  useEffect(() => {
    fetchedItems?.forEach((el) => {
      if (!el.visible && el.related?._id && el._type === 'product') {
        // check is related in cart or in ownedCourses, if no, delete from cart
        if (!fetchedItems?.some((item) => item._id === el.related!._id) && !ownedCourses?.includes(el.related._id)) {
          removeItem(el._id);
          toast(`${el.name} został usunięty z koszyka, ponieważ nie posiadasz ${el.related.name}`);
        }
      }
    });
  }, [fetchedItems, ownedCourses]);

  const onSubmit = () => {
    goToCheckout();
  };

  const verifyCoupon = async () => {
    setCouponVerifying(true);
    await fetch('/api/coupon/verify', {
      method: 'POST',
      body: JSON.stringify({ code: discountCode, userId, cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast(data.error);
          return;
        }

        setUsedDiscount({
          amount: data.amount,
          code: discountCode,
          id: data.id,
          type: data.coupons_types.coupon_type,
          discounted_product: data.discounted_product,
          affiliatedBy: data.affiliation_of,
        });
      })
      .catch((error) => {
        toast(error.message);
      })
      .finally(() => setCouponVerifying(false));
  };

  function filterFetchedItems() {
    let filteredFetchItems = fetchedItems;

    const materials_linkIds = filteredFetchItems?.map((item) => item.materials_link?._id);
    const printed_manualIds = filteredFetchItems?.map((item) => item.printed_manual?._id);

    filteredFetchItems?.map((product) => {
      if (materials_linkIds?.includes(product._id)) {
        filteredFetchItems?.forEach((item) => {
          if (item.materials_link?._id === product._id) {
            item.materials_link = undefined;
          }
        });
      }
      if (printed_manualIds?.includes(product._id)) {
        filteredFetchItems?.forEach((item) => {
          if (item.printed_manual?._id === product._id) {
            item.printed_manual = undefined;
          }
        });
      }
    });

    filteredFetchItems = filteredFetchItems?.filter((item) => item.popup == true) ?? [];

    return filteredFetchItems;
  }

  const filteredFetchItems = filterFetchedItems();

  if (filteredFetchItems?.length == 0) {
    setPopupState(false);
  }

  if (fetchedItems && filteredFetchItems?.length == undefined) setPopupState(false);

  return (
    <>
      <div
        className={styles.CartWrapper}
        data-visible={!!showCart}
      >
        <div
          className={styles['Cart']}
          data-blurred={popupState}
        >
          <div className={`${styles['flex']} ${styles['CartHeader']}`}>
            <h3>Twoje produkty</h3>
            <button
              onClick={setShowCart}
              className={styles.CloseButton}
            >
              {NavigationCrossIcon}
            </button>
          </div>
          {(filteredFetchItems?.length ?? 0) > 0 && (
            <div className={styles.linkWrapper}>
              <p
                className={`link ${styles.link}`}
                onClick={() => setPopupState(!popupState)}
              >
                Pokaż materiały do kursów{' '}
              </p>
            </div>
          )}
          <div>
            {cart?.length ? (
              <CartGrid
                updateItemQuantity={updateItemQuantity}
                removeItem={removeItem}
                fetchedItems={fetchedItems}
              />
            ) : (
              <EmptyLayout
                image_crochet={image_crochet}
                image_knitting={image_knitting}
                setShowCart={setShowCart}
              />
            )}
            {cart?.length != 0 && (
              <>
                {fetchedItems && typeof totalItemsPrice === 'number' ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={cart?.length ? '' : styles['empty']}
                  >
                    <div className={styles['line']} />
                    <div className={styles['additional-info']}>
                      <div className={styles['left-side']}>
                        {isPromoCode ? (
                          <div className={styles.promoCode}>
                            <div className={styles.inputWrapper}>
                              <Input
                                label='Wpisz kod rabatowy'
                                type='text'
                                register={register('discount')}
                                errors={errors}
                              />
                              <button
                                onClick={() => {
                                  setIsPromoCode((prev) => !prev);
                                  setUsedDiscount(null);
                                  setValue('discount', '');
                                }}
                              >
                                {PromoCodeCrossIcon}
                              </button>
                            </div>
                            <button
                              disabled={couponVerifying}
                              type='button'
                              onClick={verifyCoupon}
                              className={`link ${styles.apply}`}
                            >
                              Zastosuj
                            </button>
                          </div>
                        ) : (
                          <Checkbox
                            register={register('isDiscount')}
                            label={<>Posiadam kod rabatowy</>}
                            errors={errors}
                            onChange={() => setIsPromoCode((prev) => !prev)}
                          />
                        )}
                        {virtualWallet ? (
                          <>
                            {isVirtualCoins ? (
                              <div className={styles.virtualCoins}>
                                <div className={styles.inputWrapper}>
                                  <Input
                                    label='Wpisz ile wirtualnych złotówek chcesz wykorzystać'
                                    type='text'
                                    max={virtualWallet}
                                    min={11}
                                    maxLength={virtualWallet.toString().length}
                                    register={register('virtual', {
                                      min: { value: 1, message: 'Wpisz poprawną ilość wirtualnych złotówek' },
                                      max: { value: virtualWallet, message: 'Nie masz tyle wirtualnych złotówek' },
                                      onChange: (e) => {
                                        formatToOnlyDigits(e);
                                        setUsedVirtualMoney(e.target.value);
                                      },
                                    })}
                                    errors={errors}
                                  />
                                  <div className={styles.mask}>
                                    <span className={styles.hide}>{usedVirtualMoney}</span>
                                    <span>&nbsp;/&nbsp;{virtualWallet}</span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setIsVirtualCoins((prev) => !prev);
                                      setUsedVirtualMoney(null);
                                      setValue('virtual', '');
                                    }}
                                  >
                                    {VirtualCoinsCrossIcon}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <Checkbox
                                register={register('isVirtual')}
                                label={<>Chcę wykorzystać wirtualne złotówki</>}
                                errors={errors}
                                onChange={() => setIsVirtualCoins((prev) => !prev)}
                              />
                            )}
                          </>
                        ) : null}
                      </div>
                      <div className={styles['right-side']}>
                        <p>
                          <span>
                            {totalItemsCount}{' '}
                            {totalItemsCount === 1 ? 'produkt' : totalItemsCount < 5 ? 'produkty' : 'produktów'}
                          </span>
                          <span>{formatPrice(totalItemsPrice)}</span>
                        </p>
                        {usedDiscount && (
                          <p>
                            <span>Kupon: {usedDiscount.code}</span>
                            <span>{formatPrice(calculateDiscountAmount(totalItemsPrice, usedDiscount))}</span>
                          </p>
                        )}
                        {usedVirtualMoney && usedVirtualMoney > 0 && (
                          <p>
                            <span>Wykorzystane WZ</span>
                            <span>-{formatPrice(usedVirtualMoney * 100)}</span>
                          </p>
                        )}
                        <p>
                          <span>Razem</span>
                          <span>
                            {formatPrice(
                              totalItemsPrice +
                                (usedDiscount ? calculateDiscountAmount(totalItemsPrice, usedDiscount) : 0) -
                                (usedVirtualMoney ? usedVirtualMoney * 100 : 0)
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={styles['flex']}>
                      <button
                        onClick={setShowCart}
                        type='button'
                        className='link'
                      >
                        Kontynuuj zakupy
                      </button>
                      <Button type='submit'>Zamawiam</Button>
                    </div>
                  </form>
                ) : (
                  <div className={styles['empty']}>
                    <h2 className='h1'>
                      Ładowanie <strong>koszyka</strong>
                    </h2>
                    <p>Proszę czekać...</p>
                  </div>
                )}
              </>
            )}
          </div>
          {highlighted_products && (
            <div className={styles['highlighted']}>
              <h3>
                Te produkty mogą Ci się <strong>spodobać</strong>
              </h3>
              <p>
                Sprawdź, <strong>co dla Ciebie przygotowaliśmy</strong>
              </p>
              <div className={styles['grid']}>
                {highlighted_products.map((product, i) => (
                  <ProductCard
                    key={product._id + i}
                    data={product}
                    inCart={cart?.some((item) => item.id === product._id)}
                    onClick={() => setShowCart()}
                    owned={ownedCourses?.includes(product._id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {popupState && (filteredFetchItems?.length ?? 0) > 0 && (
          <Popup
            data={filteredFetchItems}
            closeIcon={PopupCrossIcon}
            setPopupState={setPopupState}
            popupState={popupState}
            className={styles.popup}
            setShowCart={setShowCart}
          />
        )}
      </div>
    </>
  );
}

const EmptyLayout = ({ image_crochet, image_knitting, setShowCart }: EmptyCart) => {
  return (
    <div className={styles['empty']}>
      <h2 className='h1'>
        Twój koszyk jest <strong>pusty</strong>
      </h2>
      <p>Zapraszamy do zakupów 😉</p>
      <div className={styles['grid']}>
        <div>
          <Link
            href='/kursy-dziergania-na-drutach'
            onClick={() => setShowCart(false)}
            tabIndex={-1}
            className={styles.img}
            aria-label='Kursy dziergania na drutach'
          >
            <div className={styles.iconWrapper}>
              <KnittingLogo />
            </div>
            <Img
              data={image_knitting}
              sizes='(max-width: 640px) 150px, 300px'
              className={styles.image}
            />
          </Link>
          <Button
            href='/kursy-dziergania-na-drutach'
            className={styles.cta}
          >
            Kursy dziergania
          </Button>
        </div>
        <div>
          <Link
            href='/kursy-szydelkowania'
            onClick={() => setShowCart(false)}
            tabIndex={-1}
            className={styles.img}
            aria-label='Kursy szydełkowania'
          >
            <div
              className={styles.iconWrapper}
              data-crocheting='true'
            >
              <CrochetingLogo />
            </div>
            <Img
              data={image_crochet}
              sizes='(max-width: 640px) 150px, 300px'
              className={styles.image}
            />
          </Link>
          <Button
            href='/kursy-szydelkowania'
            className={styles.cta}
          >
            Kursy szydełkowania
          </Button>
        </div>
      </div>
    </div>
  );
};

const CartGrid = ({ fetchedItems, removeItem, updateItemQuantity }: Grid) => {
  if (!fetchedItems) return;

  return (
    <div className={styles['grid']}>
      {fetchedItems.map((item, i) => (
        <div
          className={styles['product']}
          key={item._id + i}
        >
          {(item.gallery || item.variant?.gallery) && (
            <Img
              data={item.gallery ?? item.variant!.gallery}
              sizes='175px'
            />
          )}
          <div>
            <h3>
              {item.name} {item.variant ? `- ${item.variant.name}` : ''}
            </h3>
            {item._type === 'product' && (
              <div>
                <div className={styles['calculator']}>
                  <PickQuantity
                    min={1}
                    max={item.countInStock ?? item.variant!.countInStock}
                    defaultValue={item.quantity!}
                    change={(count) => {
                      const productId = item.variant ? item._id + 'variant:' + item.variant._id : item._id;
                      updateItemQuantity(productId, count);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles['right-column']}>
            <div>
              <div className={styles['price']}>
                <span
                  className={item.discount ? styles['discount'] : ''}
                  dangerouslySetInnerHTML={{ __html: formatPrice(item.price!) }}
                />
                {item.discount ? <span dangerouslySetInnerHTML={{ __html: formatPrice(item.discount) }} /> : null}
              </div>
              <span className={styles['omnibus']}>
                Najniższa cena z 30 dni przed obniżką:{' '}
                <span dangerouslySetInnerHTML={{ __html: formatPrice(item.price!) }} />
              </span>
            </div>
            <button
              className={`link ${styles['remove']}`}
              onClick={() => removeItem(item.variant ? item._id + 'variant:' + item.variant._id : item._id)}
            >
              Usuń
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
