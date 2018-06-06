import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Record extends Component {
  
  render() {
    return (
      <tr>
        <td><input type="text" className="form-control" defaultValue={this.props.date} ref="date" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.title} ref="title" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.amount} ref="amount" /></td>
        <td>
          <button className="btn btn-info mr-1">Update</button>
          <button className="btn btn-danger">Cancel</button>
        </td>
      </tr>
    )
  }
}


Record.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.number,
  record: PropTypes.object
}
