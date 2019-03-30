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

        
        fetch(Globals.host + "getState", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            
            })
            .then(results => { 
                return results.json(); 
            }).then(data => { 
              
                let ETFList = Object.keys(data.funds).map(key => { 

                    let buyCount  = data.funds[key].votes.buy; 

                    console.log(data.funds[key]);
                    let holdCount = data.funds[key].votes.hold; 
                    let sellCount = data.funds[key].votes.sell; 

                    let price = data.funds[key].price; 
                    let quantity = data.funds[key].quantity; 
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
