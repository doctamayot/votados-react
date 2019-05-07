import { createStore, applyMiddleware } from 'redux';


const reducer = (state, action) => {
    if (action.type === "setVote") {
        return {
            ...state,
            posts: action.posts
        } 
    } else if (action.type === "changeOrder") {
        return {
            ...state,
            posts: action.posts,
            desBut: action.desBut,
            ascBut: action.ascBut
        } 
    }
    return state;
}

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }

export default createStore(reducer, applyMiddleware(logger));