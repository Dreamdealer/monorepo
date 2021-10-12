import styled from 'styled-components';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

const StyledApp = styled.div`
  header {
    background-color: #143055;
    color: white;
    padding: 36px;
    border-radius: 3px;
  }

  main {
    padding: 36px;
  }
`;

export function App() {
  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to johanvantongeren.com!</h1>
      </header>
      <main>Hello World.</main>
    </StyledApp>
  );
}

export default App;
