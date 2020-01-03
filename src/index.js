module.exports = async function App(context) {
  if (context.event.isText) {
    if (context.event.text.startsWith('/a ')) {
      const todoTitle = context.event.text.slice(3);
      context.setState({
        todos: context.state.todos.concat({ title: todoTitle }),
      });
      await context.sendText(`Add todo: ${todoTitle}.`);
    } else if (context.event.text === 'list') {
      if (context.state.todos.length === 0) {
        await context.sendText(`There's no todo in your list`);
      } else {
        context.sendText(
          `Your Todo:\n${context.state.todos
            .map(({ title }, idx) => `${idx + 1}. ${title}`)
            .join('\n')}`
        );
      }
    }
  }
};
