import React from 'react';
import '../stylesheets/Header.scss';

const Header = () => {
  const navTo = uri => {
    window.location.href = window.location.origin + uri;
  };

  return (
    <div className="app-header">
      <h1
        className="logo btn"
        onClick={() => {
          navTo('');
        }}
      >
        Udacitrivia
      </h1>
      <section className="nav-links">
        <h3
          className="btn"
          onClick={() => {
            navTo('');
          }}
        >
          List
        </h3>
        <h3
          className="btn"
          onClick={() => {
            navTo('/add');
          }}
        >
          Add
        </h3>
        <h3
          className="btn"
          onClick={() => {
            navTo('/play');
          }}
        >
          Play
        </h3>
      </section>
    </div>
  );
};

export default Header;
