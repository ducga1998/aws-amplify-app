// src/App.js

// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
import styled from 'styled-components'

import { listTalks as ListTalks, } from './graphql/queries'
import { deleteTalk as DeleteTalk } from './graphql/mutations'
import * as React from 'react'
import * as Form from './Form'

// import query definition

// define some state to hold the data returned from the API
export default class App extends React.Component {
  state = {
    talks: [],
    loading: false
  }

  // execute the query in componentDidMount
  async componentDidMount() {
    try {
      const talkData = await API.graphql(graphqlOperation(ListTalks))
      console.log('talkData:', talkData)
      this.setState({
        talks: talkData.data.listTalks.items
      })
    } catch (err) {
      console.log('error fetching talks...', err)
    }
  }
  deleteTalk = async (obj) => {
    const { id } = obj
    this.setState({loading : true})
    const checkResult = await API.graphql(graphqlOperation(DeleteTalk, { input: { id } }))
    console.log('checkResult', checkResult)
    if (checkResult.data.deleteTalk) {
      const talks = this.state.talks.filter(item => item.id !== id)
      await this.setState({ talks,loading : false })
    }
  }


  // add UI in render method to show data
  render() {
    const { talks, loading } = this.state
    return <>
      <Form.default />``
      <div>
        {
          talks.map((talk, index) => (
            <Wrapper key={index}>
              <h3>Speaker Name : {talk.speakerName}</h3>
              <h5>Name : {talk.name}</h5>
              <p>Talk : {talk.description}</p>
              <button onClick={e => this.deleteTalk(talk)}> {loading ? 'loading .......' : 'Delete'}</button>
            </Wrapper>
          ))
        }
      </div>
    </>
  }
}
const Wrapper = styled.div`
 background: #d4e9f3;
    padding: 20px;
    border: 1px solid #a2a2a2;
`