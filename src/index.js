module.exports = async function App(context) {
  if (context.event.isText) {
    if (context.event.text.startsWith('/a ')) {
      const todoTitle = context.event.text.slice(3);
      context.setState({
        todos: context.state.todos.concat({ title: todoTitle }),
      });
      await context.sendText(`Add todo: ${todoTitle}.`);
    }
  }
};
