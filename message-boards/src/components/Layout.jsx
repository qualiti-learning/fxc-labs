import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from '@chakra-ui/react';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxW={1200} py={10}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
