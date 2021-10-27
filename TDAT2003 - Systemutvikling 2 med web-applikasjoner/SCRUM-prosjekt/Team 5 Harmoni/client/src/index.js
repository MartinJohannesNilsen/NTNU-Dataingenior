import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import './css/index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import {auth, authenticate} from "./service/auth.js";
import LoginPage from './components/Pages/LoginPage/LoginPage.js';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage.js';
import OverviewPage from './components/Pages/OverviewPage/OverviewPage.js';
import MainPage from './components/Pages/MainPage/MainPage';
import EventPage from './components/Pages/EventPage/EventPage.js';
import EventView from './components/Pages/EventView/EventView.js';
import EditEvent from './components/Pages/EditEvent/EditEvent.js';
import AddEvent from './components/Pages/AddEvent/AddEvent.js';
import About from './components/Pages/About/About.js';
import ShowProfile from "./components/Pages/ShowProfile/ShowProfile";
import EditProfile from "./components/Pages/EditProfile/EditProfile";
import AdminUserPage from './components/Pages/AdminUsersPage/AdminUsersPage';
import EditUserPage from "./components/Pages/EditUserPage/EditUserPage";
import guestEventView from './components/Pages/Guest/GuestEventView/GuestEventView';
import guestMainPage from './components/Pages/Guest/GuestMainPage/GuestMainPage';
import ForgotPassword from "./components/Pages/ForgotPassword/ForgotPassword";
import NotFound from "./components/Pages/NotFound/NotFound";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from "./components/Calendar/Calendar";

/**
* Component for restricting access, only giving the authenticated users (logged in users) access to the sites in the host-portal
*/
const RestrictedRoute = ({component: Component, authorized, ...rest}) => (
    <Route {...rest} render={(props) => (
        authenticate(), // Checks if the user is authenticated, then updates the users role and status for use in the next line
        auth.authenticated === true // If user is authenticated, check if they are authorized to view page
            ? authorized.includes(auth.role) === true 
                ? <Component {...props} /> 
                : <Redirect to="/overview" /> 
            : <Redirect to="/" /> // User is not authenticated, and needs to log in
    )}/>
);

/**
* Object with list of clearance levels used for routing and restricting access.
*/ 
const restriction = {
    admin: "admin",
    regular: ["admin", "Sceneansvarlig", "Økonomisjef", "Barsjef", "Bartender", "Handyman", "Fotograf", "Markedsfører", "SoMe-ansvarlig", "Ølbrygger", "Lydteknikker", "Lystekniker", "Scenerigger", "Artistbooker", "Artistkontakt", "Konseptutvikler", "Quizmaster", "Festplanlegger"]
};

/**
* Renders the site using ReactDOM and HashRouter. This makes it possible for the site to render different components depending on the url the user tries to access.
*/
ReactDOM.render(
    <HashRouter>
        <ToastContainer />
        <div>
            <Switch>
                <Route exact path="/" component={guestMainPage} />
                <Route exact path="/event/public/:id" component={guestEventView} />
                <Route exact path="/portal" component={MainPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exacth path="/forgotpassword" component={ForgotPassword} />
                <Route exact path="/about" component={About} />
                <RestrictedRoute exact path="/overview" component={OverviewPage} authorized={restriction.regular} />
                <RestrictedRoute exact path="/profile/:userID" component={ShowProfile} authorized={restriction.regular} />
                <RestrictedRoute exact path="/profile/:userID/edit" component={EditProfile} authorized={restriction.regular} />
                <RestrictedRoute exact path="/event" component={EventPage} authorized={restriction.regular} />
                <RestrictedRoute exact path="/event/:id" component={EventView} authorized={restriction.regular}/>
                <RestrictedRoute exact path="/event/:id/edit" component={EditEvent} authorized={restriction.regular} />
                <RestrictedRoute exact path="/overview/addEvent" component={AddEvent} authorized={restriction.regular} />
                <RestrictedRoute exact path="/admin" component={AdminUserPage} authorized={restriction.admin} />
                <RestrictedRoute exact path="/admin/users" component={AdminUserPage} authorized={restriction.admin} />
                <RestrictedRoute exact path="/admin/users/:id/edit" component={EditUserPage} authorized={restriction.admin} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </HashRouter>
    , (document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();