import React from 'react';
import config from '../magnolia.config';

import { EditablePage } from '@magnolia/react-editor';
import { EditorContextHelper } from '@magnolia/react-editor';
import {loadPage, loadTemplate} from "../api";

class PageLoader extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    if (props.pageJson)
      this.state = {
        init: true,
        content: props.pageJson,
        pathname: props.location.pathname
      }
  }

  loadPage = async () => {
    // Bail out if already loaded content.
    if (this.state.pathname === this.props.location.pathname) return;

    const isInEditor = EditorContextHelper.inEditor();

    const pageJson = await loadPage(this.props.location);

    const templateId = pageJson['mgnl:template'];
    // console.log('templateId:', templateId);

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
    // console.log('inEditorPreview:' + inPreview);
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
