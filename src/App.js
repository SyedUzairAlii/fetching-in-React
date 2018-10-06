import React, { Component } from 'react';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      list: [],
      count: 0,

    }
    this.search = this.search.bind(this)
  }

    search(){
      const { text, list, count } = this.state;
      const PATH_BASE = 'https://hn.algolia.com/api/v1';
      const PATH_SEARCH = '/search';
      const PARAM_SEARCH = 'query=';
      const PARAM_PAGE = 'page=';
      const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${text}&${PARAM_PAGE}${count}`;
      fetch(url)
      .then(function (myJson){
        return myJson.json();
      })
      .then((success)=>{
        success.hits.map(item =>{
          return list.push(item)
        })
        this.setState({list})
      })
    }

  render() {
    const { text, list, count } = this.state;

    return (

      <div className="App">
        <input placeholder="search here" onChange={e => { this.setState }} />

        <br />


        <button onClick={this.search}>Search</button>

        <ul>
          {
            list.map(items =>{
              return <li>{items.title}</li>
            })
          }
        </ul>
        <button onClick = {()=>this.setState({count : count+1})}>Add more</button>
      </div>
    );
  }

}
export default App;
