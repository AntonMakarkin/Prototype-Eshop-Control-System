import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { CssBaseline } from '@material-ui/core';

import ThemeProvider from './Context/context';

import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute.jsx';

import AuthPage from './Pages/AuthPage/AuthPage';
import MainPage from './Pages/MainPage/MainPage';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const setDarkTheme = () => {
        const theme = localStorage.getItem('darkTheme')
    
        if (theme === 'true') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }

    useEffect(() => {
        setDarkTheme()
    }, [])

    return (
        <ThemeProvider.Provider value={{darkMode, setDarkMode}}>
            <CssBaseline/>
            <Switch>
                <Route path="/login">
                    <AuthPage/>
                </Route>
                <ProtectedRoute path="/dashboard">
                    <MainPage/>
                </ProtectedRoute>
                <Route exact path="/">
                    <Redirect exact from="/" to="/dashboard"/>
                </Route>
           </Switch>
        </ThemeProvider.Provider>    
    )
}

export default App;