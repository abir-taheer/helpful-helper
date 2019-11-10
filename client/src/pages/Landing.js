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
        this.state = {
            search: "",
            items: [],
            edited: false
        };

        this.getPlaces = () => {
          fetch(`/api/places/nearby?lat=${encodeURIComponent(this.context.latt)}&long=${encodeURIComponent(this.context.long)}`)
              .then(res => res.json())
              .then(data => {
                  this.setState({items: data});
                  console.log(data);
              });
        };

        this.setSearch = (ev) => {
            this.setState({search: ev.target.value, edited: true});
        };

        this.checkEnter = ev => {
            if(ev.key === 'Enter'){
                this.performSearch().then(
                  () => this.getPlaces()
                );
            }
        };

        this.performSearch = () => {
            return new Promise(resolve => {
                fetch(
                  `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${encodeURIComponent(this.state.search)}`
                )
                  .then(res => res.json())
                  .then(data => {
                      if(data.records.length){
                          this.context.updateLatLong(data.records[0].fields.latitude, data.records[0].fields.longitude);
                          resolve();
                      } else {
                          Queue.notify({
                              body: "We could not find that location. Please try a zip code.",
                              actions: [
                                  {
                                      "icon": "close"
                                  }
                              ]
                          });
                      }
                  })
            });
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.getPlaces();
    }

    render() {
        return (
            <div>
                <NavBar/>
                <AppContext.Consumer>
                    {(context) => (
                        <div>
                            <h1 className={["text-center"]}>Hello {context.user.name || "Guest"} </h1>
                            <TextField outlined label="Search for a neighborhood or a zip code"
                                       style={{
                                           width: "80vw",
                                           marginLeft: "10vw"
                                       }}
                                       value={this.state.search}
                                       onKeyUp={this.checkEnter}
                                       onChange={this.setSearch}
                            />
                            <Spacer height={"10px"} />
                            <iframe
                                style={{
                                    width: "80vw",
                                    height: "500px",
                                    border: "0",
                                    borderRadius: "25px",
                                    marginLeft: "10vw"
                                }}
                                src={`https://maps.google.com/maps?q=${context.latt},${context.long}&hl=es;zoom=10&output=embed`}
                            >
                            </iframe>
                        </div>
                    )}
                </AppContext.Consumer>
                <p style={{
                    textAlign: "center"
                }}>Things people have asked for near you: </p>
                <Grid
                    style={{
                        width: "80vw",
                        marginLeft: "10vw"
                    }}
                >
                    {
                        this.state.items.map((item) => {
                            return (
                              <GridCell span={4}>
                                <Card>
                                    <Link to={`/view/${item.id}`}>
                                    <CardPrimaryAction>
                                      <CardMedia
                                        sixteenByNine
                                        style={{
                                            backgroundImage: `url(/static/suggest_img/${item.id})`
                                        }}
                                      />
                                      <div style={{ padding: '0 1rem 1rem 1rem' }}>
                                        <Typography use="headline6" tag="h2">
                                            {item.name}
                                        </Typography>
                                      </div>
                                    </CardPrimaryAction>
                                    </Link>
                                </Card>
                              </GridCell>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }

}
