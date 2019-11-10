import React from "react";
import { Chart } from 'react-charts'
import {NavBar} from "../comp/NavBar";
import ApexCharts from 'apexcharts'
import {Spacer} from "../comp/Spacer";


export class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphData: [{
                label: 'Series 1',
                data: [{x: 1573415490000, y: 10},{x: 1572980917000, y: 16},{x: 1573240118000, y: 14},{x: 1572545319000,y: 14},{x: 1572815317000,y: 16}]
            },
                {
                    label: 'Series 2',
                    data: [{x: 1573415490000, y: 14.3},{x: 1572980917000, y: 14.3},{x: 1573240118000, y: 14.3},{x: 1572545319000,y: 14.4},{x: 1572815317000,y: 14.3}]
                }],
            accuracy: 0,
            average: 0
        }
    }

    componentDidMount() {
        fetch("/api/todo/analytics")
            .then(res => res.json())
            .then(data => {
                let graphData = [];
                let original = {};
                original.label = "Series 1";
                original.data = data.original;

                let predictions = {};
                predictions.label = "Series 2";
                predictions.data = [];


                predictions.data = data.predictions;

                graphData.push(original);
                graphData.push(predictions);

                let sum_predictions = 0;
                for(let x = 0 ; x < data.predictions.length; x++){
                    sum_predictions += data.predictions[x][1];
                    console.log(data.predictions[x]);
                }
                let average = sum_predictions / 5;

                console.log(graphData);
                console.log(JSON.stringify(graphData));
                this.setState({graphData: graphData, average: average, accuracy: data.accuracy});
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Spacer height={20} />
                <h3 className={"text-center"}>Todo Completion Graph</h3>
                <div className={"flex-center"}>
                    <DataChart data={this.state.graphData}/>
                </div>
                <p className={"text-center"}>You should work around {Math.floor(this.state.average * 10) / 10}h o'clock for best consistency.</p>
                <p className={"text-center"}><a style={{color: "Red"}}>Linear Regression</a></p>
                <p className={"text-center"}><a style={{color: "Blue"}}>Actual Data</a></p>
                <p className={"text-center"}>You should work around {Math.floor(this.state.average)}h o'clock for best consistency.</p>
            </div>
        );
    }

}

function DataChart(props) {

    const data = React.useMemo(
        () => props.data,
        []
    );



    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom', minimum: 0 },
            { type: 'linear', position: 'left' }
        ],
        []
    );

    return (
        <div>
            <div
                style={{
                    width: '600px',
                    height: '400px'
                }}
            >
                <Chart data={data} axes={axes} />
            </div>
        </div>
    )
}