import React from 'react'
import {connect} from 'react-redux'

import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'
import makeMessageItems from './makeMessageItems.js'

import {fetchMessages, postTranslateMessage} from '../actions/messages'

const columns = [
    {   Header: "Messages",
        accessor: "message",
        className: 'bigColumn',
        headerClassName: 'bigColumn_header'
    },
    {   Header: "Past Days",
        accessor: "sendTime",
        className: 'smallColumn',
        minWidth: 30,
        headerClassName: 'smallColumn_header'
    },
    {   Header: "Message Id",
        accessor: "id",
        className: 'smallColumn',
        minWidth: 30,
        headerClassName: 'smallColumn_header'
    }
]

class MessagesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expandedRow: null,
            tableData: [],
            translatedMessage:''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    componentWillMount() {
        if (!this.props.authenticated) {
            this.props.history.push('/signin')
            return
        }
        this.props.fetchMessages().then(()=>{this.setState({tableData: makeMessageItems(this.props.messages.toList())})})
    }
    onValueChange(e) {
        this.setState({
            translatedMessage: e.target.value
        })
    }
    onSubmit(id, e) {
        e.preventDefault()
        this.props.postTranslateMessage(id, this.state.translatedMessage).then(() => {
            this.setState({tableData: makeMessageItems(this.props.messages.toList()), expandedRow: null})
        })
    }
    onCancel() {
        this.setState({expandedRow: null})
    }
    onSave() {
        alert('Waiting for backend developer~')
    }
    auto_grow(element) {
        element.target.style.height = 'auto'
        element.target.style.height = (element.target.scrollHeight > 58 ? element.target.scrollHeight : '58')+"px";
    }
    renderSub(id) {
        return (
            <div>
                <div >
                    <form className="input-group" onSubmit={this.onSubmit.bind(this, id)}>
                    <textarea required onKeyUp={this.auto_grow.bind(this)} style={{height: '58px'}} className="form-control" placeholder='Please enter your translation here' onChange={this.onValueChange}></textarea>
                        <div className="input-group-append">
                            <button type="submit" className="btn -btn">Submit</button>
                            <button type="button"
                                    className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" onClick={this.onSave}>Save</a>
                                <div role="separator" className="dropdown-divider"></div>
                                <a className="dropdown-item" style={{cursor: 'pointer'}} onClick={this.onCancel}>Cancel</a>
                                <div role="separator" className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={this.onSave}>Back to open tasks</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        if (!this.props.authenticated) {
            return <div></div>
        }
        let height = screen.height * 0.77 + 'px'
        let expandedRow = this.state.expandedRow !== null? {
            [this.state.expandedRow]: true
        } : {}
        return (
            <div className='pageWrap'>
                <Header/>
                <div className='flexGrow'>
                    <ReactTable
                        data={this.state.tableData}
                        columns={columns}
                        defaultPageSize={15}
                        pageSizeOptions={[5,15,50,100,500]}
                        className="-highlight defaultMargin"
                        expanded={expandedRow}
                        style={{
                            height: height
                        }}

                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    if (this.state.expandedRow === null) {
                                        this.setState({expandedRow: rowInfo.viewIndex})
                                    } else {
                                        this.setState({expandedRow: null})
                                    }
                                }}}}
                        onPageChange={(pageIndex) =>  {
                            if (this.state.expandedRow !== null) {
                                this.setState({expandedRow: null})
                            }}}
                        onSortedChange={(newSorted, column, shiftKey) => {
                            if (this.state.expandedRow !== null) {
                                this.setState({expandedRow: null})
                            }
                        }}
                        SubComponent={row => {
                            return (
                                <div style={{padding: "20px"}}>
                                    {this.renderSub(row.original.id)}
                                </div>
                            );
                        }}
                    />
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, {fetchMessages, postTranslateMessage})(MessagesContainer)
