import Markdown from '@/components/ui/markdown';
import styles from './Header.module.scss';
import type { Props } from './Header.types';
import CopyToClipboard from '@/components/ui/CopyToClipboard';

const Header = ({ data: { Header_Heading, Header_Description, tel, email } }: Props) => {
  return (
    <section className={styles['Header']}>
      <Markdown.h2>{Header_Heading}</Markdown.h2>
      <Markdown className={styles.description}>{Header_Description}</Markdown>
      <div className={styles.information}>
        <span className={styles.emailInformation}>
          {email}
          <CopyToClipboard copy={email} />
        </span>
        <span className={styles.telInformation}>
          {tel}
          <CopyToClipboard copy={tel} />
        </span>
      </div>
    </section>
  );
};

export default Header;
