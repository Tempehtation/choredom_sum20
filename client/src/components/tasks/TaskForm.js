import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class TaskForm extends Component {
  state = { task_name: '', task_description: '', task_value: '' }

  componentDidMount() {
    if (this.props.id) {
      const { task_name, task_description, task_value } = this.props
      this.setState({ task_name, task_description, task_value })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.id) {
      const { id, history } = this.props
      this.props.updateTask(id, this.state, history)
      this.props.toggleUpdate()
    } else {
      this.props.addTask(this.state)
    }
    this.setState({ task_name: '', task_description: '', task_value: '' })
  }

  render() {
    const { task_name, task_description, task_value } = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name='task_name'
          value={task_name}
          onChange={this.handleChange}
          label='Task Name'
          required
        />
        <Form.Input
          name='task_description'
          value={task_description}
          onChange={this.handleChange}
          label='Task Description'
          required
        />
        <Form.Input
          name='task_value'
          value={task_value}
          onChange={this.handleChange}
          label='Task Value'
          required
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default TaskForm;