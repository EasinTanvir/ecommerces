import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout(props) {
  return (
    <div className='layout'>
      <Head>
        <title>EasinTanvir WebShop</title>
      </Head>
      <header>
        <Navbar />
        </header>
        <main className='main-container'>{props.children}</main>
        <footer>
          <Footer />
        </footer>
     
    </div>
  )
}
