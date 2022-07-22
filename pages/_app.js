import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Layout } from '../Components'
import { StateContext } from '../Constext/StateContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
    <Layout>    
  <Toaster />
  <Component {...pageProps} />
  </Layout>
  </StateContext>
  )
  
}

export default MyApp
