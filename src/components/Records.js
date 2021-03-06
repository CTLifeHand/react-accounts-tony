import React, { Component } from 'react'
import Record from './Record'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'
import AmountBox from "./AmountBox";

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

  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits() {
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
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


  // 数组中更新
  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }

  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    });
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
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />)
            )}
          </tbody>
        </table>
      );
    }
    

    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()} />
          <AmountBox text="Debit" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addNewRecord.bind(this)}/>
        {recordsComponent}
      </div>  
    )
  }
}


