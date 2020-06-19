import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';
import {Link} from 'react-router-dom';

class Home extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
        <DefaultLayout title='home'>
            <section id="banner" className="container">
                <div className="title row pt-5">
                <h1 className="col-md-12 mt-5 mb-2">Wally</h1>
                <div className="col-md-12 text-center mt-3 px-5">
                    <Link to="/create" id="play_now" className="btn btn-primary awesome mr-sm-5">
                        play now
                    </Link>
                    <Link to="/sign_up" id="sign_up" className="btn btn-secondary awesome">
                        Sign up for free
                    </Link>
                </div>
                <img src="/images/asteroid.png" className="col-md-12 mt-5" alt='asteroide'/>
                </div>
            </section>
            <section id="columns" className="container">
                <div className="row mx-0 p-5">
                    <div className="col-lg-12">
                        <p className="bg-text">
                            This is a 2d online multiplayer video game that is about space battles with powerful
                            but adorable creatures. You can play with your friends locally or remotely in small
                            worlds but full of surprises, your friends and your need to collect points to pass the
                            rounds until you reach the last level where you will get great prizes.
                        </p>
                        <p className="bg-text">This is <b>WALLY</b></p>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body d-flex justify-content-center">
                                <img src="/images/enemy.png" className="img-fluid" width="295px" alt='enemy'/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body d-flex justify-content-center">
                                <img src="/images/wallace_blue.png" className="img-fluid" width="200px" height="200px" alt='wallace'/>
                            </div>
                        </div> 
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body d-flex justify-content-center">
                                <img src="/images/gobo.png" className="img-fluid" width="200px" height="200px" alt='gobo'/>
                            </div>
                        </div> 
                    </div>
                </div> 
            </section>
        </DefaultLayout>
    );
  }
}

export default Home;
