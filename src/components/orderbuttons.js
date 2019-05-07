import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import posts from './posts'
import store from "../store";

class Buttons extends Component {
    constructor() {
      super();
      this.state = {
        posts: posts.sort(this.compare),
        ascBut: "default",
        desBut: "primary"
      }
      store.subscribe(() => {
        this.setState({
          posts: store.getState().posts,
          desBut: store.getState().desBut,
          ascBut: store.getState().ascBut
        })
      })
    }
    compare = (a,b) => {
      if (a.votes < b.votes)
        return -1;
      if (a.votes > b.votes)
        return 1;
      return 0;
    }
    orderAscendent = () => {
      var desBut = "default"
      var ascBut = "primary"
      var posts = this.state.posts.sort(this.compare).reverse()
      this.changeOrder(desBut, ascBut, posts)
    }
    orderDescendent = () => {
      var desBut = "primary"
      var ascBut = "default"
      var posts = this.state.posts.sort(this.compare)
      this.changeOrder(desBut, ascBut, posts)
      
    }
    changeOrder(desBut, ascBut, posts) {    
      store.dispatch( {
        type: "changeOrder",
        posts: posts,
        desBut: desBut,
        ascBut: ascBut
      })
    }

    render() {
        return (  
            <div className="general-grid">
            <p>Orden: 
              <Button className="boton" bsStyle={this.state.ascBut} onClick={this.orderAscendent}>Ascendente</Button>
              <Button className="boton" bsStyle={this.state.desBut} onClick={this.orderDescendent}>Descendente</Button>
            </p>
          </div>
        );
  }
}
export default Buttons;
