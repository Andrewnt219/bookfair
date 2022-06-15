import { NextPageWithLayout } from '@bookfair/next';
import { UserProfileLayout } from '../../layouts';
import NextLink, { LinkProps } from 'next/link';
import { Icon, IconProps } from '@iconify/react';

interface Route extends LinkProps {
  text: string;
  iconName: string;
}

const routes: Route[] = [
  {
    href: '/user/profile',
    text: 'Profile',
    iconName: 'bi:credit-card-2-front-fill',
  },
  {
    href: '/user/reviews',
    text: 'Reviews',
    iconName: 'bi:chat-left-text-fill',
  },
  {
    href: '/user/listings',
    text: 'Listings',
    iconName: 'bi:aspect-ratio-fill',
  },
];

const UserMePage: NextPageWithLayout = () => {
  return (
    <ul className="list-unstyled row">
      {routes.map(({ text, iconName, ...route }) => (
        <li key={route.href.toString()} className="col-6 mt-3">
          <NextLink {...route}>
            <a
              className="d-flex flex-column fw-normal align-items-center justify-content-center gap-2 shadow-sm rounded"
              style={{ aspectRatio: '1/1' }}
            >
              <Icon icon={iconName} className="display-1" />
              {text}
            </a>
          </NextLink>
        </li>
      ))}
    </ul>
  );
};

UserMePage.getLayout = (page) => {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

export default UserMePage;
