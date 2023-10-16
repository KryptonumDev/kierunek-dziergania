import Img from '@/utils/Img'
import Markdown from '@/utils/Markdown'
import styles from './styles.module.scss'

const CourseModules = ({ data: { heading, paragraph, list } }) => {
  return (
    <section className={`${styles.wrapper} sec-wo-margin`}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      <div className={styles.list}>
        {list.map(({ title, description, img }, i) => (
          <div className={styles.item} key={i}>
            <Img data={img} className={styles.img} />
            <div>
              <Markdown className={styles.title}>{title}</Markdown>
              <Markdown className={styles.description}>{description}</Markdown>
            </div>
            {i < list.length - 1 && <Arrow className={styles.arrow} />}
          </div>
        ))}
      </div>
      <Decoration1 aria-hidden='true' className={styles.decoration1} />
      <Decoration2 aria-hidden='true' className={styles.decoration2} />
    </section>
  )
}

export default CourseModules

const Decoration1 = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='148'
    height='114'
    viewBox='0 0 148 114'
    {...props}
    fill='none'>
    <path
      stroke='#B4A29C'
      strokeLinecap='round'
      d='M97.417 51.187c-6.331 4.804-16.733 20.19-7.688 43.305M98.142 50.81c-4.037 6.682-9.99 23.774-1.5 38.673'></path>
    <path
      stroke='#B4A29C'
      strokeLinecap='round'
      d='M97.987 50.738c.082 6.002 1.905 21.04 8.538 33.172m-8.616-33.752c6.447 5.792 19.731 21.32 21.295 37.102M97.99 50.374C92.296 37.836 69.545 11.591 24.077 6.916M132.015 82c-3.25-10.589-14.579-31.724-33.885-31.555'></path>
    <circle
      cx='132'
      cy='84.24'
      r='3'
      fill='#B4A29C'
      transform='rotate(115.546 132 84.24)'></circle>
    <circle
      cx='119.406'
      cy='90.672'
      r='3'
      fill='#B4A29C'
      transform='rotate(115.546 119.406 90.672)'></circle>
    <circle
      cx='108.296'
      cy='86.024'
      r='3'
      fill='#B4A29C'
      transform='rotate(115.546 108.296 86.024)'></circle>
    <circle
      cx='97.273'
      cy='90.862'
      r='3'
      fill='#B4A29C'
      transform='rotate(115.546 97.273 90.862)'></circle>
    <circle
      cx='90.359'
      cy='95.981'
      r='3'
      fill='#B4A29C'
      transform='rotate(115.546 90.359 95.98)'></circle>
  </svg>
)

const Decoration2 = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='109'
    height='109'
    viewBox='0 0 109 109'
    fill='none'
    {...props}>
    <path
      stroke='#B4A29C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M62.513 57.157c-2.343-4.405-6.32-13.868-3.492-16.484 3.536-3.27 7.47 7.468 3.492 16.484zm1.859 2.121c-4.464-3.079-14.47-7.54-18.783-.751-4.313 6.788 10.725 3.33 18.783.751zM78.91 73.819c-3.315-4.582-8.91-14.814-4.773-19.092 4.136-4.278 4.905 10.945 4.772 19.092zm.358 1.06c-5.26-2.99-16.547-7.478-19.622-1.503-3.076 5.975 11.8 3.492 19.622 1.503zm9.677 11.269c-2.578-4.551-6.497-14.645-1.547-18.605 4.95-3.96 3.094 10.754 1.547 18.605zm.265.708c-4.374-2.52-14.132-5.79-18.163 1.281-4.03 7.071 10.43 2.092 18.164-1.281zM50.05 45.578c-4.625-1.267-14.336-2.316-16.175 3.624-1.838 5.94 10.018.059 16.175-3.624zm-.309-.574c-3.506-3.27-9.51-10.695-5.48-14.23 4.03-3.536 5.333 8.013 5.48 14.23zm-10.955-9.193c-5.656-1.09-17.05-1.794-17.368 4.11-.398 7.38 17.015-3.756 17.368-4.11z'></path>
    <path
      stroke='#B4A29C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21.063 20.741c21.684 17.442 67.14 57.523 75.483 78.312M21.06 20.564c-2.975-.56-10.65-3.142-10.429-7.954.103-2.254 2.333-3.819 10.43 7.954z'></path>
    <path
      stroke='#B4A29C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M29.062 27.68c-3.462-1.37-11.685-3.06-16.882 1.149-6.496 5.259 11.447 5.877 16.882-1.15zm9.898 7.6c-3.564-3.564-9.271-11.87-3.58-16.572 5.693-4.702 4.76 9.09 3.58 16.573zm-9.454-7.866c-2.858-2.445-7.637-8.874-3.89-15.026 3.748-6.152 4.155 7.454 3.89 15.026z'></path>
  </svg>
)

const Arrow = ({ ...props }) => (
  <svg
    width='107'
    height='245'
    viewBox='0 0 107 245'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <path
      d='M3.97765 46.7674L3.2808 46.0502L3.97765 46.7674ZM93.5308 9.86158L92.7512 10.4878L93.5308 9.86158ZM65.1437 63.8518L65.5653 64.7587L65.1437 63.8518ZM51.4248 56.2692L50.4515 56.0399L51.4248 56.2692ZM94.312 67.3037L94.9631 66.5446L94.312 67.3037ZM85.6 106.878L85.4413 105.891L85.4413 105.891L85.6 106.878ZM28.3748 91.7191L29.2852 91.3053L28.3748 91.7191ZM47.0857 89.5936L47.7294 88.8283L47.0857 89.5936ZM91.5669 159.404L92.5192 159.099L91.5669 159.404ZM52.8099 239.771C52.3168 240.019 52.1186 240.621 52.3673 241.114C52.616 241.607 53.2174 241.805 53.7105 241.556L52.8099 239.771ZM4.72431 53.9286C5.27599 53.9028 5.70234 53.4347 5.67659 52.883C5.65083 52.3313 5.18272 51.905 4.63103 51.9308L4.72431 53.9286ZM58.595 225.185C58.8982 224.723 58.7698 224.103 58.3082 223.8C57.8465 223.497 57.2265 223.625 56.9233 224.087L58.595 225.185ZM52.3775 241.337C52.5307 241.868 53.085 242.174 53.6156 242.02C54.1462 241.867 54.4522 241.313 54.299 240.782L52.3775 241.337ZM70.6947 242.661C71.2233 242.501 71.522 241.942 71.3618 241.414C71.2017 240.885 70.6434 240.586 70.1149 240.747L70.6947 242.661ZM53.9395 240.452C53.4739 240.155 52.8556 240.292 52.5585 240.757C52.2614 241.223 52.398 241.841 52.8635 242.138L53.9395 240.452ZM4.67451 47.4846C15.8548 36.6218 32.7723 20.7648 49.5526 10.9659C57.9469 6.06399 66.2134 2.73506 73.6484 2.24517C81.0209 1.75939 87.5863 4.05808 92.7512 10.4878L94.3104 9.23533C88.6918 2.2407 81.4651 -0.274211 73.5169 0.249497C65.6312 0.76909 57.0482 4.27273 48.5441 9.23878C31.5275 19.1757 14.452 35.1961 3.2808 46.0502L4.67451 47.4846ZM92.7512 10.4878C96.763 15.4821 98.6074 20.2203 98.9615 24.6371C99.3159 29.057 98.1848 33.242 96.1017 37.137C91.9155 44.9639 83.9447 51.5073 76.8671 56.1396L77.9623 57.813C85.1207 53.1279 93.4375 46.3589 97.8653 38.0802C100.089 33.9224 101.346 29.3563 100.955 24.4772C100.564 19.5949 98.5282 14.486 94.3104 9.23533L92.7512 10.4878ZM76.8671 56.1396C71.5476 59.6212 66.8059 61.9764 64.7222 62.945L65.5653 64.7587C67.7096 63.7619 72.5409 61.3614 77.9623 57.813L76.8671 56.1396ZM64.7222 62.945C61.6825 64.358 57.8677 65.1351 55.2324 64.3655C53.9646 63.9952 53.0189 63.2859 52.4895 62.1389C51.944 60.9572 51.771 59.1609 52.3982 56.4985L50.4515 56.0399C49.7679 58.9413 49.8713 61.2388 50.6735 62.977C51.4919 64.75 52.9652 65.7869 54.6717 66.2853C57.9852 67.253 62.3406 66.2576 65.5653 64.7587L64.7222 62.945ZM52.3982 56.4985C52.6646 55.3677 53.4242 54.5443 54.734 54.0042C56.0805 53.4489 57.9612 53.2215 60.2773 53.3482C64.8975 53.6009 70.9187 55.2418 77.0159 57.8934L77.8135 56.0593C71.5877 53.3518 65.325 51.6213 60.3865 51.3512C57.9233 51.2165 55.7059 51.4399 53.9715 52.1552C52.2003 52.8857 50.8961 54.1528 50.4515 56.0399L52.3982 56.4985ZM77.0159 57.8934C82.9779 60.4861 88.941 64.0141 93.661 68.0627L94.9631 66.5446C90.0627 62.3413 83.9199 58.7148 77.8135 56.0593L77.0159 57.8934ZM93.661 68.0627C99.4881 73.061 104.307 81.5372 104.229 89.1994C104.191 92.9914 102.958 96.5695 100.065 99.4845C97.1586 102.414 92.4925 104.757 85.4413 105.891L85.7588 107.866C93.0835 106.688 98.1913 104.212 101.485 100.893C104.793 97.5597 106.186 93.4593 106.229 89.2196C106.314 80.8186 101.112 71.8192 94.9631 66.5446L93.661 68.0627ZM85.4413 105.891C77.9414 107.097 70.5497 107.319 63.6951 106.761L63.5328 108.755C70.5432 109.325 78.096 109.098 85.7588 107.866L85.4413 105.891ZM63.6951 106.761C55.0498 106.058 47.2861 104.115 41.2498 101.362C35.1831 98.5949 30.9986 95.0747 29.2852 91.3053L27.4644 92.1329C29.4682 96.5408 34.1653 100.329 40.4199 103.181C46.7049 106.048 54.7021 108.036 63.5328 108.755L63.6951 106.761ZM29.2852 91.3053C28.7337 90.0921 28.545 88.574 28.8109 87.1959C29.0754 85.825 29.7663 84.685 30.8833 84.0547C31.997 83.4262 33.731 83.1937 36.3097 84.0468C38.8951 84.9021 42.2399 86.8243 46.4419 90.3588L47.7294 88.8283C43.4223 85.2054 39.8549 83.113 36.9379 82.148C34.0143 81.1808 31.6559 81.3221 29.9003 82.3129C28.148 83.3018 27.1926 85.0265 26.8471 86.817C26.503 88.6003 26.7404 90.5402 27.4644 92.1329L29.2852 91.3053ZM46.4419 90.3588C51.6362 94.728 57.2837 101.022 62.8154 108.36L64.4125 107.156C58.8299 99.751 53.0802 93.3292 47.7294 88.8283L46.4419 90.3588ZM62.8154 108.36C74.4908 123.847 85.524 143.812 90.6145 159.709L92.5192 159.099C87.3442 142.938 76.1873 122.775 64.4125 107.156L62.8154 108.36ZM90.6145 159.709C96.769 178.929 96.4421 194.271 90.1124 207.092C83.7693 219.941 71.3101 230.44 52.8099 239.771L53.7105 241.556C72.3889 232.136 85.2878 221.383 91.9057 207.978C98.537 194.545 98.7742 178.633 92.5192 159.099L90.6145 159.709ZM3.2808 46.0502C1.70761 47.5787 0.625427 49.4259 0.68542 51.0498C0.717687 51.9231 1.08853 52.7347 1.86765 53.2772C2.60606 53.7914 3.59271 53.9814 4.72431 53.9286L4.63103 51.9308C3.73932 51.9724 3.25166 51.8039 3.01052 51.6359C2.81008 51.4964 2.69612 51.3023 2.68406 50.976C2.6554 50.2005 3.24653 48.8721 4.67451 47.4846L3.2808 46.0502ZM56.9233 224.087C55.823 225.762 54.2889 228.597 53.2236 231.716C52.1692 234.804 51.5133 238.344 52.3775 241.337L54.299 240.782C53.6081 238.389 54.1019 235.333 55.1163 232.363C56.1199 229.424 57.5738 226.74 58.595 225.185L56.9233 224.087ZM70.1149 240.747C68.3345 241.286 65.3487 241.921 62.2462 242.052C59.1104 242.184 56.0391 241.792 53.9395 240.452L52.8635 242.138C55.4897 243.814 59.0708 244.187 62.3305 244.05C65.6235 243.911 68.7765 243.242 70.6947 242.661L70.1149 240.747Z'
      fill='#EFE8E7'
    />
  </svg>
)
