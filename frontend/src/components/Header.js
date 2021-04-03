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
      <h2
        className="btn"
        onClick={() => {
          navTo('');
        }}
      >
        List
      </h2>
      <h2
        className="btn"
        onClick={() => {
          navTo('/add');
        }}
      >
        Add
      </h2>
      <h2
        className="btn"
        onClick={() => {
          navTo('/play');
        }}
      >
        Play
      </h2>
    </div>
  );
};

export default Header;
