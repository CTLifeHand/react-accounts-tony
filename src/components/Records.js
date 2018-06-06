import React, { Component } from 'react'
import Record from './Record'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'

// 快捷键 rcc
export default class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  // cdm
  componentDidMount() {
    RecordsAPI.getAll()
      .then((res) => {
        this.setState({
          isLoaded:true,
          records:res.data
        })
      }
      )
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
      );
  }

  // 回调
  addNewRecord(record) {
    this.setState({
      records:[...this.state.records,record]
    })
  }

  render() {
    const { error, isLoaded, records } = this.state;

    let recordsComponent;

    if (error) {
      recordsComponent = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      recordsComponent = <div>Loading...</div>;
    } else {
      recordsComponent = (

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) =>
              (<Record
                key={record.id}
                {...record}
              />)
            )}
          </tbody>
        </table>
      );
    }
    

    return (
      <div>
        <h2>Records</h2>
        <RecordForm handleNewRecord={this.addNewRecord.bind(this)}/>
        {recordsComponent}
      </div>  
    )
  }
}


