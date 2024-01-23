import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:2411/graphql',
  cache: new InMemoryCache(),
});
const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
