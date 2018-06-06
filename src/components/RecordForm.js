import React, { Component } from 'react'

import * as RecordsAPI from '../utils/RecordsAPI'


export default class RecordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      date:"",
      title:"",
      amount:"",
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


    const data = {
      date: this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    };


    RecordsAPI.creat(data).then(
      res => {
        this.props.handleNewRecord(res.data)
        console.log(res.data)
        // 清空
        this.setState({
          date: "",
          title: "",
          amount: "",
        })
      }

    ).catch(
      error => console.log(error)
    )
  }

  valid(){
    return this.state.date && this.state.title && this.state.amount;
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
            <input type="text" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
        </form>
      </div>
    )
  }
}
