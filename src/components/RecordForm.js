import React, { Component } from 'react'

import * as RecordsAPI from '../utils/RecordsAPI'


export default class RecordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      date:"",
      title:"",
      amout:"",
    }
  }

  handleChange(event){
    let name,obj;
    name = event.target.name;
    this.setState((
      obj = {},
      obj["" + name] = event.target.value,
      obj
    ))
  }

  handleSubmit(event){
    event.preventDefault();
    RecordsAPI.creat(this.state).then(
      res => {
        this.props.handleNewRecord(res.data)

        // 清空
        this.setState({
          date: "",
          title: "",
          amout: "",
        })
      }

    ).catch(
      error => console.log(error)
    )
  }

  valid(){
    return this.state.date && this.state.title && this.state.amout;
  }

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group mr-1">
            <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="form-group mr-1">
            <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="form-group mr-1">
            <input type="text" className="form-control" placeholder="Amount" name="amout" value={this.state.amout} onChange={this.handleChange.bind(this)}/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
        </form>
      </div>
    )
  }
}
