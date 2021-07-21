import  {getAPIBase, getPagePath, getVersion} from './helpers'
import axios from 'axios';

export async function loadPage(location) {
    const apiBase = getAPIBase();
    const version  = getVersion(location.href);
    const pagePath = getPagePath(location);

    console.log('pagePath:' + pagePath);
    let fullContentPath = `${apiBase}${version ? REACT_APP_MGNL_API_PAGES_PREVIEW : REACT_APP_MGNL_API_PAGES}${pagePath}${version ? `?version=${version}` : ''}`;

    const  { data: pageJson } = await axios.get(fullContentPath);

    console.log('page content: ', pageJson);

    return pageJson
}

export async function loadTemplate(templateId) {
    const  { data: templateJson } = await axios.get(apiBase + REACT_APP_MGNL_API_TEMPLATES + '/' + templateId);
    return templateJson;
}

export async function fetchNav() {
    const apiBase = getAPIBase();
    const url = apiBase + REACT_APP_MGNL_API_NAV + REACT_APP_MGNL_APP_BASE;
    console.log('NAV URL:' + url);
    const { data } = await axios.get(url);
    const items = data['@nodes'].map((nodeName) => {
        return data[nodeName];
    });
    return [data, ...items]
}