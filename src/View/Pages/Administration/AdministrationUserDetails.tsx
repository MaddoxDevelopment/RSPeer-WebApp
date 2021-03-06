import React from 'react';
import {OwnerPageWrapper} from "../../Components/OwnerPage/OwnerPageWrapper";
import {AddRemove, User} from "../../../Models/User";
import {ApiService} from "../../../Common/ApiService";
import {Util} from "../../../Utilities/Util";
import {Alert} from "../../../Utilities/Alert";
import {Order} from "../../../Models/Order";
import {BalanceChange} from "../../../Models/BalanceChange";
import {OrderService} from "../../../Services/Store/OrderService";
import {UserCenterViewScriptAccess} from "../UserCenter/UserCenterViewScriptAccess";

type State = {
    query: string,
    user: User | null,
    results: User[]
}

export class AdministrationUserDetails extends React.Component<any, State> {

    private readonly api: ApiService;

    constructor(props: any) {
        super(props);
        this.api = new ApiService();
        this.state = {
            query: '',
            user: null,
            results: [],
        }
    }

    onQueryChange = (e: any) => {
        this.setState({query: e.target.value})
    };

    onKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            this.searchUsers();
            return;
        }
    };

    searchUsers = async () => {
        if (!this.state.query) {
            return this.setState({user: null, results: []});
        }
        const results = await this.api.get(`adminUser/search?term=${this.state.query}`);
        this.setState({results});
        if (results.length === 0) {
            Alert.show("No results found for that query. Searched username, email, discord accounts, and user ids.");
        }
    };

    setUser = async (user: User) => {
        if(!user) {
            return;
        }
        const fullUser: User = await this.api.get(`user/byId?id=${user.id}&groups=true`);
        localStorage.setItem("adminUserSearch", JSON.stringify(fullUser));
        this.setState({user: fullUser, results: []});
    };
    
    async componentDidMount() {
        if(this.props.userId) {
            const fullUser: User = await this.api.get(`user/byId?id=${this.props.userId}&groups=true`);
            this.setState({user: fullUser, results: []});
        }
    }

    render() {
        return <OwnerPageWrapper {...this.props}>
            <h6>Search Users by Username, Email, Discord Username, Discord Discriminator, User Id, or Paypal Transactions</h6>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Query"
                       aria-label="Query"
                       onChange={this.onQueryChange} onKeyDown={this.onKeyPress} aria-describedby="basic-addon1"
                       value={this.state.query}/>
            </div>
            {this.state.results.length > 0 && <div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Discord</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.results.map(u => {
                            return (<tr>
                                <td>{u.id}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.discordAccount != null ? `${u.discordAccount.discordUsername}#${u.discordAccount.discriminator}` : ''}</td>
                                <td>{u.balance}</td>
                                <td><a href="javascript:void(0)" onClick={() => this.setUser(u)}>View Details</a></td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>}
            {this.state.user && <div>
                <UserDetailsTabs user={this.state.user} reloadUser={() => this.setUser(this.state.user!)}/>
            </div>}
        </OwnerPageWrapper>
    }
}

type Props = {
    user: User,
    reloadUser : () => any
}

class UserDetailsTabs extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    setSelected = (index: number) => {
        this.setState({selected: index})
    };

    render() {
        return (
            <React.Fragment>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a onClick={() => this.setSelected(0)} className="nav-link active" id="home-tab"
                           data-toggle="tab" href="#home" role="tab"
                           aria-controls="home" aria-selected="true">Home</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.setSelected(1)} className="nav-link" id="orders-tab" data-toggle="tab"
                           href="#orders" role="tab"
                           aria-controls="orders" aria-selected="false">Orders</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.setSelected(2)} className="nav-link" id="balancechanges-tab" data-toggle="tab"
                           href="#balancechanges" role="tab"
                           aria-controls="balancechanges" aria-selected="false">Balance Changes</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.setSelected(3)} className="nav-link" id="runescapeclients-tab" data-toggle="tab"
                           href="#runescapeclients" role="tab"
                           aria-controls="runescapeclients" aria-selected="false">Online Clients</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.setSelected(4)} className="nav-link" id="scripts-tab" data-toggle="tab"
                           href="#scripts" role="tab"
                           aria-controls="scipts" aria-selected="false">Scripts Added</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div style={{marginTop: '15px'}}>
                            {this.state.selected === 0 && <div><UserDetails user={this.props.user!} reloadUser={this.props.reloadUser}/></div>}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                        {this.state.selected === 1 && <div><OrdersView user={this.props.user!} reloadUser={this.props.reloadUser}/></div>}
                    </div>
                    <div className="tab-pane fade" id="balancechanges" role="tabpanel" aria-labelledby="balancechanges-tab">
                        {this.state.selected === 2 && <div><BalanceChanges user={this.props.user!} reloadUser={this.props.reloadUser}/></div>}
                    </div>
                    <div className="tab-pane fade" id="runescapeclients" role="tabpanel" aria-labelledby="runescapeclients-tab">
                        {this.state.selected === 3 && <div><RunescapeClients user={this.props.user!} reloadUser={this.props.reloadUser}/></div>}
                    </div>
                    <div className="tab-pane fade" id="scripts" role="tabpanel" aria-labelledby="scripts-tab">
                        {this.state.selected === 4 && <div><Scripts user={this.props.user!} reloadUser={this.props.reloadUser}/></div>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

class UserDetails extends React.Component<Props, any> {

    private readonly api: ApiService;

    constructor(props: Props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            ipAddresses : []
        }
    }

    async componentDidMount() {
        const ipAddresses = await this.api.post("adminUser/ipAccess", {
            userId : this.props.user.id
        });
        this.setState({ipAddresses});
    }

    disableUser = async () => {
        const user = this.props.user;
        const res = await this.api.post("adminUser/disable", {
            userId : user.id,
            disabled : !user.disabled
        });
        if(res.error) {
            Alert.show(res.error);
        }
        this.props.reloadUser();
    };

    updateBalance = async (add : boolean) => {
        const user = this.props.user;
        const prompt : string | null = window.prompt(`How much would you like to ${add ? 'add' : 'remove'}?`);
        if(!prompt) {
            return;
        }
        const amount = parseInt(prompt);
        if(isNaN(amount)) {
            return Alert.show("Invalid amount. Must be a number.")
        }
        const reason = window.prompt(`Please include a reason or any additional metadata related to this balance change.`);
        if(!reason) {
            return Alert.show("A reason is required to update balance.");
        }
        const res = await this.api.post("adminUser/updateBalance", {
            userId : user.id,
            amount,
            type : add ? AddRemove.Add : AddRemove.Remove,
            reason : reason
        });
        if(res.error) {
            return Alert.show(res.error);
        }
        this.props.reloadUser();
    };

    render() {
        const user = this.props.user;
        return <div>
            <p>Id: <strong>{user.id}</strong></p>
            <p>Username: <strong>{user.username}</strong></p>
            <p>Email: <strong>{user.email}</strong></p>
            <p>Balance: <strong>{Util.formatNumber(user.balance.toString())}</strong></p>
            <p>Groups: <strong>{user.groups.map(w => w.name).join(" , ")}</strong></p>
            <p>Ip Addresses: <strong>{this.state.ipAddresses.join(" , ")}</strong></p>
            <button type="button" className="btn btn-success button-spacing" onClick={() => this.updateBalance(true)}>Add Balance</button>
            <button type="button" className="btn btn-danger button-spacing" onClick={() => this.updateBalance(false)}>Remove Balance</button>
            {!user.disabled && <button type="button" className="btn btn-danger button-spacing" onClick={this.disableUser}>Disable User</button>}
            {user.disabled && <button type="button" className="btn btn-success button-spacing" onClick={this.disableUser}>Enable User</button>}
            <div style={{marginTop : '5px'}}>
                <p><strong>Note: </strong>If you are refunding a purchase, please do not add tokens here. Instead, click on Orders and refund it there.</p>
            </div>
        </div>
    }
}

class OrdersView extends React.Component<Props, any> {

    private readonly api: ApiService;

    constructor(props: Props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            orders: [],
            refunding: 0
        }
    }

    async componentDidMount() {
        const orders = await this.api.post("adminOrder/list", {
            userId: this.props.user.id,
            includeItem: true
        });
        Array.isArray(orders) && this.setState({orders});
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.user.id != this.props.user.id) {
            this.componentDidMount();
        }
    }

    refund = async (order: Order) => {
        const confirm = await window.confirm("Are you sure you want to refund this order?");
        if(!confirm) {
            return;
        }
        const doRefund = async () => {
            this.setState({refunding: order.id});
            const refund = await this.api.post("adminOrder/refund", {
                orderId: order.id
            });
            if (refund.error) {
                this.setState({refunding: 0});
                return Alert.show(refund.error);
            }
            this.setState((prev : any) => {
                const index = prev.orders.indexOf(order);
                order.isRefunded = true;
                prev.orders[index] = order;
                return prev;
            });
            this.setState({refunding: 0});
        };
        
        if(order.item.sku === "tokens") {
            Alert.modal({
                title : `Refunding ${order.item.name}`,
                width : 50,
                body : <div>
                    <p>To refund tokens, you must manually refund the paypal via paypal.com</p>
                    <p>Please click OK below once you have done so. <strong>DO NOT</strong> accept this if you did not manually refund the paypal.</p>
                    <p>Paypal Order Id: <strong>{order.paypalId}</strong></p>
                </div>,
                onConfirm : doRefund
            })
        }
        else {
            await doRefund();
        }
    };

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Paypal Id</th>
                            <th scope="col">Item</th>
                            <th scope="col">Item Sku</th>
                            <th scope="col">Total</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Recurring</th>
                            <th scope="col">Paid Out</th>
                            <th scope="col">Refunded</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((o: any) => {
                            return (<tr>
                                <td>{o.id}</td>
                                <td>{o.paypalId}</td>
                                <td>{o.item && o.item.name}</td>
                                <td>{o.item && o.item.sku}</td>
                                <td>{o.total}</td>
                                <td>{o.quantity}</td>
                                <td>{o.recurring ? 'Yes' : 'No'}</td>
                                <td>{o.isPaidOut ? 'Yes' : 'No'}</td>
                                <td>{o.isRefunded ? 'Yes' : 'No'}</td>
                                <td>{o.statusFormatted}</td>
                                <td>{Util.formatDate(o.timestamp, true)}</td>
                                {!o.isRefunded && <th scope="col">
                                    <button className={"btn btn-danger"} onClick={() => this.refund(o)}>
                                        {this.state.refunding === o.id ? 'Processing...' : 'Refund'}
                                    </button>
                                </th>}
                                {o.isRefunded && <th scope="col">
                                    <p>N/A</p>
                                </th>}
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

class BalanceChanges extends React.Component<Props, any> {

    private readonly api: ApiService;
    private readonly orderService : OrderService;

    constructor(props: Props) {
        super(props);
        this.api = new ApiService();
        this.orderService = new OrderService(this.api);
        this.state = {
            changes: []
        }
    }

    async componentDidMount() {
        const changes = await this.api.post("adminUser/balanceChanges", {
            userId: this.props.user.id,
            includeAdminUser : true
        });
        this.setState({changes});
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.user.id != this.props.user.id) {
            this.componentDidMount();
        }
    }

    showOrder = async (e : any, orderId : number) => {
        e.preventDefault();
        await this.orderService.showOrder(orderId);
    };

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Old Balance</th>
                            <th scope="col">New Balance</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">By Admin</th>
                            <th scope="col">Reason</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.changes.map((o: BalanceChange) => {
                            o.difference = o.newBalance - o.oldBalance;
                            return (<tr>
                                <td>{Util.formatDate(o.timestamp, true)}</td>
                                <td>
                                    <span style={{color : o.difference < 0 ? '#ea6759' : '#0de25a'}}>{Util.formatNumber(o.difference.toString())}</span>
                                </td>
                                <td>{Util.formatNumber(o.oldBalance.toString())}</td>
                                <td>{Util.formatNumber(o.newBalance.toString())}</td>
                                {o.orderId != 0 && <td><a href={"javascript:void(0)"} onClick={(e) => this.showOrder(e, o.orderId)}>View Order ({o.orderId})</a></td>}
                                {o.orderId == 0 && <td>N/A</td>}
                                <td>{o.adminUser != null ? o.adminUser.username : (o.adminUserId || '')}</td>
                                <td>{o.reason}</td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

class RunescapeClients extends React.Component<Props, any> {

    private readonly api: ApiService;

    constructor(props: Props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            clients: []
        }
    }

    async componentDidMount() {
        const clients = await this.api.get("adminClient/runningClients?userId=" + this.props.user.id);
        if(Array.isArray(clients)) {
            this.setState({clients});
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.user.id != this.props.user.id) {
            this.componentDidMount();
        }
    }
    
    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th scope="col">RSN</th>
                            <th scope="col">Email</th>
                            <th scope="col">Script</th>
                            <th scope="col">Script Developer</th>
                            <th scope="col">Repository Script</th>
                            <th scope="col">Machine</th>
                            <th scope="col">OS</th>
                            <th scope="col">Proxy Ip</th>
                            <th scope="col">Ip</th>
                            <th scope="col">Main Class</th>
                            <th scope="col">Last Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.clients.map((o: any) => {
                            return (<tr>
                                <td>{o.rsn}</td>
                                <td>{o.runescapeEmail}</td>
                                <td>{o.scriptName}</td>
                                <td>{o.scriptDeveloper}</td>
                                <td>{o.isRepoScript ? 'Yes' : 'No'}</td>
                                <td>{o.machineName} - {o.machineUsername}</td>
                                <td>{o.operatingSystem}</td>
                                <td>{o.proxyIp}</td>
                                <td>{o.ip}</td>
                                <td>{o.scriptClassName}</td>
                                <td>{Util.formatDate(o.lastUpdate, true)}</td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

class Scripts extends React.Component<Props, any> {

    render() {
        return <div style={{marginTop : '15px'}}>
            <UserCenterViewScriptAccess key={this.props.user.id} user={this.props.user} isAdmin={true}/>
        </div>
    }
}