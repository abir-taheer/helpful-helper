import React from "react";
import {NavBar} from "../comp/NavBar";
import {AppContext} from "../comp/AppProvider";
import {Spacer} from "../comp/Spacer";

export function Error404(props){
    const context = React.useContext(AppContext);
    return (
        <div>
            <NavBar/>
            <Spacer height={"50px"} />
            <h1 className={"text-center"}>Hey {context.user.name || "there" }! We couldn't seem to find that page &#x1f61e;</h1>
            <div className={"flex-center"}>
              <img src={"https://curiouscat.me/img/nabi_sad.a2d37d21.png"} />
            </div>
        </div>
    )
}