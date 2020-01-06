const { router, text, route, payload } = require('bottender/router');

async function addTodo(context) {
  const todoTitle = context.event.text.slice(3);
  context.setState({
    todos: context.state.todos.concat({ title: todoTitle }),
  });
  await context.sendText(`Add todo: ${todoTitle}`);
}

async function listTodo(context) {
  if (context.state.todos.length === 0) {
    await context.sendText(`There's no todo in your list`);
  } else {
    await context.sendGenericTemplate(
      context.state.todos.map(({ title }) => {
        return {
          title: title,
          buttons: [
            {
              type: 'postback',
              title: 'Delete',
              payload: title,
            },
          ],
        };
      })
    );
  }
}

async function deleteTodo(context) {
  const targetTodo = context.event.postback.payload;
  context.setState({
    todos: context.state.todos.filter(({ title }) => title !== targetTodo),
  });
  await context.sendText(`Delete todo: ${targetTodo}`);
}

async function sendIntroduction(context) {
  const intro = `Welcome to Todo bot!\n\nTo add a todo, use "/a myTodoTitle"\n\nTo list todos, enter "/l"\n\nTo delete a todo, enter "/l" then choose the todo you want to delete`;
  await context.sendText(intro);
}

module.exports = async function App(context) {
  return router([
    payload('GET_STARTED', sendIntroduction),
    text(/^\/a/, addTodo),
    text('/l', listTodo),
    route(
      context => context.event.isPostback && context.event.postback.title === 'Delete',
      deleteTodo
    ),
  ]);
};
