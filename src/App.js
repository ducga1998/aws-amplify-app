import React, { useEffect, useReducer } from 'react'
import { Auth } from 'aws-amplify'
// initial state


// define initial state

// useReducer hook creates local state


// Class method to sign up a user



function App() {
  const initialState = {
    username: '', password: '', email: ''
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  async function signUp() {
    const { username, password, email } = state
    try {
      await Auth.signUp({ username, password, attributes: { email } })
      console.log('user successfully signed up!')
    } catch (err) {
      console.log('error signing up user...', err)
    }
  }


  // create reducer
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_INPUT':
        return { ...state, [action.inputName]: action.inputValue }
      default:
        return state
    }
  }

  // event handler
  function onChange(e) {
    dispatch({
      type: 'SET_INPUT',
      inputName: e.target.name,
      inputValue: e.target.value
    })
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => console.log({ user }))
      .catch(error => console.log({ error }))
  })
  return (
    <div className="App">
      <button onClick={signUp}>Sign Up</button>

      <input
        name='username'
        placeholder='username'
        value={state.username}
        onChange={onChange}
      />
    </div>
  )
}

export default App