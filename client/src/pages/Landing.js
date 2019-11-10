import React from 'react';
import {NavBar} from "../comp/NavBar";
import {AppContext} from "../comp/AppProvider";
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {Card, CardMedia, CardPrimaryAction} from '@rmwc/card';
import '@material/layout-grid/dist/mdc.layout-grid.css';

import {Link} from 'react-router-dom';


import {Grid, GridCell} from "@rmwc/grid";

import {TextField} from "@rmwc/textfield";

import {Typography} from "@rmwc/typography";
import '@material/typography/dist/mdc.typography.css';
import {Spacer} from "../comp/Spacer";
import {Queue} from "../comp/Queue";

export class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    static contextType = AppContext;

    componentDidMount() {
        this.getPlaces();
    }

    render() {
        return (
            <div>
                <NavBar/>
                {/*    Content    */}

            </div>
        )
    }

}
