import { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { IntlProvider,FormattedMessage } from "react-intl";
import LayoutContext from "./layoutContext";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../redux/theme";
import {useCookies} from 'react-cookie';
import {message} from '../../data/langData';



//Using Redux reducers at the top of the component tree
//import {increment,decrement,incrementByAmount} from '../../redux/counter'

//Might be useful for later
//import { useOnScreen,useMediaQuery } from '../../utils/hooks';
//


export default function Layout(props) {
  const [cookie, setCookie] = useCookies(["lang"])
    //Get the global state
   
    //using dispatch function to dispatch actions
    


 // const [size, setSize] = useState();
  //const [ref, visible] = useOnScreen({ rootMargin: '-100px' })
  //const size = useMediaQuery(768)
  // useEffect(() => {
  //   setSize(document.body.clientWidth);
  // }, []);
  // useEffect(() => {
  //   const onResize = (e) => {
  //     setSize(e.target.outerWidth);
  //   };
  //   window.addEventListener("resize", onResize);
  //   return () => {
  //     window.removeEventListener("resize", onResize);
  //   };
  // }, []);

  const language = useSelector(state => state.theme.language)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(cookie.lang){
      dispatch(setLanguage(cookie.lang))
    }else if(navigator.language){
      let ln = navigator.language.split("-")
      dispatch(setLanguage(ln[0]))
      setCookie("lang",ln[0])
    }
  },[cookie, dispatch, setCookie])
  
  const handleChange = (e) => {
    dispatch(setLanguage(e.target.value))
    setCookie("lang",e.target.value)
  };
  return (
    <>
    <LayoutContext.Provider value={language} >
    <select onChange={handleChange}>
      {['en','tr'].map((x)=>(
        <option value={x} key={x}>{x}</option>
      ))}
    </select>
    <IntlProvider locale={language} messages={message[language]} >
    <Header title={<FormattedMessage id="heading" defaultMessage="Default" values={{language}} />} />
     <main title="Main">
       {props.children}
     </main>
     <Footer footer_title={<FormattedMessage id="heading" defaultMessage="Default" values={{language}} />} />
    
    </IntlProvider>
    </LayoutContext.Provider>
    </>
  );
}