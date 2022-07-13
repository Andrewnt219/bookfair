import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { useAdminRoute } from '../../utils';

const AdminReportsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return (
    <Container fluid className="col-lg-4">
      Admin reports
    </Container>
  );
};

AdminReportsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminReportsPage;
