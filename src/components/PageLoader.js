import React from 'react';
import config from '../magnolia.config';

import { EditablePage } from '@magnolia/react-editor';
import { EditorContextHelper } from '@magnolia/react-editor';
import {loadPage, loadTemplate} from "../api";

class PageLoader extends React.Component {
  state = {};

  loadPage = async () => {
    // Bail out if already loaded content.
    if (this.state.pathname === this.props.location.pathname) return;

    const isInEditor = EditorContextHelper.inEditor();

    const pageJson = await loadPage(this.props.location);

    const templateId = pageJson['mgnl:template'];
    console.log('templateId:', templateId);

    let templateJson = null;
    if (isInEditor) {
      templateJson = await loadTemplate(templateId)
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
    if (this.props.pageJson) {
      this.setState({
        init: true,
        content: this.props.pageJson,
        templateDefinitions: this.props.templateJson,
        pathname: this.props.location.pathname,
      });
    } else this.loadPage();
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
