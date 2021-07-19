import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAPIBase, getLanguages, getCurrentLanguage, changeLanguage } from '../helpers/AppHelpers';
import axios from "axios";

function renderLanguages(pathname) {
  const currentLanguage = getCurrentLanguage(pathname);

  return (
    <div className="languages">
      {getLanguages().map((lang) => (
        <span key={`lang-${lang}`} data-active={currentLanguage === lang} onClick={() => changeLanguage(lang, pathname)}>
          {lang}
        </span>
      ))}
    </div>
  );
}

function Navigation({ location }) {
  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchNav() {
      const apiBase = getAPIBase();
      const url = apiBase + REACT_APP_MGNL_API_NAV + REACT_APP_MGNL_APP_BASE;
      console.log('NAV URL:' + url);
      const { data } = await axios.get(url);
      let items = data['@nodes'].map((nodeName) => {
        return data[nodeName];
      });
      setNavItems([data, ...items]);
    }

    if (navItems.length < 1) {
      fetchNav();
    }
  }, [navItems]);

  return navItems ? (
    <nav className="Navigation">
      {navItems.map((item) => {
        return (
          <NavLink
            activeClassName="active"
            key={item['@id']}
            to={item['@path'].replace(REACT_APP_MGNL_APP_BASE, '')}
          >
            {item.navigationTitle || item.title || item['@name']}
          </NavLink>
        );
      })}
      {renderLanguages(location.pathname)}
    </nav>
  ) : (
    <div />
  );
}

export default Navigation;
