import React, { Component } from 'react';
import logo from './logo.svg';
import './Dashboard.css';

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
            }).then (data => { 

                Object.keys(data.results).map(key => { 

                    let buyCount  = data.results[key].votes.buy.length; 
                    let holdCount = data.results[key].votes.hold.length; 
                    let sellCount = data.results[key].votes.hold.length; 

                    let price = data.results[key].price; 
                    let quantity = data.results[key].quantity; 
                    
                    < 

                }); 

                let item = data.results.map(); 
            })

    }

  render() {
    return (
      <div className="Dashboard">





      </div>
    );
  }
}

export default Dashboard;
