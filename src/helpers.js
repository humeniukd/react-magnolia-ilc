export function getAPIBase() {
  let M;
  if (Boolean(REACT_APP_MGNL_IS_PREVIEW)) {
    M = REACT_APP_MGNL_BASE_AUTHOR;
  } else {
    M = REACT_APP_MGNL_BASE_PUBLIC;
  }
  let API_BASE = REACT_APP_MGNL_HOST + M;
  return API_BASE;
}

export function getLanguages() {
  return REACT_APP_MGNL_LANGUAGES.split(' ');
}

export function removeCurrentLanguage(string, currentLanguage) {
  return string.replace(new RegExp('/' + currentLanguage + '($|/)'), '/');
}

export function getCurrentLanguage(pathname) {
  const languages = getLanguages();

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (new RegExp('/' + language + '($|/)').test(pathname)) {
      return language;
    }
  }

  return languages[0];
}

export function changeLanguage(newLanguage, pathname) {
  const nodeName = REACT_APP_MGNL_APP_BASE;
  const languages = getLanguages();
  const currentLanguage = getCurrentLanguage(pathname);
  pathname = removeCurrentLanguage(pathname, currentLanguage);

  if (languages[0] !== newLanguage) {
    if (pathname.indexOf(nodeName) > -1) {
      pathname = pathname.replace(new RegExp(nodeName), '/' + newLanguage + nodeName);
    } else {
      pathname = '/' + newLanguage + pathname;
    }
  }

  window.location.href = window.location.origin + pathname + window.location.search;
}

export function getRouterBasename(location) {
  const nodeName = REACT_APP_MGNL_APP_BASE;
  const languages = getLanguages();
  var pathname = location.pathname;

  if (pathname.indexOf(nodeName) > -1) {
    return pathname.replace(new RegExp(nodeName + '.*'), '') + nodeName;
  }

  const currentLanguage = getCurrentLanguage();

  return languages[0] === currentLanguage ? '/' : '/' + currentLanguage;
}

export function getVersion(path) {
  return new URLSearchParams(path).get('mgnlVersion');
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export function getPagePath(location) {
  const languages = getLanguages();
  const nodeName = REACT_APP_MGNL_APP_BASE;
  const currentLanguage = getCurrentLanguage(location.pathname);
  let path = nodeName + location.pathname.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), ''); // remove .html

  if (currentLanguage !== languages[0]) { // if not default
    path = removeCurrentLanguage(path, currentLanguage);
    path += '?lang=' + currentLanguage;
  }

  return path;
}
