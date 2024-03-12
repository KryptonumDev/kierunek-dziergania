import type { InputState, Props, MappingProps } from './Checkout.types';
import styles from './Checkout.module.scss';
import SummaryAside from './_SummaryAside';
import PersonalData from './_PersonalData';
import { useEffect, useState } from 'react';
import Authorization from './_Authorization';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Payment from './_Payment';

const stepContent = (props: MappingProps) => ({
  1: <PersonalData {...props} />,
  2: <Authorization {...props} />,
  3: <Payment {...props} />,
});

export default function Checkout({ cart, fetchedItems, showCheckout, setShowCheckout, CrossIcon }: Props) {
  const supabase = createClientComponentClient();
  const [step, setStep] = useState(3);

  const [input, setInput] = useState<InputState>({
    firmOrder: false,
    billingDifferentThanShipping: true,
    shipping: {
      firstName: 'Tets ',
      address1: 'test',
      city: 'test',
      country: 'PL',
      postcode: '12-123',
      email: 'test@test.tes',
      phone: '123123123',
      company: '',
    },
    billing: {
      nip: '',
      firstName: 'Tets ',
      address1: 'test',
      city: 'test',
      country: 'PL',
      postcode: '12-123',
      email: 'test@test.tes',
      phone: '123123123',
      company: '',
    },
    paymentMethod: { name: 'card', title: 'Кредитная карта' },
  });

  useEffect(() => {
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setShowCheckout();
    });

    return () => removeEventListener('keydown', () => setShowCheckout());
  }, [setShowCheckout]);

  const nextStep = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let nextStep = step + 1;
    if (nextStep === 2 && session) nextStep++;

    setStep(nextStep);
  };

  return (
    <>
      <div className={`${styles['checkout']} ${showCheckout ? styles['active'] : ''}`}>
        <button
          className={styles['close']}
          onClick={setShowCheckout}
        >
          {CrossIcon}
        </button>
        <div className={styles['content']}>
          <div className={styles['main']}>
            {stepContent({ nextStep, setStep, input, setInput, cart, fetchedItems })[step as keyof typeof stepContent]}
          </div>
          <SummaryAside />
        </div>
      </div>
    </>
  );
}
