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

import '@material/list/dist/mdc.list.css';
import {List, SimpleListItem} from "@rmwc/list";
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';

import {Button} from "@rmwc/button";
import {Checkbox} from  "@rmwc/checkbox";

import {Link} from 'react-router-dom';


import {Grid, GridCell} from "@rmwc/grid";

import {TextField} from "@rmwc/textfield";

import {Typography} from "@rmwc/typography";
import '@material/typography/dist/mdc.typography.css';
import {Spacer} from "../comp/Spacer";
import {Queue} from "../comp/Queue";
import {
    DataTable,
    DataTableContent,
    DataTableHead,
    DataTableRow,
    DataTableHeadCell,
    DataTableBody, DataTableCell
} from "@rmwc/data-table";
import '@rmwc/data-table/data-table.css';

import Moment from 'react-moment';


export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: new Date()
        };

        let x = new Date();
        setInterval(() => {
          this.setState({now: new Date()});
        }, 1000);
    }
    static contextType = AppContext;

    render() {
        if(! this.context.user.signed_in)
            return (
                <div>
                    <NavBar />

                </div>
            );

        if(this.context.user.signed_in)
        return (
            <div>
                <NavBar/>
                {/*    Content    */}
                <Spacer height={20} />
                <div className={"flex-center"}>
                    <img  className={"updown"} width={"200"} src={(() => {
                        let date = this.state.now;
                        if(date.getHours() > 0 && date.getHours() < 5) return "https://cdn.pixabay.com/photo/2014/04/03/10/21/moon-310151_960_720.png";
                        if(date.getHours() < 12) return "http://pluspng.com/img-png/day-and-night-png-big-image-png-2400.png";
                        if(date.getHours() < 16) return "https://www.pngtube.com/myfile/detail/31-313663_drawing-bun-pineapple-cake-cartoon-tart-clipart-cute.png";
                        return "https://www.clipartwiki.com/clipimg/detail/5-50829_summer-sunset-party-sun-nature-sea-ocean-orange.png";
                    })()} />
                </div>
                <h1 className={"text-center"}>{
                    (() => {
                        if(this.state.now.getHours() > 0 && this.state.now.getHours() < 5) return "Good night";
                        if(this.state.now.getHours() < 12) return "Good morning";
                        if(this.state.now.getHours() < 16) return "Good afternoon";
                        return "Good evening";
                    })()
                } {this.context.user.name.split(" ")[0]}!</h1>
                <Spacer height={5} />
                <p className={"text-center"} style={{fontSize: "24px"}}>Today's Schedule: <b>{this.context.user.schedule.name}</b></p>

                <p className={"text-center"}>{(() => {
                    let next_item = {};
                    for(let x = 0; x < this.context.user.schedule.items.length ; x++){
                        let current_data = this.context.user.schedule.items[x];
                        let start_time = new Date(current_data.start_time);
                        let end_time = new Date(current_data.end_time);

                        if(end_time > this.state.now){
                            if(start_time < this.state.now && this.state.now < end_time ){
                                let seconds_remaining = Math.floor((end_time.getTime() - this.state.now.getTime()) / 1000);
                                let h = Math.floor(seconds_remaining / 3600);
                                let m = Math.floor((seconds_remaining % 3600) / 60);
                                let s = seconds_remaining % 60;
                                return `${current_data.name} will end in ${h}h ${m}m ${s}s`;
                            }

                            if(start_time > this.state.now){
                                let seconds_remaining = Math.floor(( start_time.getTime() - this.state.now.getTime()) / 1000);
                                let h = Math.floor(seconds_remaining / 3600);
                                let m = Math.floor((seconds_remaining % 3600) / 60);
                                let s = seconds_remaining % 60;
                                return <a>The next event <b>{current_data.name}</b> will start in {h}h {m}m {s}s</a>;
                            }
                        }
                    }

                    return "There are no events on your schedule for now.";

                })()}</p>
                <div className={"flex-center"}>
                    <DataTable>
                        <DataTableContent style={{width: "500px"}}>
                            <DataTableBody>
                                {this.context.user.schedule.items.map((v, i) => {
                                    let start_time = new Date(v.start_time);
                                    let end_time = new Date(v.end_time);
                                    if( end_time > this.state.now )
                                    return (
                                        <DataTableRow key={i} activated={start_time < this.state.now && this.state.now < end_time} style={{color: (start_time < this.state.now && this.state.now < end_time ? "#2ecc71": "black")}}>
                                            <DataTableCell alignStart>{v.name}</DataTableCell>
                                            <DataTableCell alignEnd><Moment format="LT">{start_time}</Moment></DataTableCell>
                                        </DataTableRow>
                                    )
                                })}
                            </DataTableBody>
                        </DataTableContent>
                    </DataTable>
                </div>
                <Spacer height={15}/>
                <h3 className={"text-center"}>Todo Items:</h3>
                <div style={{width: "500px", marginLeft: "calc(50% - 250px)"}}>
                    <List twoLine>
                        {
                            this.context.user.todos.map(i => {
                               return (
                                   <ToDoItem data={i}/>
                               )
                            })
                        }
                    </List>
                    <Spacer height={20} />
                    <NewToDo/>
                </div>


            </div>
        )
    }

}

function ToDoItem(props){
    let [checked, setChecked] = React.useState(Boolean(props.data.complete));

    let updateCheck = () => {
        fetch(`/api/todo/${ checked ? "undo" : "complete"}/${props.data.id}`)
            .then(() => setChecked(! checked));
    };

    return (
        <div>
            <SimpleListItem
                graphic={checked ? "radio_button_checked" : "radio_button_unchecked"}
                text={props.data.content}
                secondaryText={<a>Due {new Date(props.data.due).toDateString()}</a>}
                onClick={updateCheck}
            />
        </div>
    )
}

function NewToDo(props) {
    let context = React.useContext(AppContext);
    let [text, setText] = React.useState("");
    let [date, setDate] = React.useState("");
    let submitTodo = () => {
        let data = {content: text, due: date};
        fetch("/api/todo/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        })
            .then(() => context.updateAppContext());
    };

    return (
      <div>
          <TextField style={{width: "100%"}} outlined label="New Todo" value={text} onChange={ev => setText(ev.target.value)}/>
          <Spacer height={5} />
          <TextField type={"date"} outlined value={date} onChange={ev => setDate(ev.target.value)}/>
          <Spacer height={10} />
          <Button raised onClick={submitTodo}>Submit</Button>
      </div>
    );

}

