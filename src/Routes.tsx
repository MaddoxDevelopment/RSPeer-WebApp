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
import {AdministrationDashboard} from "./View/Pages/Administration/AdministrationDashboard";
import {AdministrationUserDetails} from "./View/Pages/Administration/AdministrationUserDetails";
import {AdministrationScriptList} from "./View/Pages/Administration/Scripts/AdministrationScriptList";
import {ScripterPayout} from "./View/Pages/Administration/Scripter/ScripterPayout";
import {SiteContentManager} from "./View/Pages/Administration/Content/SiteContentManager";
import {UserCenterViewOrders} from "./View/Pages/UserCenter/UserCenterViewOrders";
import {UserCenterViewBalanceChanges} from "./View/Pages/UserCenter/UserCenterViewBalanceChanges";
import {UserCenterViewScriptAccess} from "./View/Pages/UserCenter/UserCenterViewScriptAccess";
import {GettingStarted} from "./View/Pages/GettingStarted";
import {OrderManager} from "./View/Pages/Administration/Order/OrderManager";
import {AdministrationStatsDashboard} from "./View/Pages/Administration/Stats/AdministrationStatsDashboard";
import {ManagePrivateScriptAccess} from "./View/Pages/DeveloperCenter/ManagePrivateScriptAccess";
import {RunningClients} from "./View/Components/BotPanel/RunningClients";
import {UserCenterApiClients} from "./View/Pages/UserCenter/UserCenterApiClients";
import {ScriptPricing} from "./View/Pages/DeveloperCenter/ScriptPricing";
import {StoreInuvationPurchase} from './View/Pages/Store/StoreInuvationPurchase';
import {BotPreferences} from "./View/Components/BotPanel/BotPreferences";
import {AdministrationBotAds} from "./View/Pages/Administration/BotAds/AdministrationBotAds";

export class Routes extends React.Component {

    render(): any {
        return (
            <Switch>
                <Route exact path={`/`} component={(props: any) => <Dashboard {...props} {...this.props}/>}/>
                <Route exact path={`/started`}
                       component={(props: any) => <GettingStarted {...props} {...this.props}/>}/>
                <Route exact path={`/login`} component={(props: any) => <SignIn {...props} {...this.props}/>}/>
                <Route exact path={`/scripts`}
                       component={(props: any) => <ScriptRepositoryDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/store`} component={(props: any) => <StoreDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/store/inuvation`} component={(props: any) => <StoreInuvationPurchase {...props} {...this.props}/>}/>
                <Route exact path={`/store/checkout`}
                       component={(props: any) => <StoreCheckout {...props} {...this.props}/>}/>
                <Route exact path={`/store/success`}
                       component={(props: any) => <StoreSuccess {...props} {...this.props}/>}/>
                <Route exact path={`/store/process`}
                       component={(props: any) => <StoreProcess {...props} {...this.props}/>}/>
                <Route exact path={`/developer`}
                       component={(props: any) => <DeveloperCenterDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/developer/pricing`}
                       component={(props: any) => <ScriptPricing {...props} {...this.props}/>}/>
                <Route exact path={`/developer/addScript`}
                       component={(props: any) => <AddModifyScript {...props} {...this.props}/>}/>
                <Route exact path={`/developer/privateScript`}
                       component={(props: any) => <ManagePrivateScriptAccess {...props} {...this.props}/>}/>
                <Route exact path={`/developer/register`}
                       component={(props: any) => <RegisterGitRepository {...props} {...this.props}/>}/>
                <Route exact path={`/user/orders`}
                       component={(props: any) => <UserCenterViewOrders {...props} {...this.props}/>}/>
                <Route exact path={`/user/balanceChanges`}
                       component={(props: any) => <UserCenterViewBalanceChanges {...props} {...this.props}/>}/>
                <Route exact path={`/user/scriptAccess`}
                       component={(props: any) => <UserCenterViewScriptAccess {...props} {...this.props}/>}/>
                    <Route exact path={`/user/apiClients`}
                           component={(props: any) => <UserCenterApiClients {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management`}
                       component={(props: any) => <BotPanelDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/qs`}
                       component={(props: any) => <QuickLaunch {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/proxy`}
                       component={(props: any) => <ProxyManager {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/logs`}
                       component={(props: any) => <ViewLogs {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/logs/:launcherId`}
                       component={(props: any) => <ViewLogs {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/clients`}
                       component={(props: any) => <RunningClients {...props} {...this.props}/>}/>
                <Route exact path={`/bot/management/preferences`}
                       component={(props: any) => <BotPreferences {...props} {...this.props}/>}/>
                <Route exact path={`/administration`}
                       component={(props: any) => <AdministrationDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/administration/user/search`}
                       component={(props: any) => <AdministrationUserDetails {...props} {...this.props}/>}/>
                <Route exact path={`/administration/scripts`}
                       component={(props: any) => <AdministrationScriptList {...props} {...this.props}/>}/>
                <Route exact path={`/administration/scripter/payout`}
                       component={(props: any) => <ScripterPayout {...props} {...this.props}/>}/>
                <Route exact path={`/administration/content`}
                       component={(props: any) => <SiteContentManager {...props} {...this.props}/>}/>
                <Route exact path={`/administration/orders`}
                       component={(props: any) => <OrderManager {...props} {...this.props}/>}/>
                <Route exact path={`/administration/stats`}
                       component={(props: any) => <AdministrationStatsDashboard {...props} {...this.props}/>}/>
                <Route exact path={`/administration/botAds`}
                       component={(props: any) => <AdministrationBotAds {...props} {...this.props}/>}/>
                       
            </Switch>
        )
    }
}
