import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';
import {Dashboard} from "./View/Pages/Dashboard";
import {ScriptRepositoryDashboard} from "./View/Pages/ScriptRepository/ScriptRepositoryDashboard";

export class Routes extends React.Component {
    render() : any {
        return (
            <Switch>
                <Route exact path={`/`} component={(props : any) => <Dashboard {...props}/>}/>
                <Route exact path={`/scripts`} component={(props : any) => <ScriptRepositoryDashboard {...props}/>}/>
            </Switch>
        )
    }
}