import * as React from 'react'
// import styled from 'styled-component'
import uuid from 'uuid/v4'
import { API, graphqlOperation } from 'aws-amplify'
import { createTalk as CreateTalk } from './graphql/mutations'
export const CLIENT_ID = uuid()
export default class Form extends React.Component {
    state = {
        name: '', description: '', speakerName: '', speakerBio: '', talks: []
    }

    createTalk = async () => {
        const { name, description, speakerBio, speakerName } = this.state
        if (name === '' || description === '' ||
            speakerBio === '' || speakerName === '') return

        const talk = { name, description, speakerBio, speakerName, clientId: CLIENT_ID }
        const talks = [...this.state.talks, talk]
        this.setState({
            talks, name: '', description: '', speakerName: '', speakerBio: ''
        })

        try {
            await API.graphql(graphqlOperation(CreateTalk, { input: talk }))
            console.log('item created!')
        } catch (err) {
            console.log('error creating talk...', err)
        }
    }

    // change state then user types into input
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // add UI with event handlers to manage user input
    render() {
        return <>
            <input
                name='name'
                onChange={this.onChange}
                value={this.state.name}
                placeholder='name'
            />
            <input
                name='description'
                onChange={this.onChange}
                value={this.state.description}
                placeholder='description'
            />
            <input
                name='speakerName'
                onChange={this.onChange}
                value={this.state.speakerName}
                placeholder='speakerName'
            />
            <input
                name='speakerBio'
                onChange={this.onChange}
                value={this.state.speakerBio}
                placeholder='speakerBio'
            />
            <button onClick={this.createTalk}>Create Talk</button>
        </>
    }
}