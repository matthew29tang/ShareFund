import React, { Component } from 'react';
import logo from './logo.svg';
import './Dashboard.css';

import ETFComponent from './ETFComponent';

class Dashboard extends Component {

    constructor() { 
        super(); 
        this.state = { 
            stockData: [] 
        }
    }
    
    componentDidMount() { 
        
        //fetch the result from the api. 
        fetch("./getState")
            .then(results => { 
                results.json(); 
            }).then(data => { 

                let ETFList = Object.keys(data.results).map(key => { 

                    let buyCount  = data.results[key].votes.buy.length; 
                    let holdCount = data.results[key].votes.hold.length; 
                    let sellCount = data.results[key].votes.hold.length; 

                    let price = data.results[key].price; 
                    let quantity = data.results[key].quantity; 
                    let equity   = quantity * price; 
                    
                    return (<ETFComponent
                                etfname="{key}" 
                                quantity="{quantity}" 
                                equity="{equity}" 
                                buyCount="{buyCount}" 
                                holdCount="{holdCount}" 
                                sellCount="{sellCount}" 
                            />); 
                                

                }); 

                this.setState({stockData: ETFList}); 
            });

    }

  render() {
    return (
      <div className="Dashboard">





      </div>
    );
  }
}

export default Dashboard;
