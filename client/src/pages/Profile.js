import React from "react";
import {NavBar} from "../comp/NavBar";

import {Avatar} from "@rmwc/avatar";
import '@rmwc/avatar/avatar.css';
import {AppContext} from "../comp/AppProvider";


export class Profile extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <NavBar />
                <h1 className={"text-center"}>Profile</h1>
                <AppContext.Consumer>
                    {(context) => {
                        return (
                            <div className={"text-center"}>
                                <div className={"flex-center"}>
                                    <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(context.user.name)}&size=512`} style={{width: "8em", height: "8em"}} />
                                </div>
                                <h3>Name: {context.user.name}</h3>
                                <h3>Email: {context.user.email}</h3>
                                <h3>Phone Number(s):</h3>
                                <div className={"sub-container"}>
                                    {(context.user.phone_numbers.length ? context.user.phone_numbers : []).map(i => <p>{i.toString().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1)$2-$3')}</p>)}
                                </div>
                            </div>
                        )
                    }}

                </AppContext.Consumer>
            </div>
        )
    }

}