import React,{Component} from 'react';
import {connect} from 'react-redux';

import {fetchProjects, postTranslateProject} from '../actions/projects'

import Footer from './footer'
import Header from './header'
import Upload from './upload'

const setFilter = ['projectName', 'projectInformation', 'otherDetail'];

class ProjectDetailShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectName_cn: '',
            projectName_en: '',
            projectInformation_cn: '',
            projectInformation_en: '',
            otherDetail_cn: '',
            otherDetail_en: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    componentWillMount() {
        const id = Number(this.props.match.params.id)
        this.props.fetchProjects().then(() => {
            if (!this.props.projects ||
                this.props.projects.size == 0 ||
                !this.props.projects.get(id) ||
                (this.props.projects.get(id) && this.props.projects.get(id).get('needTranslation') === 'N')) {
                alert('This project does not exist or has been translated.')
                this.props.history.push('/projectDetails')
                return
            }
            let project = this.props.projects.get(id)
            this.setState({
                projectName_cn: project.get('projectName_cn'),
                projectName_en: project.get('projectName_en'),
                projectInformation_cn: project.get('projectInformation_cn'),
                projectInformation_en: project.get('projectInformation_en'),
                otherDetail_cn: project.get('otherDetail_cn'),
                otherDetail_en: project.get('otherDetail_en')
            })
        })
    }

    onValueChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit(id, e) {
        e.preventDefault()
        this.props.postTranslateProject('SUBMIT', id, this.state.projectName_cn, this.state.projectName_en, this.state.projectInformation_cn, this.state.projectInformation_en,
        this.state.otherDetail_cn, this.state.otherDetail_en).then(() => {
            this.props.history.push('/projectDetails')
        })
    }

    onCancel() {
        this.props.history.push('/projectDetails')
    }

    onSave() {
        let id = Number(this.props.match.params.id)
        this.props.postTranslateProject('TEMP_SAVE', id, this.state.projectName_cn, this.state.projectName_en, this.state.projectInformation_cn, this.state.projectInformation_en,
            this.state.otherDetail_cn, this.state.otherDetail_en).then(() => {
            this.props.history.push('/projectDetails')
        })
    }

    auto_grow(element) {
        let row = (element.target.name === 'projectName' ? 84 : 180)
        element.target.style.height = 'auto';
        element.target.style.height = (element.target.scrollHeight > row ? element.target.scrollHeight : row) + "px";
    }

    render() {
        let id = Number(this.props.match.params.id)
        if (!this.props.projects ||
            this.props.projects.size == 0 ||
            !this.props.projects.get(id) ||
            (this.props.projects.get(id) && this.props.projects.get(id).get('needTranslation') === 'N')) {
            return <div></div>
        }
        let project = this.props.projects.get(id)
        return (
            <div>
                <div className='pageWrap'>
                    <Header/>
                    <div className='flexGrow mx-5 my-2'>
                        <form onSubmit={this.onSubmit.bind(this, this.props.match.params.id)}>
                            <div className="form-group">
                                {
                                    setFilter.map((k) => {
                                        let rowHeight = (k === 'projectName' ? '84px' : '180px')
                                        return (
                                            <div key={k} style={{marginTop: '15px'}}>
                                                <div style={{textAlign: 'left', textTransform: 'uppercase'}}
                                                     className='badgeFont'>{k}</div>
                                                <div className="input-group-text wordWrap" style={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                    minHeight: '40px'
                                                }}>{project.get(k)}</div>
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
                                    })}
                                <div style={{marginTop: '15px'}}>
                                    <div style={{textAlign: 'left', textTransform: 'uppercase'}}
                                         className='badgeFont'>Project files
                                    </div>
                                    <Upload/>
                                </div>
                            </div>
                            <div className="input-group-append d-flex justify-content-center">
                                <button type="submit" className="btn btn-outline-success btn-lg my-4 mx-2">Submit
                                </button>
                                <button type="button" className="btn btn-outline-success btn-lg my-4 mx-2"
                                        onClick={this.onSave}>Save
                                </button>
                                <button type="button" className="btn btn-outline-success btn-lg my-4 mx-2"
                                        onClick={this.onCancel}>Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {projects:state.projects};
}
export default connect(mapStateToProps,{fetchProjects, postTranslateProject})(ProjectDetailShow);
