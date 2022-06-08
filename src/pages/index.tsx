import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../layouts';

const HomePage: NextPageWithLayout = () => {
  return (
    <section>
      <h2>Bookfair</h2>
    </section>
  );
};

HomePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
