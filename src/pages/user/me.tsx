import { NextPageWithLayout } from '@bookfair/next';
import { UserProfileLayout } from '../../layouts';
import NextLink, { LinkProps } from 'next/link';
import { Icon } from '@iconify/react';

interface Route extends LinkProps {
  text: string;
  iconName: string;
}

interface RoutesProps {
  routes: Route[];
}

const userRoutes: Route[] = [
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

const adminRoutes: Route[] = [
  {
    href: '/user/profile',
    text: 'Profile',
    iconName: 'bi:credit-card-2-front-fill',
  },
  {
    href: '/admin/stats',
    text: 'Reports',
    iconName: 'bi:clipboard2-check-fill',
  },
  {
    href: '/admin/violations',
    text: 'Violations',
    iconName: 'bi:exclamation-circle-fill',
  },
];

const UserMePage: NextPageWithLayout = () => {
  return (
    <UserProfileLayout>
      {(dbUser) => (
        <Routes routes={dbUser.role === 'admin' ? adminRoutes : userRoutes} />
      )}
    </UserProfileLayout>
  );
};

const Routes = (props: RoutesProps) => {
  return (
    <ul className="list-unstyled row">
      {props.routes.map(({ text, iconName, ...route }) => (
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
  return <>{page}</>;
};

export default UserMePage;
