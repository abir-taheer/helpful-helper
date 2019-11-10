import React from 'react';

// RMWC Drawer
import { Drawer,DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer";
import '@material/drawer/dist/mdc.drawer.css';

// RMWC TopAppBar
import {SimpleTopAppBar, TopAppBarFixedAdjust} from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

// RMWC List
import {SimpleListItem, CollapsibleList, List} from "@rmwc/list";
import '@material/list/dist/mdc.list.css';
import '@rmwc/list/collapsible-list.css';

// React Router Links for Navigation
import {Link} from "react-router-dom";

// State from Provider
import {AppContext} from "./AppProvider";

import Logo from "./../logo.png";
import {Spacer} from "./Spacer";

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {DrawerIsOpen: false};
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(status = ! this.state.DrawerIsOpen ) {
        this.setState({
            DrawerIsOpen: status
        });
    }

    render () {
        return (
            <div>
                <Drawer modal open={this.state.DrawerIsOpen} onClose={() => this.toggleDrawer(false)}>
                    <AppContext.Consumer>
                        {(context) => {
                            return (
                                <DrawerHeader>
                                    <Spacer height={"20px"} />
                                    <img src={Logo} style={{height: "4em"}}/>
                                    <DrawerTitle><a  className={"oswald"}>{context.app_title}</a></DrawerTitle>
                                    <DrawerSubtitle>{context.user.signed_in ? "Signed in as " + context.user.name : "Not Signed In"}</DrawerSubtitle>
                                </DrawerHeader>
                            );
                        }}
                    </AppContext.Consumer>
                    <DrawerContent>
                        <List>
                            {/*LogIn Button*/}
                            <AppContext.Consumer>
                                {(context) => {
                                    return ( ! context.user.signed_in) ?
                                        (<Link to="/login" className={["no-decoration"]}>
                                            <SimpleListItem
                                                text="Sign In / Sign Up"
                                                graphic="lock_open"
                                            />
                                        </Link>) :
                                        null;
                                }}
                            </AppContext.Consumer>

                            <Link to="/" className={["no-decoration"]}>
                                <SimpleListItem
                                    text="Home"
                                    graphic="home"
                                />
                            </Link>

                            <AppContext.Consumer>
                                {
                                    (context) => {
                                        if(context.user.signed_in)
                                            return (
                                                <div>
                                                    <Link to="/profile" className={["no-decoration"]}>
                                                        <SimpleListItem
                                                            text="Profile"
                                                            graphic="person"
                                                        />
                                                    </Link>
                                                    <Link to="/analytics" className={["no-decoration"]}>
                                                        <SimpleListItem
                                                            text="Analytics"
                                                            graphic="multiline_chart"
                                                        />
                                                    </Link>
                                                </div>
                                            );
                                    }
                                }
                            </AppContext.Consumer>


                            {/*LogOut Button*/}
                            <AppContext.Consumer>
                                {(context) => {
                                    function logOut() {
                                        fetch("/auth/logout")
                                            .then(response => response.json())
                                            .then(() => {
                                                context.updateAppContext();
                                            });
                                    }
                                    return (context.user.signed_in) ?
                                        (<div>
                                            <SimpleListItem
                                                text="Sign Out"
                                                graphic="power_settings_new"
                                                onClick={logOut}
                                            />
                                        </div>) :
                                        null;
                                }}
                            </AppContext.Consumer>
                        </List>
                    </DrawerContent>
                </Drawer>

                <AppContext.Consumer>
                    {
                        (context) => {
                            return (
                                <SimpleTopAppBar
                                    style={{
                                        color: "black"
                                    }}
                                    title={<a  className={"oswald"}>{context.app_title}</a>}
                                        navigationIcon={{ onClick: () => this.toggleDrawer() }}
                                />
                            )
                        }
                    }
                </AppContext.Consumer>
                <TopAppBarFixedAdjust />
            </div>
        );
    }
}
