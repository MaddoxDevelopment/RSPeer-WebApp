import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';
import {Dashboard} from "./View/Pages/Dashboard";
import {ScriptRepositoryDashboard} from "./View/Pages/ScriptRepository/ScriptRepositoryDashboard";
import {SignIn} from "./View/Pages/Authentication/SignIn";
import {StoreDashboard} from "./View/Pages/Store/StoreDashboard";
import {StoreCheckout} from "./View/Pages/Store/StoreCheckout";
import {StoreSuccess} from "./View/Pages/Store/StoreSuccess";
import {StoreProcess} from "./View/Pages/Store/StoreProcess";
import {DeveloperCenterDashboard} from "./View/Pages/DeveloperCenter/DeveloperCenterDashboard";
import {AddModifyScript} from "./View/Pages/DeveloperCenter/AddModifyScript";
import {RegisterGitRepository} from "./View/Pages/DeveloperCenter/RegisterGitRepository";
import {BotPanelDashboard} from "./View/Pages/BotPanel/BotPanelDashboard";
import {ProxyManager} from "./View/Pages/BotPanel/ProxyManager";
import {QuickLaunch} from "./View/Pages/BotPanel/QuickLaunch";
import {ViewLogs} from "./View/Pages/BotPanel/ViewLogs";

export class Routes extends React.Component {

    componentDidMount(): void {
    }

    render() : any {
        return (
            <Switch>
                <Route exact path={`/`} component={(props : any) => <Dashboard {...props} {...this.props}/>}/>
                <Route exact path={`/login`} component={(props : any) => <SignIn {...props} {...this.props}/>}/>
                <Route exact path={`/scripts`} component={(props : any) => <ScriptRepositoryDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/store`} component={(props : any) => <StoreDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/store/checkout`} component={(props : any) => <StoreCheckout {...props} {...this.props}/>}/>
                <Route exact path={`/store/success`} component={(props : any) => <StoreSuccess {...props} {...this.props}/>}/>
                <Route exact path={`/store/process`} component={(props : any) => <StoreProcess {...props} {...this.props}/>}/>
                <Route exact path={`/developer`} component={(props : any) => <DeveloperCenterDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/developer/addScript`} component={(props : any) => <AddModifyScript {...props} {...this.props}/>}/>
                <Route exact path={`/developer/register`} component={(props : any) => <RegisterGitRepository {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management`} component={(props : any) => <BotPanelDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/qs`} component={(props : any) => <QuickLaunch {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/proxy`} component={(props : any) => <ProxyManager {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/logs`} component={(props : any) => <ViewLogs {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/logs/:launcherId`} component={(props : any) => <ViewLogs {...props} {...this.props}/>}/>
            </Switch>
        )
    }
}
