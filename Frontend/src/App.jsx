import './App.css'
import AuthInitializer from './components/auth/AuthInitializer.jsx';
import ThemeInitializer from './components/common/ThemeInitialzer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import AppLayout from './layouts/AppLayout.jsx';
function App() {

   return (<>
            <AuthInitializer/>
            <ThemeInitializer/>
             <AppRoutes/>
        </>);
}

export default App;