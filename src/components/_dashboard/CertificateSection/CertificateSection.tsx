'use client';

import { formatBytes } from '@/utils/format-bytes';
import Certificate from './Certificate';
import styles from './CertificateSection.module.scss';
import type { CertificateSectionTypes } from './CertificateSection.types';
import { useEffect, useState } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
const CertificateSection = ({ course, full_name }: CertificateSectionTypes) => {
  if (full_name == null) full_name = 'Anonim';

  const [pdfSize, setPdfSize] = useState(0);

  useEffect(() => {
    const generatePdfBlob = async () => {
      const blob = await pdf(
        <Certificate
          courseName={course.name}
          full_name={full_name}
        />
      ).toBlob();
      setPdfSize(blob.size);
    };

    generatePdfBlob();
  }, [course, full_name]);

  const parsedCertificateName = `Certyfikat-${course.name}-${full_name}.pdf`
    .replace(/ /g, '-')
    .toLowerCase()
    .replace(/^(.)/, (match) => match.toUpperCase());

  return (
    <section className={styles['CertificateSection']}>
      <div className={styles.icon}>
        <CertificateIcon />
      </div>
      <PDFDownloadLink
        className={`${styles.link} link`}
        fileName={parsedCertificateName}
        document={
          <Certificate
            courseName={course.name}
            full_name={full_name}
          />
        }
      >
        {parsedCertificateName}
        <span className={styles.fileSize}>{` (${formatBytes(pdfSize)})`}</span>
      </PDFDownloadLink>
    </section>
  );
};

export default CertificateSection;

function CertificateIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='136'
      height='69'
      fill='none'
    >
      <path
        fill='#9A827A'
        d='M10.065 1.07l-.05-.014C7.778.478 5.942.881 4.586 1.89c-.603.45-1.1 1.02-1.494 1.66h-.005c-.026.042-.05.083-.075.127-.034.06-.07.119-.101.178A14.086 14.086 0 001.66 6.73c-.51.888-.9 1.95-1.136 3.2-.498 2.653-.085 4.639.904 6.056.94 1.346 2.365 2.123 3.894 2.484.028.02.054.044.082.062 1.942 1.43 4.328 2.128 6.623 1.746.07-.01.14-.029.207-.042 1.5 3.718 3.11 10.147 3.072 17.245-.38-1.288-1.061-2.943-2.184-3.671a2.107 2.107 0 00-1.753-.284c-.703.188-.91.586-.961.888-.268 1.603 3.545 4.322 4.722 5.117a.4.4 0 00.114.05c-.294 5.574-1.678 11.427-4.968 16.622a.367.367 0 00.62.392 30.79 30.79 0 003.008-6.222c.044 0 .085 0 .13-.013 1.355-.426 5.788-1.937 5.992-3.548a.922.922 0 00.008-.121c0-.292-.135-.671-.672-1.004a2.1 2.1 0 00-1.76-.23c-1.188.346-2.242 1.557-2.972 2.626 1.007-3.63 1.407-7.336 1.407-10.868 0-7.051-1.588-13.416-3.083-17.16 1.952-.59 3.751-2.016 5.053-4.443 2.132-3.981 1.812-7.418.596-9.964-1.198-2.507-3.266-4.157-4.676-4.583h-.01l-.005-.005a6.03 6.03 0 00-3.842.01h-.005zm1.056 33.529c0-.023 0-.044.005-.065.02-.129.165-.23.426-.302a1.38 1.38 0 011.164.191c1.054.682 1.735 2.543 2.074 3.974-2.136-1.55-3.67-3.124-3.67-3.8v.002zM17.8 46.16a1.377 1.377 0 011.169.15c.23.141.338.278.323.41-.08.64-2.045 1.75-4.62 2.652.736-1.273 1.921-2.861 3.127-3.212zM3.536 4.209c.034-.057.065-.116.099-.173a5.309 5.309 0 011.38-1.567c.992-.739 2.312-1.123 3.962-.886a5.395 5.395 0 00-.517.354c-.413.323-.8.72-1.154 1.195-1.244.114-2.445.504-3.498 1.227-.186.129-.37.268-.545.418.082-.194.173-.385.273-.565v-.003zm11.717 4.126c.034 2.887-1.226 5.936-2.22 7.563-.436.715-1.485 1.36-2.866 1.745-.287.08-.589.145-.893.199-.39-.132-.76-.33-1.095-.61-.617-.508-1.154-1.3-1.524-2.442.068.023.135.049.204.072 2.453.803 4.033.537 4.984-.403.919-.908 1.123-2.336 1.123-3.552 0-2.629-1.81-4.397-3.46-5.056-.81-.325-1.673-.416-2.285-.106-.297.15-.522.395-.64.723.278-1.09.666-1.954 1.12-2.638a8.333 8.333 0 011.41.049c2.264.266 4.493 1.396 6.008 3.036.085.462.13.937.134 1.42zm.71-.336a6.69 6.69 0 01.904 2.076c.387 1.611-.06 3.256-.986 4.645-.927 1.39-2.314 2.49-3.747 2.998-.152.054-.307.1-.46.142.87-.405 1.58-.94 1.973-1.585 1.038-1.697 2.363-4.88 2.327-7.95 0-.109-.008-.217-.013-.326h.002zm-6.798 3.835a.689.689 0 00.452-.326c.093-.144.155-.328.199-.526a.365.365 0 00-.277-.432.365.365 0 00-.43.277 1.032 1.032 0 01-.088.266 1.152 1.152 0 01-.223-.223c-.402-.503-.932-1.608-1.484-3.302-.124-.382-.124-.648-.072-.823a.563.563 0 01.304-.36c.341-.17.958-.16 1.691.132 1.444.579 3.006 2.12 3.006 4.384 0 1.186-.212 2.347-.91 3.037-.665.658-1.9.996-4.249.23a6.52 6.52 0 01-.66-.258c-.161-.731-.262-1.576-.29-2.549-.052-1.82.088-3.318.364-4.55-.031.298.015.626.132.98.555 1.703 1.118 2.917 1.608 3.529.124.155.258.289.4.382a.717.717 0 00.53.124l-.003.008zm.028-8.676a9.26 9.26 0 00-.924-.062c.204-.224.418-.418.635-.588a4.776 4.776 0 011.19-.68c1.932.548 3.19 1.46 3.98 2.551.263.365.47.752.64 1.157-1.56-1.29-3.54-2.145-5.52-2.378zM2.812 6.295a6.168 6.168 0 011.41-1.342 6.453 6.453 0 012.576-1.028c-.924 1.653-1.484 4.054-1.386 7.462.02.756.088 1.446.191 2.078-2.373-1.551-3.266-4.534-2.791-7.17zm-.793 9.272C1.224 14.428.816 12.8 1.154 10.53a10.456 10.456 0 002.75 6.65c-.746-.384-1.397-.913-1.885-1.613zm3.677 2.241l-.062-.015c-2.554-1.986-4.265-5.389-3.63-9.352.214 2.398 1.438 4.758 3.798 5.974.395 1.557 1.064 2.662 1.92 3.373.083.07.169.134.256.196a9.246 9.246 0 01-2.28-.176h-.002zm7.991-16.062h.008l.008.005c1.177.351 3.113 1.838 4.244 4.206 1.118 2.342 1.441 5.536-.58 9.31-1.413 2.634-3.401 3.948-5.462 4.292-1.629.27-3.33-.06-4.864-.86.744.036 1.487-.005 2.195-.119 1.01.284 2.104.189 3.145-.183 1.59-.565 3.1-1.769 4.108-3.28 1.007-1.51 1.53-3.36 1.087-5.215-.297-1.24-.93-2.365-1.78-3.33a6.82 6.82 0 00-1.13-2.624c-.731-1.01-1.795-1.854-3.272-2.45a5.299 5.299 0 012.293.243v.005zM43.616.77h-.893v12.256h.893V.771zm19.708 6.61a4.887 4.887 0 001.445-.365c.429-.19.79-.43 1.093-.717.307-.295.54-.636.702-1.023.163-.387.243-.813.243-1.283 0-1.056-.349-1.856-1.049-2.399-.7-.547-1.755-.823-3.17-.823H59.46v12.256h.883V7.484h1.603c.238 0 .41.026.52.077a.853.853 0 01.32.269l3.924 4.973c.065.08.127.139.191.173a.55.55 0 00.243.051h.772l-4.22-5.3a1.378 1.378 0 00-.37-.346h-.004zm-.85-.556h-2.13V1.473h2.244c1.092 0 1.923.212 2.494.633.57.42.857 1.068.857 1.941 0 .429-.077.81-.235 1.152-.155.34-.385.632-.684.875a3.12 3.12 0 01-1.092.563 5.129 5.129 0 01-1.456.191l.002-.003zm-28.85.037a.92.92 0 00-.32-.166c.104-.041.197-.093.277-.155.087-.064.185-.152.294-.268l5.352-5.5h-.717a.671.671 0 00-.295.06.87.87 0 00-.25.19l-4.947 5.085a1.296 1.296 0 01-.181.154.901.901 0 01-.191.104 1.029 1.029 0 01-.217.051c-.08.006-.176.008-.287.008h-.728V.75h-.883v12.275h.883V7.117h.788c.14 0 .253.008.346.026.093.01.17.033.235.07.07.028.129.067.18.113.052.047.111.1.173.165l5.19 5.301c.07.07.137.127.199.173.064.042.17.06.32.06h.718l-5.647-5.89a1.604 1.604 0 00-.294-.276l.002.003zm14.65 6.165h7.345v-.736h-6.452v-5.11h5.37v-.72h-5.37V1.507h6.452V.77h-7.346v12.256zm64.063-5.89a1.575 1.575 0 00-.295-.275.915.915 0 00-.32-.166c.104-.041.196-.093.277-.155.085-.064.185-.152.294-.268l5.352-5.5h-.718a.67.67 0 00-.294.06.863.863 0 00-.25.19l-4.947 5.085a1.309 1.309 0 01-.181.154.899.899 0 01-.191.104 1.036 1.036 0 01-.217.051c-.08.006-.176.008-.287.008h-.728V.75h-.883v12.275h.883V7.117h.788c.139 0 .255.008.346.026.093.01.17.033.235.07a.611.611 0 01.18.113c.052.047.111.1.173.165l5.19 5.301c.07.07.137.127.199.173.065.042.17.06.32.06h.718l-5.649-5.89.005.003zM78.859 8.352c0 .57-.088 1.105-.261 1.604-.168.49-.413.919-.736 1.28-.323.364-.718.651-1.188.858a3.916 3.916 0 01-1.577.304c-.589 0-1.118-.103-1.586-.312a3.414 3.414 0 01-1.177-.857 3.892 3.892 0 01-.736-1.281 4.967 4.967 0 01-.25-1.603V.774h-.891v7.58c0 .676.106 1.309.32 1.898.214.583.52 1.094.92 1.533.405.434.893.775 1.463 1.023.579.248 1.224.372 1.942.372s1.36-.124 1.931-.372a4.2 4.2 0 001.464-1.023c.403-.439.713-.95.927-1.533.214-.59.32-1.222.32-1.898V.774h-.883v7.58l-.002-.003zm18.899 4.676h7.345v-.736h-6.452v-5.11h5.371v-.72h-5.37V1.507h6.451V.77h-7.345v12.256zm-5.109-1.972c0 .162.008.328.026.503L84.741.938c-.052-.07-.1-.113-.147-.129a.437.437 0 00-.191-.033h-.434v12.256h.772V2.715c0-.158-.008-.32-.026-.493l7.97 10.637c.08.117.189.173.32.173h.424V.776h-.78v10.281-.002zM57.357 31.842c.26 0 .478-.217.478-.478 0-.085.39-.996.865-1.732.129-.173.044-.434-.13-.607a.547.547 0 00-.648.173c-.26.39-.996 1.689-.996 2.166 0 .261.217.478.434.478h-.003zm62.006 0a.482.482 0 00.478-.478c0-.085.39-.996.865-1.732.129-.173.044-.434-.129-.607a.552.552 0 00-.651.173c-.26.39-.996 1.689-.996 2.166 0 .261.217.478.433.478zm16.102 3.207a.455.455 0 00-.607.173c-2.512 3.725-4.895 5.933-6.323 5.933h-.088c-.434-.085-.909-.346-1.213-.953-.39-.563-.519-1.125-.692-1.776.865-.346 1.861-1.299 2.078-2.902.173-1.082-.085-2.035-.78-2.383-.433-.217-.865-.13-1.254.26-.357.383-.654 1.054-.837 1.86a59.234 59.234 0 01-2.703 3.643c-2.642 3.335-3.465 3.465-3.594 3.465-.39-.044-.692-.692-.78-1.95-.044-1.255.088-2.814.173-4.288 0-.39.044-.824.044-1.214v-.01c.129-.119.258-.233.387-.338.217-.088.261-.39.088-.607-.129-.173-.39-.217-.607-.088-1.04.78-2.078 2.078-3.075 3.248-.346.434-.651.824-.997 1.255-.346.346-.65.736-.952 1.04-.692.607-1.214.953-1.645.865-.824-.087-.865-1.82-.953-3.248-.173-1.861-.434-3.81-1.776-3.855-.953 0-1.733 1.038-2.469 3.032-.26.606-.433 1.213-.606 1.905 0-1.645-.173-3.377-.607-4.634-.129-.261-.39-.346-.651-.261-.217.129-.302.304-.261.563.269.614.419 1.396.496 2.23-.214.344-.467.765-.723 1.103a23.848 23.848 0 01-1.126 2.037c-.433.607-.864 1.255-1.298 1.82-.865 1.082-1.777 1.645-2.642 1.472-1.213-.346-1.603-2.251-1.603-4.678 0-1.645.173-3.465.39-5.198.044-.217-.13-.434-.346-.478-.26-.044-.478.088-.52.346-.128.475-.216 1.04-.301 1.56-.52 3.119-1.43 7.58-2.685 8.36-.13.173-.261.173-.39.13-.434-.13-.692-.997-.692-2.296 0-.865.129-1.993.434-3.204.606-2.427 1.386-3.465 1.647-3.336.302.044.173.65.173.65-.044.261.088.478.346.52.217.087.475-.086.519-.347.129-.475.129-1.515-.824-1.732-.4-.108-1.384.028-2.277 2.417-1.838 1.433-3.878 3.695-5.838 6.419v-3.466c0-2.945-.085-4.505-.563-4.98-.173-.13-.302-.217-.475-.217-.563.088-.953 1.04-1.56 3.204-.606 2.079-1.386 4.764-2.339 5.198a.461.461 0 01-.475 0c-.346-.13-.563-.953-.563-2.123 0-.823.088-1.861.346-2.99.651-2.729 1.56-4.115 2.038-4.115.562 0 .519.607.519 1.125 0 .261.216.478.477.478.26 0 .475-.217.434-.478-.13-1.776-.78-2.034-1.43-2.034-.651 0-1.255.607-1.82 1.56-.39.908-.824 2.037-1.083 3.248-.216 1.04-.433 2.21-.433 3.248 0 1.386.346 2.512 1.17 2.858.39.173.823.173 1.254 0 .65-.302 1.17-1.17 1.604-2.21.475-1.04.823-2.34 1.17-3.55.216-.78.474-1.689.691-2.21.085.433.085 1.213.173 2.21v4.678c0 .563-.088 1.214-.088 1.862a66.922 66.922 0 00-3.984 6.886c-3.292 6.54-4.895 12.432-4.373 15.81.26 1.559.996 2.6 2.21 2.989.302.044.606.173.909.173.562 0 1.081-.217 1.603-.563 4.245-3.031 4.547-18.582 4.547-23.13 0-.65 0-1.254.044-1.905 1.72-2.576 3.583-4.828 5.355-6.41-.006.015-.008.028-.013.043a15.3 15.3 0 00-.39 3.421c0 1.56.346 2.903 1.342 3.163h.303c.302 0 .562-.044.823-.217.953-.606 1.645-2.339 2.079-4.33.173 2.642.867 4.072 2.251 4.506 1.255.302 2.383-.478 3.38-1.603.519-.563.997-1.255 1.472-1.994.433-.735.865-1.386 1.213-2.122l.01-.015v.015c.088 1.387 0 2.773-.085 3.638v.434c0 .26 0 .606.434.65h.044c.302 0 .39-.26.519-.563.044-.216.088-.475.217-.78.261-1.081.65-2.901 1.298-4.46.865-2.34 1.431-2.47 1.56-2.47.78.089.78 1.646.909 3.076 0 .478.129.953.129 1.343.044.475.129.908.302 1.254.217.78.607 1.343 1.387 1.472.692.088 1.43-.39 2.122-.997.39-.302.736-.735 1.04-1.125.953-1.04 1.733-2.079 2.6-3.075.06-.065.117-.124.176-.186v.317a28.912 28.912 0 00-.173 3.248c0 .563 0 1.04.044 1.516.129 1.299.519 2.251 1.516 2.34h.087c1.5 0 4.506-3.923 6.096-6.182v.031c0 1.214.261 2.512.909 3.594.434.824 1.17 1.299 1.993 1.299h.088c2.642.044 5.848-4.418 7.103-6.28a.55.55 0 00-.173-.65l-.01.013zM86.55 45.054c0 9.442-1.126 20.27-4.157 22.393-.52.39-1.082.478-1.689.26-.823-.26-1.43-.996-1.603-2.294-.736-4.418 2.858-13.558 7.449-20.834v.475zm40.686-11.046c.088-.088.129-.088.129-.088h.044c.217.088.434.651.346 1.43-.129.866-.607 1.777-1.299 2.167-.129-1.56.303-2.99.78-3.509zM39.838 17.551c-2.814-.736-6.323 4.289-8.49 11.304.044-1.214.088-2.34.088-3.292 0-2.296-.173-3.855-.823-4.506-.217-.173-.476-.302-.78-.302-.217 0-.39.26-.346.478 0 .26.217.477.477.433l.044.044c.39.39.563 1.862.563 3.9 0 2.165-.173 4.98-.346 7.753-.867 3.248-2.166 6.757-2.946 9.398-.088.217.173.39.39.478.26 0 .475-.173.475-.434.088-.736 1.43-4.462 1.862-6.15-.217 2.946-.65 8.445-.692 10.093-.088-.088-.261-.13-.302-.217-.261-.086-.52-.044-.607.129-.173.26-.13.519.088.607.26.173.519.302.823.477-.043.434-.043.736-.043.953.043.26.216.434.475.39.26 0 .39-.217.39-.39v-.692c.39.085.735.173 1.04.173.65 0 1.214-.173 1.776-.39 1.82-.736 3.594-2.556 5.154-5.197 1.386-2.34 2.6-5.327 3.377-8.446.824-3.292 1.214-6.41 1.214-9.052 0-4.116-.953-7.06-2.859-7.537l-.002-.005zm.78 16.328c-1.43 5.544-4.374 11.694-7.97 13.08a4.246 4.246 0 01-2.425.173c.044-2.339.302-6.584.692-11.52.085-.692.129-1.43.173-2.123.173-.607.302-1.255.433-1.861 1.994-7.97 5.76-13.816 8.1-13.254 1.386.346 2.166 2.903 2.166 6.54 0 2.557-.346 5.676-1.17 8.965zm37.938 1.818c-.043.173.13.434.39.519.261.044.478-.088.52-.346.087-.39.128-.953.128-1.472 0-.692-.087-1.299-.519-1.688-.346-.39-.908-.476-1.603-.303-1.603.434-2.902 3.726-3.421 5.286 0-1.733-.173-2.946-.692-3.51-.173-.301-.519-.474-.824-.518-.26 0-.475.129-.475.39-.044.26.173.475.434.519.044 0 .085 0 .217.129.07.095.142.237.21.436a.47.47 0 00-.068.085c-2.512 3.726-4.895 5.934-6.323 5.934h-.088c-.434-.085-.909-.346-1.214-.953-.39-.563-.519-1.126-.691-1.776.864-.346 1.861-1.3 2.078-2.903.173-1.081-.088-2.034-.78-2.383-.434-.217-.865-.129-1.255.261-.356.382-.653 1.054-.836 1.86a59.157 59.157 0 01-2.704 3.642c-2.64 3.336-3.465 3.465-3.594 3.465-.39-.044-.692-.692-.78-1.95-.043-1.254.088-2.813.174-4.288 0-.39.043-.823.043-1.213 0-.261-.129-.475-.39-.475-.216 0-.433.129-.474.39-.044.433-.044.867-.044 1.298-.06.524-.101 1.048-.13 1.56-1.96-.055-5.31 1.33-9.896 4.115 4.028-5.241 6.238-8.445 5.241-9.442-.302-.302-.78-.217-1.255.044-.26.088-.519.26-.78.478-.301.217-.606.475-.996.735-.563.39-1.299.91-1.905 1.343-.692.39-1.255.736-1.777.78-.26 0-.39.26-.39.475.044.26.261.39.52.39 1.213-.13 2.728-1.299 4.071-2.296.65-.433 1.56-1.17 1.905-1.298 0 .217-.172.996-1.905 3.594-1.387 2.034-3.119 4.288-4.418 5.89l-.519.65c-.129.217-.129.434 0 .607.13.087.217.129.346.129.088 0 .173-.044.261-.044 3.847-2.479 8.874-5.296 11.461-5.242-.005.27-.01.53-.01.783 0 .563 0 1.04.044 1.515.13 1.3.519 2.252 1.516 2.34h.087c1.5 0 4.506-3.922 6.096-6.182v.031c0 1.214.261 2.513.91 3.595.433.823 1.169 1.298 1.992 1.298h.088c2.352.04 5.149-3.49 6.62-5.58.024.287.04.613.04.99 0 1.298-.174 3.119-.52 5.848v.087c-.088.261.13.476.39.476.217 0 .434-.173.434-.303.996-5.414 2.902-9.876 4.2-10.265.434-.044.607 0 .78.129.302.302.434 1.082.086 2.339l-.006-.005zm-13.328-1.689c.088-.088.13-.088.13-.088h.043c.217.088.434.651.346 1.43-.129.866-.606 1.777-1.298 2.167-.13-1.56.302-2.99.78-3.509z'
      ></path>
    </svg>
  );
}
