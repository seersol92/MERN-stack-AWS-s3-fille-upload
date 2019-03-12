import React, { Component } from 'react';

import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const App = ({ children }) => (
  <>
    <Header />
    <main>
    <div className="container-fluid">
      <div className="row mt-5">
      {children}
    </div>
    </div>
    </main>
    <Footer />
  </>
);

export default App;
