import React, { Component } from 'react';
import axios from 'axios';

const RewardContext = React.createContext();

export const RewardConsumer = RewardContext.Consumer;

class RewardProvider extends Component {
  state = { rewards: [] }

  getAllRewards = (user_id) => {
    axios.get(`/api/users/${user_id}/rewards`)
      .then( res => {
        this.setState({ rewards: res.data })
      })
      .catch( err => console.log(err) )
  }

  addReward = (user_id, reward) => {
    axios.post(`/api/users/${user_id}/rewards`, { reward } )
      .then( res => {
        const { rewards } = this.state
        this.setState({ rewards: [ ...rewards, res.data ]})
      })
      .catch( err => console.log(err) )
  }

  updateReward = (user_id, id, reward) => {
    axios.put(`/api/users/${user_id}/rewards/${id}`, { reward } )
    .then( res => {
      const rewards = this.state.rewards.map( t => {
        if (t.id === id) {
          return res.data
        }
        return t
      })
      this.setState({ rewards: rewards })
    })
    .catch( err => console.log(err) )
  }

  deleteReward = (user_id, id) => {
    axios.delete(`/api/users/${user_id}/rewards/${id}`)
      .then( res => {
        const { rewards } = this.state
        this.setState({ rewards: rewards.filter( t => t.id !== id )})
      })
      .catch( err => console.log(err) )
  }

  render() {
    return(
      <RewardContext.Provider value={{
        getAllRewards: this.getAllRewards,
        addReward: this.addReward,
        updateReward: this.updateReward,
        deleteReward: this.deleteReward,
      }}>
        { this.props.children }
      </RewardContext.Provider>
    )
  }
}

export default RewardProvider;

