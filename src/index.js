module.exports = async function App(context) {
  if (context.event.isText) {
    if (context.event.text.startsWith('/a ')) {
      const todoTitle = context.event.text.slice(3);
      context.setState({
        todos: context.state.todos.concat({ title: todoTitle }),
      });
      await context.sendText(`Add todo: ${todoTitle}.`);
    } else if (context.event.text === '/l') {
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
  } else if (context.event.isPostback) {
    const targetTodo = context.event.postback.payload;
    context.setState({
      todos: context.state.todos.filter(({ title }) => title !== targetTodo),
    });
    await context.sendText(`Delete todo: ${targetTodo}.`);
  }
};
