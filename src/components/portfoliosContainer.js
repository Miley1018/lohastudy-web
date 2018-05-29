import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import makePortfolioItems from './makePortfolioItems.js'
import {fetchPortfolios} from '../actions/portfolios'

const columns = [
    {   Header: "Portfolio title",
        accessor: "portfolioTitle",
        className: 'bigColumn',
        headerClassName: 'bigColumn_header'
    },
    {   Header: "Past Days",
        accessor: "createDateTime",
        className: 'smallColumn',
        minWidth: 30,
        headerClassName: 'smallColumn_header'
    },
    {   Header: "Portfolio Id",
        accessor: "portfolioId",
        className: 'smallColumn',
        minWidth: 30,
        headerClassName: 'smallColumn_header'
    }
]

class PortfoliosContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: []
        }
    }
    componentWillMount() {
        if (!this.props.authenticated) {
            this.props.history.push('/signin')
            return
        }
        this.props.fetchPortfolios().then(()=>{
            this.setState({
                tableData: makePortfolioItems(this.props.portfolios)
            })
        })
    }
    render() {
        if (!this.props.authenticated) {
            return <div></div>
        }
        let height = screen.height * 0.77 + 'px'
        return (
            <div className='pageWrap'>
                <Header />
                <div className='flexGrow'>
                    <ReactTable
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    if (rowInfo) {
                                        this.props.history.push('/portfolios/' + rowInfo.original.portfolioId);
                                    }
                                }}}}
                        data={this.state.tableData}
                        columns={columns}
                        defaultPageSize={15}
                        pageSizeOptions={[5,15,50,100,500]}
                        className="-highlight defaultMargin"
                        style={{
                            height: height
                        }}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        portfolios: state.portfolios.toList(),
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, {fetchPortfolios})(PortfoliosContainer)
