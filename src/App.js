import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import useToken from './hooks/useToken';
import useSettings from './hooks/useSettings';
import Interceptor from './Interceptor';

const App = () => {
  const { token, setToken } = useToken();
  const { settings, setSettings } = useSettings();

  const routing = useRoutes(routes(token, setToken, settings, setSettings));

  return (
    <ThemeProvider theme={theme}>
      <Interceptor />
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
