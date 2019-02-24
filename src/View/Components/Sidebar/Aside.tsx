import React from 'react';
import profile from '../../../assets/images/avatars/profile.jpg';
import {BotPanelMenuItem, DeveloperCenter, ScriptsMenuItem, StoreMenuItem} from "./Children/AsideMenuItems";
import {withRouter} from "react-router";

export class Aside extends React.Component {

    render(): any {
        return (<aside className="app-aside app-aside-expand-md app-aside-light">
                <div className="aside-content">
                    <UserProfileDropdown/>
                    <div className="aside-menu overflow-hidden">
                        <nav id="stacked-menu" className="stacked-menu">
                            <ul className="menu">
                                <li className="menu-item has-active">
                                    <a href="index.html" className="menu-link"><span className="menu-icon fas fa-home"/>
                                        <span className="menu-text">Dashboard</span></a>
                                </li>
                                <BotPanelMenuItem {...this.props}/>
                                <ScriptsMenuItem {...this.props}/>
                                <StoreMenuItem {...this.props}/>
                                <li className="menu-header">Script Development</li>
                                <DeveloperCenter {...this.props}/>
                            </ul>
                        </nav>
                    </div>
                    <ToggleSkin/>
                </div>
            </aside>
        );
    }
}

export class ToggleSkin extends React.Component {

    private skin = localStorage.getItem('skin') || 'default';

    render() : any {
        const icon = this.skin === 'dark' ? 'fas fa-sun ml-1' : 'fas fa-moon ml-1';
        return ( <footer className="aside-footer border-top p-3">
            <button className="btn btn-light btn-block text-primary" data-toggle="skin">Switch {this.skin === 'dark' ? 'Light Mode' : 'Dark Mode'} <i
                className={icon}/></button>
        </footer>)
    }
}

export class UserProfileDropdown extends React.Component {
    render(): any {
        return (<header className="aside-header d-block d-md-none">
            <button className="btn-account" type="button" data-toggle="collapse"
                    data-target="#dropdown-aside"><span className="user-avatar user-avatar-lg"><img
                src={profile}/></span> <span className="account-icon"><span
                className="fa fa-caret-down fa-lg"/></span> <span className="account-summary"><span
                className="account-name">MadDev</span> <span className="account-description">Director</span></span>
            </button>
            <div id="dropdown-aside" className="dropdown-aside collapse">
                <div className="pb-3">
                    <a className="dropdown-item" href="user-profile.html"><span
                        className="dropdown-icon oi oi-person"/> Profile</a> <a className="dropdown-item"
                                                                                href="auth-signin-v1.html"><span
                    className="dropdown-icon oi oi-account-logout"/> Logout</a>
                    <div className="dropdown-divider"/>
                    <a className="dropdown-item" href="#">Help Center</a> <a className="dropdown-item"
                                                                             href="#">Ask Forum</a> <a
                    className="dropdown-item" href="#">Keyboard Shortcuts</a>
                </div>
            </div>
        </header>)
    }
}

export const AsideWithRouter = withRouter((props : any) => (<Aside {...props}/>));