import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getLanguages, getCurrentLanguage, changeLanguage } from '../helpers';
import { fetchNav } from "../api";

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

function Navigation({ items }) {
  const [navItems, setNavItems] = useState(items || []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchNav()
      setNavItems(data)
    }
    if (navItems.length < 1) {
      fetchData();
    }
  }, []);

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
      {/*{renderLanguages(location.pathname)}*/}
    </nav>
  ) : (
    <div />
  );
}

export default Navigation;
