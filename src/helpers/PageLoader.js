import React from 'react';
import config from '../magnolia.config';
import { getAPIBase, getLanguages, removeCurrentLanguage, getCurrentLanguage, getVersion } from './AppHelpers';

import { EditablePage } from '@magnolia/react-editor';
import { EditorContextHelper } from '@magnolia/react-editor';
import axios from "axios";

class PageLoader extends React.Component {
  state = {};

  getPagePath = () => {
    const languages = getLanguages();
    const nodeName = REACT_APP_MGNL_APP_BASE;
    const currentLanguage = getCurrentLanguage(this.props.location.pathname); //TODO: props
    let path = nodeName + this.props.location.pathname.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), ''); // remove .html

    if (currentLanguage !== languages[0]) { // if not default
      path = removeCurrentLanguage(path, currentLanguage);
      path += '?lang=' + currentLanguage;
    }

    return path;
  };

  loadPage = async () => {
    // Bail out if already loaded content.
    if (this.state.pathname === this.props.location.pathname) return;

    const apiBase = getAPIBase();

    const pagePath = this.getPagePath();
    console.log('pagePath:' + pagePath);

    const version = getVersion(this.props.location.href);
    let fullContentPath = `${apiBase}${version ? REACT_APP_MGNL_API_PAGES_PREVIEW : REACT_APP_MGNL_API_PAGES}${pagePath}${version ? `?version=${version}` : ''}`;

    const  { data: pageJson } = await axios.get(fullContentPath);

    console.log('page content: ', pageJson);

    const templateId = pageJson['mgnl:template'];
    console.log('templateId:', templateId);

    let templateJson = null;
    if (EditorContextHelper.inEditor()) {
      templateJson = await axios.get(apiBase + REACT_APP_MGNL_API_TEMPLATES + '/' + templateId);
      console.log('definition:', templateJson);
    }

    this.setState({
      init: true,
      content: pageJson,
      templateDefinitions: templateJson,
      pathname: this.props.location.pathname,
    });
  };

  inEditorPreview() {
    const url = this.props.location.href;
    const inPreview = url.indexOf('mgnlPreview=true') > 0;
    console.log('inEditorPreview:' + inPreview);
    return EditorContextHelper.inEditor() && inPreview;
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    if (this.state.init) {
      console.log('config:', config);
      //const isDevMode = NODE_ENV === 'development';
      //console.log("n:" + NODE_ENV)

      return (
        <EditablePage
          templateDefinitions={this.state.templateDefinitions || {}}
          content={this.state.content}
          config={config}
        ></EditablePage>
      );
    } else {
      return <p>NO PAGE.</p>;
    }
  }
}

export default PageLoader;
