import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './assets/GlobalStyle';
import Footer from './components/Layout/Footer';
import GlobalNav from './components/Layout/GlobalNav';
import SideNav from './components/Layout/SideNav';
import AskQuestion from './pages/AskQuestion';
import Home from './pages/Home';
import Edit from './pages/Questions/Edit';
import QuestionContent from './pages/Questions/QuestionContent';
import Logout from './pages/Register/Logout';
import SearchResults from './pages/SearchResults';

import { useEffect, useState } from 'react';
import AllQuestions from './pages/AllQuestions';
import GooglePage from './pages/GooglePage';
import QuestionsTagged from './pages/QuestionsTagged';
import Login from './pages/Register/Login';
import Signup from './pages/Register/Signup';
import SearchTip from './pages/SearchResults/AdvancedSearchTips/SearchTip';
import TagsTab from './pages/TagsTab';
import Users from './pages/Users';

function App() {
  const { pathname } = useLocation();

  let bgColor;
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/logout'
  ) {
    bgColor = `var(--black-050)`;
  } else if (pathname === '/ask') {
    bgColor = `var(--black-025)`;
  } else {
    bgColor = `white`;
  }

  const [hamburger, setHamburger] = useState(false);
  const openHamburger = () => {
    setHamburger(!hamburger);
  };

  const noSnb = ['/ask', '/login', '/logout', '/signup'];
  const noFooter = ['/login', '/logout', '/signup'];

  const hideSnb = noSnb.includes(pathname);
  const hideFooter = noFooter.includes(pathname);
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <Root color={bgColor}>
      <GlobalStyle />
      <GlobalNav hamburger={hamburger} openHamburger={openHamburger} />
      {hamburger && (
        <SNBModal>
          <SideNav />
        </SNBModal>
      )}
      <Body>
        {hideSnb || (
          <SNBContainer>
            <SideNav />
          </SNBContainer>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/questions" element={<AllQuestions />} />
          <Route path="/questions/ask" element={<AskQuestion />} />
          <Route path={`/questions/:id`} element={<QuestionContent />} />
          <Route path={`/questions/edit/:id`} element={<Edit />} />
          <Route path={`/questions/edit/:id/:answerid`} element={<Edit />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/search/tip" element={<SearchTip />} />
          <Route path="/searchtag" element={<QuestionsTagged />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tags" element={<TagsTab />} />
          <Route path={`/users/:id`} element={<div>users/:id</div>} />
          <Route path="/googlepage" element={<GooglePage />} />
        </Routes>
      </Body>
      {hideFooter || <Footer />}
    </Root>
  );
}
const Root = styled.section`
  background-color: ${(props) => props.color};
`;

const Body = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1264px;
  width: 100%;
  padding-top: 50px;
  min-height: calc(100vh - 332px);
`;

const SNBContainer = styled.div`
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const SNBModal = styled.div`
  @media screen and (min-width: 640px) {
    display: none;
  }
  margin-top: 52px;
  position: fixed;
  background-color: white;
  z-index: 1;
  border-bottom: 1px solid var(--black-100);
`;

export default App;
