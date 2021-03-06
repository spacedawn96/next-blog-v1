import { ApolloProvider } from '@apollo/client';
import '../reset.css';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { useApollo } from 'src/lib/apollo';
import { Provider } from 'react-redux';
import store from 'src/store/store';
import { ToastProvider } from 'react-toast-notifications';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ToastProvider placement="bottom-right">
          <Component {...pageProps} />
        </ToastProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
