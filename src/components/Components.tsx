import Faq, { Faq_Query, type FaqProps } from '@/components/_global/Faq';
import Opinions, { Opinions_Query, type OpinionsProps } from '@/components/_global/Opinions';
import TileList, { TileList_Query, type TileListProps } from '@/components/_global/TileList';
import CtaSection, { CtaSection_Query, type CtaSectionProps } from '@/components/_global/CtaSection';
import SimpleCtaSection, {
  SimpleCtaSection_Query,
  type SimpleCtaSectionProps,
} from '@/components/_global/SimpleCtaSection';
import HeroBackgroundImg, {
  HeroBackgroundImg_Query,
  type HeroBackgroundImgProps,
} from '@/components/_global/HeroBackgroundImg';
import Benefits, { Benefits_Query, type BenefitsProps } from '@/components/_global/Benefits';
import CourseModules, { CourseModules_Query, type CourseModulesProps } from '@/components/_global/CourseModules';
import ImageShowcase, { ImageShowcase_Query, type ImageShowcaseProps } from '@/components/_global/ImageShowcase';
import Bonuses, { Bonuses_Query, type BonusesProps } from '@/components/_global/Bonuses';
import TilesGrid, { TilesGrid_Query, type TilesGridProps } from '@/components/_global/TilesGrid';
import TilesSticky, { TilesSticky_Query, type TilesStickyProps } from '@/components/_global/TilesSticky';
import TilesFeatures, { TilesFeatures_Query, type TilesFeaturesProps } from '@/components/_global/TilesFeatures';
import Community, { Community_Query, type CommunityProps } from '@/components/_global/Community';
import Reviews, { Reviews_Query, type ReviewsProps } from '@/components/_global/Reviews';
import Introduction, { Introduction_Query, type IntroductionProps } from '@/components/_global/Introduction';
import ContactForm, { ContactForm_Query, type ContactFormProps } from '@/components/_global/ContactForm';
import TabSection, { TabSection_Query, type TabSectionProps } from '@/components/_global/TabSection';
import TilesIndicated, { TilesIndicated_Query, type TilesIndicatedProps } from '@/components/_global/TilesIndicated';
import TilesIcon, { TilesIcon_Query, type TilesIconProps } from '@/components/_global/TilesIcon';
import Divider, { Divider_Query } from '@/components/_global/Divider';
import StepList, { StepList_Query, type StepListProps } from '@/components/_global/StepList';
import HeroColumn, { HeroColumn_Query, type HeroColumnProps } from '@/components/_global/HeroColumn';
import Newsletter, { Newsletter_Query, type NewsletterProps } from '@/components/_global/Newsletter';
import CustomerCaseStudy, {
  CustomerCaseStudy_Query,
  type CustomerCaseStudyProps,
} from '@/components/_global/CustomerCaseStudy';
import WordsCollection, { WordsCollection_Query, type WordsCollectionProps } from './_global/WordsCollection';

type ComponentMap = {
  HeroBackgroundImg: HeroBackgroundImgProps;
  Benefits: BenefitsProps;
  Faq: FaqProps;
  Opinions: OpinionsProps;
  CtaSection: CtaSectionProps;
  SimpleCtaSection: SimpleCtaSectionProps;
  CourseModules: CourseModulesProps;
  ImageShowcase: ImageShowcaseProps;
  Bonuses: BonusesProps;
  TileList: TileListProps;
  TilesGrid: TilesGridProps;
  TilesSticky: TilesStickyProps;
  TilesFeatures: TilesFeaturesProps;
  Community: CommunityProps;
  Reviews: ReviewsProps;
  Introduction: IntroductionProps;
  ContactForm: ContactFormProps;
  TabSection: TabSectionProps;
  TilesIndicated: TilesIndicatedProps;
  TilesIcon: TilesIconProps;
  StepList: StepListProps;
  HeroColumn: HeroColumnProps;
  Newsletter: NewsletterProps;
  CustomerCaseStudy: CustomerCaseStudyProps;
  WordsCollection: WordsCollectionProps;
};

export type ComponentProps = ComponentMap[keyof ComponentMap] & { _type: string };

const Components = ({ data }: { data: ComponentProps[] }) => {
  return data?.map((item, index) => {
    const componentType = item._type as keyof ComponentMap;
    const componentMap: Record<string, React.ReactNode> = {
      HeroBackgroundImg: (
        <HeroBackgroundImg
          {...(item as HeroBackgroundImgProps)}
          aboveTheFold={Boolean(index === 0)}
        />
      ),
      Benefits: <Benefits {...(item as BenefitsProps)} />,
      Faq: <Faq {...(item as FaqProps)} />,
      Opinions: <Opinions {...(item as OpinionsProps)} />,
      CtaSection: <CtaSection {...(item as CtaSectionProps)} />,
      SimpleCtaSection: <SimpleCtaSection {...(item as SimpleCtaSectionProps)} />,
      CourseModules: <CourseModules {...(item as CourseModulesProps)} />,
      ImageShowcase: <ImageShowcase {...(item as ImageShowcaseProps)} />,
      Bonuses: <Bonuses {...(item as BonusesProps)} />,
      TileList: <TileList {...(item as TileListProps)} />,
      TilesGrid: <TilesGrid {...(item as TilesGridProps)} />,
      TilesSticky: <TilesSticky {...(item as TilesStickyProps)} />,
      TilesFeatures: <TilesFeatures {...(item as TilesFeaturesProps)} />,
      Community: <Community {...(item as CommunityProps)} />,
      Reviews: <Reviews {...(item as ReviewsProps)} />,
      Introduction: <Introduction {...(item as IntroductionProps)} />,
      ContactForm: (
        <ContactForm
          {...(item as ContactFormProps)}
          aboveTheFold={index === 0}
        />
      ),
      TabSection: <TabSection {...(item as TabSectionProps)} />,
      TilesIndicated: <TilesIndicated {...(item as TilesIndicatedProps)} />,
      TilesIcon: (
        <TilesIcon
          {...(item as TilesIconProps)}
          index={index}
        />
      ),
      Divider: <Divider />,
      StepList: <StepList {...(item as StepListProps)} />,
      HeroColumn: (
        <HeroColumn
          {...(item as HeroColumnProps)}
          index={index}
        />
      ),
      Newsletter: (
        <Newsletter
          {...(item as NewsletterProps)}
          index={index}
        />
      ),
      CustomerCaseStudy: (
        <CustomerCaseStudy
          {...(item as CustomerCaseStudyProps)}
          index={index}
        />
      ),
      WordsCollection: (
        <WordsCollection
          {...(item as WordsCollectionProps)}
          index={index}
        />
      ),
    };
    const DynamicComponent = componentMap[componentType];
    if (!DynamicComponent) {
      return null;
    }
    return DynamicComponent;
  });
};

export default Components;

export const Components_Query = /* groq */ `
  content[] {
    ${HeroBackgroundImg_Query}
    ${Benefits_Query}
    ${Faq_Query}
    ${Opinions_Query}
    ${TileList_Query}
    ${CtaSection_Query}
    ${SimpleCtaSection_Query}
    ${CourseModules_Query}
    ${ImageShowcase_Query}
    ${Bonuses_Query}
    ${TilesGrid_Query}
    ${TilesSticky_Query}
    ${TilesFeatures_Query}
    ${Community_Query}
    ${Reviews_Query}
    ${Introduction_Query}
    ${ContactForm_Query}
    ${TabSection_Query}
    ${TilesIndicated_Query}
    ${TilesIcon_Query}
    ${Divider_Query}
    ${StepList_Query}
    ${HeroColumn_Query}
    ${Newsletter_Query}
    ${CustomerCaseStudy_Query}
    ${WordsCollection_Query}
  },
`;
