// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const createTalk = `mutation CreateTalk($input: CreateTalkInput!) {
  createTalk(input: $input) {
    id
    clientId
    name
    description
    speakerName
    speakerBio
  }
}
`;
export const updateTalk = `mutation UpdateTalk($input: UpdateTalkInput!) {
  updateTalk(input: $input) {
    id
    clientId
    name
    description
    speakerName
    speakerBio
  }
}
`;
export const deleteTalk = `mutation DeleteTalk($input: DeleteTalkInput!) {
  deleteTalk(input: $input) {
    id
    clientId
    name
    description
    speakerName
    speakerBio
  }
}
`;
