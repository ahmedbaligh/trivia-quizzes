import React, { useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom';

import FormView from './FormView';
import QuestionView from './QuestionView';
import QuizView from './QuizView';

import '../stylesheets/Header.scss';

const Header = () => {
  const [toggled, setToggled] = useState(false);

  const ref = useRef();

  const onMobileToggle = () => {
    setToggled(!toggled);
    ref.current.classList.toggle('mobile');
  };

  return (
    <Router>
      <div className="app-header container" ref={ref}>
        <span className="brand-logo">
          <NavLink to="/"></NavLink>
        </span>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <NavLink exact to="/" activeClassName="active">
                List
              </NavLink>
            </li>

            <li>
              <NavLink to="/add" activeClassName="active">
                Add
              </NavLink>
            </li>

            <li>
              <NavLink to="/play" activeClassName="active">
                Quiz
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="toggler" onClick={onMobileToggle}>
          <i
            className={`fas fa-${toggled ? 'times' : 'bars'}`}
            aria-hidden="true"
          ></i>
        </button>
      </div>

      <Switch>
        <Route path="/" exact>
          <QuestionView />
        </Route>
        <Route path="/add">
          <FormView />
        </Route>
        <Route path="/play">
          <QuizView />
        </Route>
      </Switch>
    </Router>
  );
};

export default Header;
