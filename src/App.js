import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { Wrapper, Container, Content } from './styles/components';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Header from './components/Header';

import Routes from './routes';

const App = () => (
  <BrowserRouter>
    <Wrapper>
      <GlobalStyle />
      <Container>
        <Sidebar />
        <Content>
          <Header />
          <Routes />
        </Content>
      </Container>
      <Player />
    </Wrapper>
  </BrowserRouter>
);

export default App;
