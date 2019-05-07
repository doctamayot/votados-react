import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import posts from './posts'
import store from "../store";

class Votes extends Component {
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
    voteArrows = (e) => {
      const index = this.state.posts.map(function(e) { return e.id; }).indexOf(Math.floor(e.target.id))
      var postVotes = this.state.posts[index].votes
      e.target.classList.contains("glyphicon-triangle-top") ? postVotes += 1 : postVotes -= 1
      var newPosts = this.state.posts.map((post, i) => i === index ? {id: post.id, title: post.title, description: post.description, url: post.url, votes: postVotes, writer_avatar_url: post.writer_avatar_url, post_image_url: post.post_image_url,} : post)
      
      var posts = this.state.desBut === "primary" ? newPosts.sort(this.compare) : newPosts.sort(this.compare).reverse()
      this.setVote(posts)
      
    }
    setVote(posts) {    
      store.dispatch( {
        type: "setVote",
        posts
      })
    }
    render() {
        return (
            <div>
            {this.state.posts.map((post, index) =>  
                <Row className="posts-grid" key={post.id}>
                  <Col xs={4}><a href={post.url}><img alt={ post.id } className="image" src={ post.post_image_url } /></a></Col>
                  <Col className="votes" xs={1}>
                    <span onClick={this.voteArrows} id={post.id} className="glyphicon glyphicon-triangle-top arrow" aria-hidden="true" />
                    {post.votes}
                    <span onClick={this.voteArrows} id={post.id} className="glyphicon glyphicon-triangle-bottom arrow" aria-hidden="true" />
                  </Col>
                  <Col xs={7}><a href={post.url}><p>{ post.title }</p></a><p>{ post.description }</p><p className="writtenby">Escrito por: <img alt={ post.id } className="authoravatar" src={ post.writer_avatar_url } /></p></Col>
                </Row>
                )}
            </div>

        )
    }

}

export default Votes;
