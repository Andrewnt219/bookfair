import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { useAdminRoute } from '../../utils';

const AdminViolationsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return (
    <Container fluid className="col-lg-4">
      Admin violations
    </Container>
  );
};

AdminViolationsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminViolationsPage;
