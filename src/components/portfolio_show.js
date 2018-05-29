import React,{Component} from 'react';
import {connect} from 'react-redux';

import {fetchPortfolios, postTranslatePortfolio} from '../actions/portfolios'

import Footer from './footer'
import Header from './header'

const setFilter = ['projectTitle', 'description', 'relatedSkills'];

class PortfolioShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectTitle_cn: '',
            projectTitle_en: '',
            description_cn: '',
            description_en: '',
            relatedSkills_cn: '',
            relatedSkills_en: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    componentWillMount() {
        const id = Number(this.props.match.params.id);
        this.props.fetchPortfolios().then(() => {
            if (!this.props.portfolios ||
                this.props.portfolios.size == 0 ||
                !this.props.portfolios.get(id) ||
                (this.props.portfolios.get(id) && (this.props.portfolios.get(id).get('needTranslation') !== 'Y'))) {
                alert('This portfolio does not exist or has been translated.')
                this.props.history.push('/portfolios')
                return
            }
            let portfolio = this.props.portfolios.get(id)
            this.setState({
                projectTitle_cn: portfolio.get('projectTitle_cn'),
                projectTitle_en: portfolio.get('projectTitle_en'),
                description_cn: portfolio.get('description_cn'),
                description_en: portfolio.get('description_en'),
                relatedSkills_cn: portfolio.get('relatedSkills_cn'),
                relatedSkills_en: portfolio.get('relatedSkills_en')
            })
        })
    }

    onValueChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        let id = Number(this.props.match.params.id)
        this.props.postTranslatePortfolio('SUBMIT', id, this.state.projectTitle_cn, this.state.projectTitle_en, this.state.description_cn, this.state.description_en,
            this.state.relatedSkills_cn, this.state.relatedSkills_en).then(() => {
            this.props.history.push('/portfolios')
        })
    }

    onCancel() {
        this.props.history.push('/portfolios')
    }

    auto_grow(element) {
        let row = (element.target.name === 'description' ? 180 : 84)
        element.target.style.height = 'auto';
        element.target.style.height = (element.target.scrollHeight > row ? element.target.scrollHeight : row) + "px";
    }

    onSave() {
        let id = Number(this.props.match.params.id)
        this.props.postTranslatePortfolio('TEMP_SAVE', id, this.state.projectTitle_cn, this.state.projectTitle_en, this.state.description_cn, this.state.description_en,
            this.state.relatedSkills_cn, this.state.relatedSkills_en).then(() => {
            this.props.history.push('/portfolios')
        })
    }

    render() {
        let id = Number(this.props.match.params.id)
        if (!this.props.portfolios ||
            this.props.portfolios.size == 0 ||
            !this.props.portfolios.get(id) ||
            (this.props.portfolios.get(id) && (this.props.portfolios.get(id).get('needTranslation') !== 'Y'))) {
            return <div></div>
        }
        let portfolio = this.props.portfolios.get(id)
        return (
            <div>
                <div className='pageWrap'>
                    <Header/>
                    <div className='flexGrow mx-5 my-2'>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="form-group">
                                {
                                    setFilter.map((k) => {
                                        let rowHeight = (k === 'description' ? '180px' : '84px')
                                        return (
                                            <div key={k} style={{marginTop: '15px'}}>
                                                <div style={{textAlign: 'left', textTransform: 'uppercase'}}
                                                     className='badgeFont'>{k.includes('Title') ? 'Portfolio Title' : (k.includes('Skills') ? 'Portfolio Keywords' : k)}</div>
                                                <div className="input-group-text wordWrap" style={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                    minHeight: '40px'
                                                }}>{portfolio.get(k)}</div>
                                                <div className="input-group d-flex">
                                                    <div className="form-control">
                                                     <textarea className="form-control"
                                                               onKeyUp={this.auto_grow.bind(this)}
                                                               style={{height: rowHeight}}
                                                               placeholder='Please enter English translation here'
                                                               id={k + '_en'}
                                                               name={k}
                                                               value={this.state[k+'_en'] == null ? '' : this.state[k+'_en']}
                                                               onChange={this.onValueChange}
                                                               required
                                                     />
                                                        <div style={{textAlign: 'right', color: '#28a745'}}>EN</div>
                                                    </div>
                                                    <div className="form-control ml-2">
                                                <textarea className="form-control"
                                                          onKeyUp={this.auto_grow.bind(this)}
                                                          style={{height: rowHeight}}
                                                          placeholder='请输入中文翻译'
                                                          id={k + '_cn'}
                                                          name={k}
                                                          value={this.state[k+'_cn'] == null ? '' : this.state[k+'_cn']}
                                                          onChange={this.onValueChange}
                                                          required
                                                />
                                                        <div style={{textAlign: 'right', color: 'lightcoral'}}>中文</div>
                                                    </div>
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                            <div className="input-group-append d-flex justify-content-center">
                                <button type="submit" className="btn btn-outline-success btn-lg my-4 mx-2">Submit
                                </button>
                                <button type="button" className="btn btn-outline-success btn-lg my-4 mx-2"
                                        onClick={this.onSave.bind(this)}>Save
                                </button>
                                <button type="button" className="btn btn-outline-success btn-lg my-4 mx-2"
                                        onClick={this.onCancel}>Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <Footer/>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {portfolios: state.portfolios};
}
export default connect(mapStateToProps, {fetchPortfolios, postTranslatePortfolio})(PortfolioShow);
