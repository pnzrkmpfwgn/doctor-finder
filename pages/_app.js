import Layout from "../components/layout/layout";
import { CookiesProvider } from "react-cookie";



//Redux boilerplate
import { Provider } from "react-redux";
import store from '../redux/store';


const App = ({Component, pageProps, router}) =>{
  return (
    <>
      <Provider store={store} >
      <CookiesProvider>
        <Layout>
              <Component {...pageProps} key={router.route} />
        </Layout>
      </CookiesProvider>
      </Provider>
    </>
  );
}

export default App;