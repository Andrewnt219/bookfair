import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { Accordion } from 'react-bootstrap';
import { RootLayout } from '../layouts';

const ListingNewPage: NextPageWithLayout = () => {
  const headers = ['Listings', 'Violations', 'Users', 'Payments'];
  return (
    <section>
      <Head>
        <title>Guidelines - Bookfair</title>
      </Head>

      <h1>Community guidelines</h1>
      <Accordion defaultActiveKey={headers[0]}>
        {headers.map((header, idx) => (
          <Accordion.Item key={idx} eventKey={header}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium enim optio dolorem provident consectetur? Animi
              quisquam odio natus est a? Ipsum mollitia consectetur corrupti
              totam quos illum numquam velit quibusdam eum modi! Debitis
              repudiandae, rem explicabo doloremque expedita doloribus nemo
              quos. Dolorem aut alias, explicabo praesentium minus est vel atque
              dicta eum quos iure voluptatem, cumque soluta adipisci officiis
              consequuntur similique molestias eaque amet. Dolores voluptas
              fugiat cumque asperiores, aperiam nesciunt velit vero repellat
              voluptatibus corrupti commodi perspiciatis quisquam illo, officia
              dolore! Corrupti omnis at, magnam ipsam in nulla est molestiae
              doloribus, rem ullam aperiam consectetur? Velit delectus
              architecto commodi maiores in earum molestiae dolore veritatis rem
              voluptate quibusdam, rerum possimus magni maxime atque, labore
              necessitatibus fugiat numquam aspernatur fugit odit repellendus
              nemo optio odio. Error quae doloribus quod minima perferendis
              explicabo ea eligendi soluta nemo repellendus cupiditate fuga
              eveniet in quia aperiam atque et, aliquid odit animi beatae earum
              molestiae exercitationem. Non eius a vel culpa quibusdam sapiente
              quod, quaerat laudantium recusandae? Aut asperiores possimus eos
              omnis alias, beatae repellat placeat aspernatur eum maiores magnam
              non, perferendis minima. Provident, ipsa totam animi, esse
              voluptatem, nisi excepturi eligendi facere perspiciatis ducimus
              necessitatibus eveniet delectus consequuntur cupiditate veritatis
              maiores sunt vitae?
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
