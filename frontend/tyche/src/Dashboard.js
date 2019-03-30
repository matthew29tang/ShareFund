import React, { Component } from 'react';
import './Dashboard.css';
import Globals from './globals.js'
import ETFComponent from './ETFComponent';

class Dashboard extends Component {

    constructor() { 
        super(); 
        this.state = { 
            stockData: [] 
        }
    }
    
    
    componentDidMount() { 

        /*
        let dummy = { 
            SPY: { 
                votes: {
                    buy: [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    hold: [1, 1],
                    sell: [1, 1, 1, 1, 1 ], 
                },
                quantity: 400, 
                price: 49.21
            },
            VPX: { 
                votes: {
                    buy: [1, 1, 1,],
                    hold: [],
                    sell: [1], 
                },
                quantity: 800, 
                price: 19.21
            },
            VOX: { 
                votes: {
                    buy: [1, 1, 1,],
                    hold: [],
                    sell: [1], 
                },
                quantity: 800, 
                price: 19.21
            },
        }
        
        
        let ETFList = Object.keys(dummy).map(key => { 

            let buyCount  = dummy[key].votes.buy.length; 
            let holdCount = dummy[key].votes.hold.length; 
            let sellCount = dummy[key].votes.sell.length; 

            let price = dummy[key].price; 
            let quantity = dummy[key].quantity; 
            let equity   = quantity * price; 
            
            return (<ETFComponent
                        etfname={key}
                        quantity={quantity}
                        equity={equity} 
                        buyCount={buyCount} 
                        holdCount={holdCount}
                        sellCount={sellCount}
                    />); 

        }); 

        this.setState({stockData: ETFList}); 

        */
        //fetch the result from the api. 
        console.log("hello?");
        fetch(Globals.host + "getState")
            .then(results => { 
                console.log(results);
                results.json(); 
            }).then(data => { 

                let ETFList = Object.keys(data.results).map(key => { 

                    let buyCount  = data.results[key].votes.buy.length; 
                    let holdCount = data.results[key].votes.hold.length; 
                    let sellCount = data.results[key].votes.sell.length; 

                    let price = data.results[key].price; 
                    let quantity = data.results[key].quantity; 
                    let equity   = quantity * price; 
                    
                    return (<ETFComponent
                                etfname={key}
                                quantity={quantity}
                                equity={equity} 
                                buyCount={buyCount} 
                                holdCount={holdCount}
                                sellCount={sellCount}
                            />); 

                }); 
                this.setState({stockData: ETFList}); 
            });
            

    }

  render() {
    return (
      <div className="dash-wrapper">
        <div className="container"> 
            {this.state.stockData}
        </div> 
      </div>
    );
  }
}

export default Dashboard;
