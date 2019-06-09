// src/App.js

// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
import styled from 'styled-components'

import { listTalks as ListTalks, } from './graphql/queries'
import { deleteTalk as DeleteTalk } from './graphql/mutations'
import * as React from 'react'
import * as Form from './Form'
import { onCreateTalk as OnCreateTalk } from './graphql/subscriptions'
// import query definition

// define some state to hold the data returned from the API
export default class App extends React.Component {
  state = {
    talks: [],
    loading: false
  }

  // execute the query in componentDidMount
  subscription = {}

  // subscribe in componentDidMount
  async componentDidMount() {
    const { data: { listTalks: { items } } } = await API.graphql(graphqlOperation(ListTalks))
    // console.log('talks.data.listTalks', talks.data.listTalks.items)
    await this.setState({ talks: items })
    // console.log('talksInit', talksInit)
    this.subscription = API.graphql(
      graphqlOperation(OnCreateTalk)
    ).subscribe({
      next: (eventData) => {
        console.log('eventData', eventData)
        const talk = eventData.value.data.onCreateTalk
        // if (talk.clientId === Form.CLIENT_ID) return
        const talks = [...this.state.talks, talk]
        console.log('talks', talks)
        this.setState({ talks })
      }
    })
  }
  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  deleteTalk = async (obj) => {
    const { id } = obj
    this.setState({ loading: true })
    const checkResult = await API.graphql(graphqlOperation(DeleteTalk, { input: { id } }))
    console.log('checkResult', checkResult)
    if (checkResult.data.deleteTalk) {
      const talks = this.state.talks.filter(item => item.id !== id)
      await this.setState({ talks, loading: false })
    }
  }


  // add UI in render method to show data
  render() {
    const { talks, loading } = this.state
    return <>
      <Form.default />
      Count Talk : {talks.length}
      <div>
        {
          talks.map((talk, index) => (
            <Wrapper key={index}>
              <h3>Speaker Name : {talk.speakerName}</h3>
              <h5>Name : {talk.name}</h5>
              <p>Talk : {talk.description}</p>
              <button disabled={loading} onClick={e => this.deleteTalk(talk)}> {loading ? 'loading .......' : 'Delete'}</button>
            </Wrapper>
          ))
        }
      </div>
    </>
  }
}
const Wrapper = styled.div`
  display: inline-block;
    background: #d4e9f3;
    padding: 20px;
    margin: 10px;
    border: 1px solid #a2a2a2;

`