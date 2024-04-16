import Link from 'next/link';
import sanityFetch from '@/utils/sanity.fetch';
import styles from './Footer.module.scss';
import type { QueryProps } from './Footer.types';
import { Facebook, Instagram, Youtube } from '@/components/ui/Icons';

const Footer = async () => {
  const { facebook, instagram, youtube }: QueryProps = await query();
  const socials = [
    {
      name: 'Facebook',
      url: facebook,
      icon: <Facebook />,
    },
    {
      name: 'Instagram',
      url: instagram,
      icon: <Instagram />,
    },
    {
      name: 'YouTube',
      url: youtube,
      icon: <Youtube />,
    },
  ];

  return (
    <footer className={styles['Footer']}>
      <div className='max-width'>
        <Link
          href='/'
          aria-label='Strona główna'
          className={styles.logo}
        >
          <Logo />
        </Link>
        <ul className={styles.socials}>
          {socials.map((social, i) => (
            <li key={i}>
              <a
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copyrights}>
          Ⓒ Stworzone przez{' '}
          <a
            href='https://kryptonum.eu/pl'
            className='link'
          >
            Kryptonum
          </a>
        </p>
        <div className={styles.legal}>
          <Link href='/polityka-prywatnosci'>Polityka prywatności</Link>
          <Link href='/regulamin'>Regulamin</Link>
          {/* <Link href='/zarzadzaj-ciasteczkami'>Zarządzaj ciasteczkami</Link> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const query = async (): Promise<QueryProps> => {
  const data = await sanityFetch({
    query: /* groq */ `
      *[_id == 'global'][0] {
        facebook,
        instagram,
        youtube,
      }`,
    tags: ['global'],
  });
  return data as QueryProps;
};

const Logo = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='283'
    height='115'
    fill='none'
    viewBox='0 0 283 115'
  >
    <path
      fill='#53423C'
      d='M179.216 15.06l.022-.072c.841-3.261.256-5.934-1.216-7.909-.655-.88-1.486-1.6-2.416-2.178v-.007c-.057-.039-.121-.071-.185-.107-.086-.05-.172-.1-.261-.146a20.52 20.52 0 00-4.188-1.821c-1.293-.745-2.84-1.315-4.658-1.654-3.864-.724-6.762-.125-8.822 1.315-1.96 1.369-3.09 3.443-3.617 5.67-.029.04-.061.08-.093.119-2.085 2.83-3.101 6.305-2.541 9.644.017.1.039.204.06.303-5.414 2.185-14.781 4.534-25.121 4.474 1.875-.553 4.288-1.544 5.347-3.183.517-.799.656-1.658.413-2.556-.274-1.023-.855-1.322-1.294-1.397-2.334-.389-6.294 5.165-7.452 6.879a.539.539 0 00-.072.167c-8.119-.427-16.648-2.445-24.215-7.235a.535.535 0 00-.574.902 45.021 45.021 0 009.064 4.384c0 .064 0 .124.021.189.62 1.974 2.823 8.433 5.168 8.729.057.007.118.01.179.01.427 0 .976-.192 1.461-.98.488-.791.602-1.654.335-2.566-.503-1.729-2.27-3.265-3.828-4.33 5.289 1.468 10.686 2.049 15.829 2.049 10.272 0 19.546-2.314 24.996-4.491.859 2.844 2.937 5.464 6.473 7.36 5.799 3.108 10.806 2.641 14.513.87 3.654-1.743 6.056-4.759 6.676-6.812v-.018l.007-.007a8.774 8.774 0 00-.014-5.596h.003zm-48.84 1.536c.032 0 .064 0 .096.007.189.032.335.239.438.62.161.602.071 1.155-.281 1.697-.995 1.536-3.707 2.527-5.789 3.018 2.256-3.111 4.548-5.342 5.536-5.342zm-16.842 9.73c.179.617.107 1.176-.217 1.704-.207.335-.406.492-.599.467-.934-.118-2.552-2.98-3.86-6.726 1.854 1.07 4.167 2.798 4.676 4.555zm61.11-20.776c.085.046.167.093.253.143.894.527 1.675 1.197 2.281 2.01 1.076 1.443 1.636 3.368 1.29 5.767a9.082 9.082 0 00-.513-.752 8.876 8.876 0 00-1.74-1.679c-.167-1.81-.734-3.564-1.785-5.097a10.97 10.97 0 00-.606-.791c.281.121.559.253.823.395l-.003.004zm-6.01 17.066c-4.206.05-8.647-1.786-11.017-3.237-1.041-.638-1.982-2.16-2.541-4.173a13.209 13.209 0 01-.289-1.305 4.892 4.892 0 01.888-1.593c.741-.898 1.892-1.679 3.557-2.22-.036.1-.072.195-.104.295-1.169 3.572-.78 5.874.588 7.26 1.323 1.337 3.404 1.636 5.176 1.636 3.828 0 6.405-2.637 7.367-5.04.474-1.183.606-2.437.157-3.328a1.874 1.874 0 00-1.055-.934c1.586.406 2.848.97 3.842 1.632a12.04 12.04 0 01-.071 2.057c-.389 3.297-2.032 6.544-4.423 8.754-.674.12-1.366.188-2.071.196h-.004zm.488 1.033a9.853 9.853 0 01-3.026 1.32c-2.345.562-4.744-.087-6.764-1.437-2.025-1.351-3.625-3.372-4.367-5.457a9.508 9.508 0 01-.206-.67c.588 1.265 1.372 2.302 2.309 2.876 2.474 1.511 7.111 3.443 11.58 3.39.157 0 .318-.011.474-.018v-.004zm-5.585-9.901c.057.306.257.52.474.66.211.135.478.227.767.288a.527.527 0 10.224-1.03 1.482 1.482 0 01-.388-.129c.05-.074.149-.185.324-.324.734-.588 2.342-1.358 4.812-2.163.556-.182.944-.182 1.201-.107a.82.82 0 01.524.442c.249.495.235 1.393-.193 2.463-.841 2.102-3.086 4.376-6.387 4.376-1.728 0-3.418-.306-4.423-1.322-.959-.97-1.454-2.77-.335-6.19.11-.336.235-.657.378-.967 1.066-.232 2.295-.381 3.71-.42 2.652-.079 4.833.128 6.63.53-.432-.042-.909.022-1.426.193-2.481.81-4.252 1.629-5.143 2.342a2.505 2.505 0 00-.556.584c-.136.207-.239.474-.182.774h-.011zm12.639.043c.054-.45.082-.899.089-1.348.325.3.61.61.859.927.432.556.756 1.14.991 1.736-.798 2.812-2.124 4.648-3.717 5.795a8.324 8.324 0 01-1.686.93c1.882-2.27 3.122-5.157 3.461-8.04h.003zm-4.569-9.3a9.055 9.055 0 011.953 2.053c.777 1.13 1.265 2.41 1.497 3.754-2.409-1.344-5.906-2.164-10.867-2.021a22.358 22.358 0 00-3.026.281c2.259-3.454 6.604-4.758 10.443-4.063v-.004zm-13.509-1.154c1.658-1.159 4.031-1.754 7.339-1.259a15.215 15.215 0 00-9.688 4.007c.564-1.087 1.33-2.036 2.349-2.748zm-3.265 5.357a3.1 3.1 0 00.022-.093c2.89-3.721 7.848-6.212 13.622-5.29-3.493.314-6.929 2.096-8.704 5.532-2.266.574-3.877 1.547-4.911 2.798a6.54 6.54 0 00-.285.371 13.597 13.597 0 01.253-3.322l.003.004zm23.4 11.64v.011l-.007.01c-.51 1.715-2.677 4.538-6.127 6.185-3.411 1.629-8.063 2.1-13.562-.848-3.835-2.057-5.749-4.955-6.252-7.956-.396-2.374.086-4.85 1.251-7.086a15.617 15.617 0 00.171 3.198c-.417 1.472-.274 3.065.264 4.58.823 2.316 2.577 4.516 4.776 5.984 2.203 1.469 4.897 2.231 7.595 1.583 1.807-.435 3.447-1.355 4.851-2.592 1.355-.281 2.652-.805 3.821-1.65 1.472-1.062 2.702-2.616 3.568-4.765a7.646 7.646 0 01-.353 3.34l.004.006zM18.061 62.497h-1.233v16.92h1.233v-16.92zm27.209 9.124a6.75 6.75 0 001.996-.502 5.296 5.296 0 001.507-.991 4.18 4.18 0 00.97-1.412 4.522 4.522 0 00.335-1.771c0-1.458-.481-2.563-1.447-3.311-.966-.756-2.424-1.137-4.377-1.137h-4.316v16.92h1.218v-7.653h2.214c.328 0 .567.035.716.107.16.07.307.196.442.37l5.418 6.865c.089.11.175.193.264.239a.76.76 0 00.335.071h1.065L45.786 72.1c-.15-.2-.324-.36-.513-.478h-.003zm-1.173-.766h-2.94v-7.389h3.097c1.508 0 2.655.292 3.443.873.788.581 1.183 1.476 1.183 2.68 0 .592-.107 1.12-.324 1.59-.214.47-.531.874-.945 1.209-.406.335-.909.595-1.507.777-.592.174-1.258.263-2.01.263l.003-.003zM4.27 70.9a1.272 1.272 0 00-.442-.227c.143-.057.27-.129.381-.214.122-.09.257-.21.407-.37l7.388-7.593h-.99a.928.928 0 00-.407.082 1.2 1.2 0 00-.345.264l-6.83 7.018c-.089.09-.17.16-.25.214a1.241 1.241 0 01-.263.143 1.42 1.42 0 01-.3.07c-.11.008-.242.012-.395.012H1.22v-7.835H0V79.41h1.219v-8.155h1.087c.193 0 .35.01.478.035a.848.848 0 01.324.097.841.841 0 01.25.157c.07.064.153.138.238.228l7.165 7.317c.096.096.188.175.274.239.089.057.235.082.442.082h.99l-7.794-8.13a2.213 2.213 0 00-.407-.382l.004.004zm20.222 8.516h10.14V78.4h-8.907v-7.053h7.414v-.995h-7.414v-6.84h8.907v-1.015h-10.14v16.92zm88.434-8.13a2.215 2.215 0 00-.406-.382 1.265 1.265 0 00-.442-.228c.143-.057.271-.128.381-.214.118-.089.257-.21.407-.37l7.388-7.592h-.99a.93.93 0 00-.407.082 1.212 1.212 0 00-.346.264l-6.829 7.018c-.089.089-.171.16-.249.213a1.268 1.268 0 01-.264.143 1.422 1.422 0 01-.299.071 6.37 6.37 0 01-.396.011h-1.005v-7.834h-1.219v16.944h1.219v-8.155h1.087c.193 0 .353.01.478.036a.846.846 0 01.324.096c.096.04.178.093.25.157.071.064.153.139.238.228l7.164 7.317c.097.097.189.175.275.24.089.056.235.081.442.081h.991l-7.799-8.13.007.004zm-46.211 1.672c0 .787-.12 1.525-.36 2.213a5.104 5.104 0 01-1.016 1.768 4.67 4.67 0 01-1.64 1.183c-.637.278-1.364.42-2.177.42s-1.543-.142-2.188-.43a4.715 4.715 0 01-1.626-1.184 5.374 5.374 0 01-1.015-1.768 6.86 6.86 0 01-.346-2.213v-10.45h-1.23V72.96c0 .934.146 1.807.442 2.62a6.352 6.352 0 001.269 2.117 6.004 6.004 0 002.021 1.412c.798.342 1.69.513 2.68.513.991 0 1.879-.171 2.666-.513a5.799 5.799 0 002.021-1.412 6.318 6.318 0 001.28-2.117 7.597 7.597 0 00.442-2.62V62.497h-1.22V72.96l-.003-.003zm26.09 6.458h10.14V78.4h-8.907v-7.053h7.414v-.995h-7.414v-6.84h8.907v-1.015h-10.14v16.92zm-7.056-2.726c0 .224.01.452.035.694l-10.953-14.66a.475.475 0 00-.203-.178.605.605 0 00-.264-.046h-.598v16.92h1.065V65.177c0-.218-.01-.442-.035-.681l11.002 14.685c.111.16.26.239.442.239h.585V62.5h-1.076v14.193-.004zm88.245-12.85c.36 0 .659-.3.659-.66 0-.117.538-1.375 1.194-2.39.178-.24.061-.6-.178-.838a.756.756 0 00-.895.239c-.36.538-1.376 2.33-1.376 2.99 0 .36.3.66.599.66h-.003zm85.605 0c.36 0 .659-.3.659-.66 0-.117.538-1.375 1.194-2.39.178-.24.061-.6-.178-.838a.761.761 0 00-.898.239c-.36.538-1.376 2.33-1.376 2.99 0 .36.299.66.599.66zm22.226 4.423a.627.627 0 00-.837.239c-3.468 5.143-6.758 8.19-8.729 8.19h-.121c-.599-.117-1.255-.477-1.676-1.315-.538-.777-.716-1.554-.955-2.452 1.194-.477 2.57-1.793 2.869-4.006.239-1.493-.117-2.809-1.076-3.29-.599-.3-1.194-.178-1.732.36-.492.528-.902 1.454-1.155 2.566a81.74 81.74 0 01-3.732 5.03c-3.646 4.605-4.783 4.783-4.961 4.783-.539-.06-.956-.956-1.077-2.691-.06-1.733.121-3.885.239-5.92 0-.539.061-1.138.061-1.676v-.014c.178-.164.356-.32.534-.467.3-.121.36-.538.121-.837-.178-.24-.538-.3-.837-.122-1.437 1.077-2.869 2.87-4.245 4.484-.478.599-.898 1.137-1.376 1.732-.478.478-.898 1.016-1.315 1.437-.955.837-1.675 1.315-2.271 1.194-1.137-.121-1.194-2.513-1.315-4.484-.239-2.57-.599-5.26-2.452-5.321-1.315 0-2.392 1.432-3.407 4.184-.36.838-.599 1.675-.838 2.63 0-2.27-.239-4.662-.838-6.397-.178-.36-.538-.478-.898-.36-.299.178-.417.42-.36.777.371.848.578 1.928.685 3.08-.296.473-.646 1.054-.998 1.521a33.297 33.297 0 01-1.554 2.812c-.599.838-1.194 1.732-1.793 2.513-1.194 1.493-2.453 2.27-3.647 2.032-1.675-.478-2.213-3.108-2.213-6.459 0-2.27.239-4.783.538-7.175.061-.299-.178-.598-.477-.659-.36-.06-.66.121-.717.478-.178.655-.299 1.436-.417 2.152-.716 4.306-1.974 10.465-3.707 11.541-.178.24-.36.24-.538.179-.599-.178-.955-1.376-.955-3.169 0-1.194.178-2.751.599-4.423.837-3.35 1.914-4.783 2.274-4.605.417.06.239.898.239.898-.061.36.121.66.477.716.3.122.656-.117.717-.477.178-.656.178-2.092-1.137-2.392-.553-.15-1.911.04-3.144 3.336-2.538 1.978-5.354 5.1-8.059 8.861v-4.783c0-4.067-.117-6.22-.777-6.876-.239-.178-.417-.299-.656-.299-.777.121-1.315 1.436-2.152 4.423-.838 2.87-1.914 6.576-3.23 7.175-.238.121-.417.121-.656 0-.477-.178-.777-1.315-.777-2.93 0-1.137.122-2.57.478-4.127.898-3.768 2.153-5.682 2.812-5.682.777 0 .717.838.717 1.555 0 .36.299.659.659.659.36 0 .656-.3.599-.66-.178-2.452-1.077-2.808-1.975-2.808-.898 0-1.732.837-2.513 2.153-.538 1.254-1.137 2.812-1.493 4.484-.299 1.436-.599 3.05-.599 4.483 0 1.914.478 3.468 1.615 3.946.538.239 1.137.239 1.732 0 .898-.417 1.615-1.615 2.214-3.051.655-1.436 1.137-3.23 1.614-4.9.3-1.077.656-2.332.955-3.052.118.599.118 1.675.239 3.051v6.459c0 .776-.121 1.675-.121 2.57a92.595 92.595 0 00-5.5 9.505c-4.544 9.028-6.757 17.162-6.038 21.824.36 2.153 1.376 3.589 3.051 4.127.417.061.838.239 1.255.239.777 0 1.494-.299 2.213-.777 5.86-4.184 6.277-25.652 6.277-31.928 0-.898 0-1.733.061-2.63 2.374-3.558 4.947-6.666 7.392-8.85l-.018.06c-.36 1.493-.538 3.23-.538 4.722 0 2.153.478 4.007 1.853 4.367h.417c.417 0 .777-.06 1.137-.3 1.316-.837 2.271-3.229 2.87-5.977.238 3.646 1.197 5.62 3.108 6.22 1.732.417 3.289-.66 4.665-2.214.717-.777 1.376-1.732 2.032-2.751.599-1.016 1.194-1.914 1.675-2.93l.014-.022v.022c.122 1.914 0 3.828-.117 5.022v.599c0 .36 0 .837.598.898h.061c.417 0 .538-.36.717-.777.06-.3.121-.656.299-1.077.36-1.493.898-4.006 1.793-6.159 1.194-3.229 1.974-3.407 2.153-3.407 1.076.121 1.076 2.27 1.254 4.245 0 .66.178 1.315.178 1.854.061.655.179 1.254.417 1.732.3 1.076.838 1.853 1.914 2.031.956.121 1.975-.538 2.93-1.376.538-.416 1.016-1.015 1.437-1.553 1.315-1.437 2.391-2.87 3.589-4.245.082-.09.16-.172.242-.257v.438a39.936 39.936 0 00-.239 4.484c0 .777 0 1.436.061 2.092.178 1.793.716 3.108 2.092 3.23h.121c2.071 0 6.22-5.415 8.416-8.533v.043c0 1.675.36 3.467 1.254 4.96.599 1.138 1.615 1.794 2.752 1.794h.121c3.646.06 8.073-6.099 9.805-8.669a.76.76 0 00-.239-.898l-.014.018zM214.3 82.075c0 13.034-1.554 27.982-5.738 30.912-.716.538-1.493.66-2.331.36-1.137-.36-1.975-1.376-2.213-3.168-1.016-6.099 3.945-18.716 10.282-28.76v.656zm56.166-15.248c.121-.121.178-.121.178-.121h.061c.299.12.598.898.477 1.974-.178 1.194-.837 2.452-1.793 2.99-.178-2.152.417-4.127 1.077-4.843zM149.814 44.108c-3.885-1.015-8.729 5.92-11.72 15.605.061-1.675.122-3.23.122-4.545 0-3.168-.239-5.321-1.137-6.22-.3-.238-.656-.416-1.077-.416-.299 0-.538.36-.477.66 0 .36.299.658.659.598l.061.06c.538.539.777 2.57.777 5.383 0 2.99-.239 6.875-.478 10.703-1.198 4.484-2.99 9.328-4.067 12.974-.121.3.239.538.538.66.36 0 .656-.24.656-.6.121-1.015 1.975-6.159 2.57-8.49-.299 4.067-.898 11.66-.955 13.933-.121-.121-.36-.178-.417-.3-.36-.117-.717-.06-.838.179-.239.36-.178.716.121.837.36.24.717.417 1.137.66-.06.599-.06 1.016-.06 1.315.06.36.299.599.656.538.36 0 .538-.3.538-.538v-.955c.538.117 1.016.239 1.436.239.898 0 1.675-.24 2.452-.539 2.513-1.015 4.962-3.528 7.115-7.174 1.914-3.23 3.589-7.353 4.662-11.66 1.137-4.544 1.675-8.85 1.675-12.495 0-5.682-1.315-9.745-3.946-10.404l-.003-.008zm1.076 22.54c-1.974 7.653-6.038 16.143-11.003 18.057a5.861 5.861 0 01-3.347.24c.061-3.23.417-9.09.956-15.905.117-.955.178-1.974.239-2.93.238-.837.417-1.732.598-2.57 2.752-11.002 7.952-19.072 11.181-18.294 1.914.477 2.991 4.006 2.991 9.028 0 3.528-.478 7.834-1.615 12.375zm52.367 2.513c-.061.239.178.599.538.716.36.061.659-.12.716-.477.121-.538.178-1.315.178-2.032 0-.955-.121-1.793-.716-2.33-.478-.539-1.255-.657-2.213-.418-2.214.599-4.007 5.143-4.723 7.296 0-2.391-.239-4.067-.955-4.844-.239-.417-.717-.655-1.137-.716-.36 0-.656.178-.656.538-.061.36.239.656.599.717.06 0 .117 0 .299.178.096.132.196.328.289.602a.672.672 0 00-.093.118c-3.468 5.143-6.758 8.19-8.729 8.19h-.121c-.599-.117-1.255-.477-1.675-1.315-.538-.777-.717-1.554-.955-2.452 1.194-.478 2.569-1.793 2.869-4.006.239-1.494-.121-2.809-1.077-3.29-.598-.3-1.194-.178-1.732.36-.492.528-.902 1.454-1.155 2.566-.246.364-1.86 2.72-3.731 5.03-3.647 4.605-4.784 4.783-4.962 4.783-.538-.06-.955-.956-1.076-2.691-.061-1.733.121-3.885.239-5.92 0-.539.06-1.138.06-1.676 0-.36-.178-.656-.538-.656-.299 0-.599.179-.656.539-.06.598-.06 1.197-.06 1.792a38.53 38.53 0 00-.179 2.153c-2.705-.075-7.331 1.836-13.661 5.682 5.56-7.236 8.611-11.659 7.235-13.035-.417-.417-1.076-.3-1.732.06-.36.122-.717.36-1.077.66-.417.3-.837.656-1.375 1.016-.777.538-1.793 1.255-2.631 1.853-.955.539-1.732 1.016-2.452 1.077-.36 0-.538.36-.538.656.06.36.36.538.716.538 1.675-.178 3.768-1.793 5.621-3.169.898-.599 2.153-1.614 2.63-1.793 0 .3-.238 1.376-2.63 4.962-1.914 2.808-4.306 5.92-6.098 8.13l-.717.898c-.178.3-.178.599 0 .838.178.12.3.178.478.178.121 0 .239-.06.36-.06 5.31-3.422 12.25-7.311 15.821-7.236-.007.37-.014.73-.014 1.08 0 .777 0 1.436.061 2.092.178 1.793.716 3.108 2.092 3.23h.121c2.071 0 6.22-5.415 8.415-8.534v.043c0 1.675.36 3.468 1.255 4.962.599 1.137 1.615 1.793 2.752 1.793h.121c3.247.053 7.107-4.82 9.139-7.703.032.396.053.845.053 1.365 0 1.793-.239 4.306-.716 8.073v.121c-.122.36.178.656.538.656.299 0 .599-.239.599-.417 1.375-7.474 4.006-13.633 5.799-14.171.598-.06.837 0 1.076.178.417.417.599 1.493.118 3.23l-.007-.008zm-18.399-2.33c.121-.122.178-.122.178-.122h.061c.299.121.598.898.477 1.974-.178 1.194-.837 2.453-1.793 2.99-.178-2.152.417-4.127 1.077-4.843z'
    ></path>
  </svg>
);
