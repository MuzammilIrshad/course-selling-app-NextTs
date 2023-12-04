import { userState } from '@/store/atoms/user';
import '@/styles/globals.css'
import axios from 'axios';
import type { AppProps } from 'next/app'
import React from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <RecoilRoot>
            <div style={{width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee"}}
            >
   <InitUser/>
  <Component {...pageProps} />
  </div>
  </RecoilRoot>
  </>
}


function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`http:localhost:3001/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  React.useEffect(() => {
      init();
  }, []);

  return <></>
}