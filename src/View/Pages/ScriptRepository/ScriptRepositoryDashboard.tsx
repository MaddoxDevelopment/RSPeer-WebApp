import React from 'react';
import {ApiService} from "../../../Common/ApiService";
import {HttpUtil} from "../../../Utilities/HttpUtil";
import {Script, ScriptCategories, ScriptOrderBy, ScriptType, ScriptTypes} from "../../../Models/Script";

type State = {
    scripts: Script[],
    loading: boolean,
    search: string,
    queryType: any,
    orderBy: string,
    category: string,
    [key: string]: any
}

export class ScriptRepositoryDashboard extends React.Component<any, State> {

    private apiService: ApiService;

    constructor(props: any) {
        super(props);
        const queryRaw: any = HttpUtil.getParameterByName("q") || "";
        this.apiService = new ApiService();
        this.state = {
            scripts: [],
            loading: true,
            search: '',
            queryType: ScriptTypes[queryRaw] == null ? 'free' : queryRaw,
            orderBy: 'users',
            category: 'All'
        }
    }

    async componentDidMount() {
        let scripts = await this.apiService.post("script/list", {
            type: this.state.queryType,
            search: this.state.search,
            orderBy: this.state.orderBy,
            //Subtract 1 off index because 'All' is added to beginning of the list.
            category: this.state.category === 'All' ? null : ScriptCategories.indexOf(this.state.category) - 1
        });
        const access : number[] = await this.apiService.get("script/accessIds");
        console.log("ACCESS IDS", access);
        console.log("SCRIPT IDS", scripts.map((s : Script) => s.id))
        if (!Array.isArray(scripts)) {
          return;
        }
        const ids : any = {};
        access.forEach((a : any) => (ids[a] = true));
        console.log(ids);
        scripts = scripts.map((s : Script) => {
            s.doesUserOwn = ids[s.id] === true;
            return s;
        });
        this.setState({scripts, loading: false})
    }

    private setFilter(key: string, value: string) {
        this.setState({
            [key]: value, loading: true
        }, () => {
            this.componentDidMount();
        })
    }

    private setSearch(e: any) {
        if (e.key === 'Enter') {
            this.componentDidMount();
            return;
        }
        this.setState({search: e.target.value})
    }

    render(): any {
        return (<div>
            <div className={"row"}>
                <div>
                    <form className="form-inline">
                        <div className="form-group  mx-sm-1 mb-2">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Script Type: {ScriptTypes[this.state.queryType]}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {Object.keys(ScriptTypes).map(key => {
                                        return <a className="dropdown-item" href="javascript:void(0)" onClick={
                                            () => this.setFilter('queryType', key)}>{ScriptTypes[key]}</a>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="form-group  mx-sm-1 mb-2">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Category: {this.state.category}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {ScriptCategories.map(category => {
                                        return <a className="dropdown-item" href="javascript:void(0)" onClick={
                                            () => this.setFilter('category', category)}>{category}</a>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="form-group  mx-sm-1 mb-2">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Order By: {ScriptOrderBy[this.state.orderBy]}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {Object.keys(ScriptOrderBy).map(key => {
                                        return <a className="dropdown-item" href="javascript:void(0)" onClick={
                                            () => this.setFilter('orderBy', key)}>{ScriptOrderBy[key]}</a>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="form-group  mx-sm-1 mb-2">
                            <div className="input-group input-group-search">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><span className="oi oi-magnifying-glass"/></span>
                                </div>
                                <input type="text" onKeyDown={(e) => this.setSearch(e)}
                                       onChange={(e) => this.setSearch(e)} className="form-control" aria-label="Search"
                                       placeholder="Search Scripts" value={this.state.search}/>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
            <br/>
            {this.state.loading && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>}
            {!this.state.loading && this.state.scripts.length === 0 && <React.Fragment>
                <div className="d-flex justify-content-center">
                    <h3>There are no scripts that match your filter.</h3>
                </div>
            </React.Fragment>}
            {!this.state.loading && <div className="card-columns" style={{columnCount: 4}}>
                {this.state.scripts.map((script: any) => {
                    return <ScriptCard key={script.id} script={script}/>
                })}
            </div>}
        </div>)
    }

}

type ScriptCardProps = {
    script: Script
}

export class ScriptCard extends React.Component<ScriptCardProps, any> {

    private title = {
        fontSize: '1.5em'
    };

    private subTitle = {
        paddingBottom: '8px'
    };

    private button = {
        marginRight: '5px'
    };

    private scriptTypeStyles = () => {
        return {
            color : this.props.script.type == ScriptType.Premium ? '#ea6759' : ''
        }
    };

    private addButtonText = () => {
        if(this.props.script.doesUserOwn) {
            return 'Remove'
        }
        if(this.props.script.price > 0) {
            return 'Purchase'
        }
        return 'Add'
    };

    private addButtonClass = () => {
        if(this.props.script.doesUserOwn) {
            return 'btn btn-danger'
        }
        if(this.props.script.price > 0) {
            return 'btn btn-success'
        }
        return 'btn btn-success'
    };

    render(): any {
        const typeStyles = this.scriptTypeStyles();
        const addButtonText = this.addButtonText();
        const addButtonClass = this.addButtonClass();
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" style={this.title}>{this.props.script.name}</h5>
                    <div>
                        <h6 style={this.subTitle} className="card-subtitle mb-2 text-muted">Type: <span
                            style={typeStyles}>{this.props.script.typeFormatted}</span></h6>
                        <h6 style={this.subTitle}
                            className="card-subtitle mb-2 text-muted">Developer: {this.props.script.author}</h6>
                        <h6 style={this.subTitle} className="card-subtitle mb-2 text-muted">Total
                            Users: {this.props.script.totalUsers}</h6>
                    </div>
                    <p className="card-text">{this.props.script.description}</p>
                    <div className={"btn-toolbar"}>
                        <div className="btn-group" role="group" aria-label="Third group">
                            <button type="button" style={this.button} className={addButtonClass}>{addButtonText}</button>
                        </div>
                        <div className="btn-group" role="group" aria-label="Third group">
                            <button type="button" style={this.button} className={"btn btn-info"}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}