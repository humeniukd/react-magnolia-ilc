const webpack = require('webpack');

module.exports = new webpack.DefinePlugin({
    PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
    REACT_APP_MGNL_HOST: JSON.stringify(process.env.REACT_APP_MGNL_HOST),
    REACT_APP_MGNL_IS_PREVIEW: JSON.stringify(process.env.REACT_APP_MGNL_IS_PREVIEW),
    REACT_APP_MGNL_DAM_RAW: JSON.stringify(process.env.REACT_APP_MGNL_DAM_RAW),
    REACT_APP_MGNL_LANGUAGES: JSON.stringify(process.env.REACT_APP_MGNL_LANGUAGES),
    REACT_APP_MGNL_BASE_AUTHOR: JSON.stringify(process.env.REACT_APP_MGNL_BASE_AUTHOR),
    REACT_APP_MGNL_BASE_PUBLIC: JSON.stringify(process.env.REACT_APP_MGNL_BASE_PUBLIC),
    REACT_APP_MGNL_APP_BASE: JSON.stringify(process.env.REACT_APP_MGNL_APP_BASE),
    REACT_APP_MGNL_API_TEMPLATES: JSON.stringify(process.env.REACT_APP_MGNL_API_TEMPLATES),
    REACT_APP_MGNL_API_PAGES: JSON.stringify(process.env.REACT_APP_MGNL_API_PAGES),
    REACT_APP_MGNL_API_PAGES_PREVIEW: JSON.stringify(process.env.REACT_APP_MGNL_API_PAGES_PREVIEW),
    REACT_APP_MGNL_API_NAV: JSON.stringify(process.env.REACT_APP_MGNL_API_NAV),
    REACT_APP_MGNL_STATIC: JSON.stringify(process.env.REACT_APP_MGNL_STATIC)
})