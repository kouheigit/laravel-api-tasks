// React App Configuration (duplicated under src/ due to CRA restriction)
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  appName: process.env.REACT_APP_APP_NAME || 'React View',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

export default config;


