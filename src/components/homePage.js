import React from 'react'
import Footer from './footer'
import Header from './header'

class HomePage extends React.Component{
    render() {
        return (
            <div className='pageWrap'>
                <Header/>
                <div className='flexGrow'>
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active themeBgColor">
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h1>Welcome</h1>
                                        <br />
                                        <p>Hey you, welcome！</p>
                                        <p>We put forth every effort to create a great experience for our users.</p>
                                        <p><a className="btn btn-lg btn-outline-success" style={{backgroundColor:'white'}} href="#translate" role="button">Get
                                            started</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item themeBgColor">
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h1>Have a good day！</h1>
                                        <br />
                                        <p>Users will base their decisions on the work in your job.</p>
                                        <p>Build your career at Lohastudy.</p>
                                        <p><a className="btn btn-lg btn-outline-success" style={{backgroundColor:'white'}} href="#translate" role="button">Get
                                            started</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>

                        </a>
                        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                {/*<div className="container marketing" >*/}
                    {/*Lohastudy*/}
                {/*</div>*/}
                <Footer/>
            </div>
        )
    }
}

export default HomePage
