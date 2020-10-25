import React, { Component } from 'react'
import DefaultLayout from '../layouts/default'
import { Link } from 'react-router-dom'

import asteroidImage from '../images/asteroid.png'
import enemyImage from '../images/enemy.png'
import wallaceBlueImage from '../images/wallace_blue.png'
import goboImage from '../images/gobo.png'

class Home extends Component {
  render () {
    return (
      <DefaultLayout>
        <section id='banner'>
          <div className='banner-container'>
            <div className='title row pt-5'>
              <h1 className='col-md-12 mt-5 mb-2'>Wally</h1>
              <div className='col-md-12 mt-3 px-5 btn-floating'>
                <div className='btn-container'>
                  <input className='form-control awesome' placeholder='Enter to an existing game' />
                  <div className='mt-2 mb-2' style={{ textAlign: 'center', width: '100%' }}>Or</div>
                  <Link to='/create' id='play_now' className='btn btn-primary awesome'>
                    Start a Game
                  </Link>
                </div>
              </div>
              <div className='col-md-12'>
                <img src={asteroidImage} className='mt-5 platform' alt='asteroide' />
              </div>
            </div>
          </div>
        </section>
        <section id='columns'>
          <div className='row mx-0 p-5'>
            <div className='col-lg-12'>
              <p className='bg-text'>
                This is a 2d online multiplayer video game that is about space battles with powerful
                but adorable creatures. You can play with your friends locally or remotely in small
                worlds but full of surprises, your friends and your need to collect points to pass the
                rounds until you reach the last level where you will get great prizes.
              </p>
              <p className='bg-text'>This is <b>WALLY</b></p>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body d-flex justify-content-center'>
                  <img src={enemyImage} className='img-fluid' width='295px' alt='enemy' />
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body d-flex justify-content-center'>
                  <img src={wallaceBlueImage} className='img-fluid' width='200px' height='200px' alt='wallace' />
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body d-flex justify-content-center'>
                  <img src={goboImage} className='img-fluid' width='200px' height='200px' alt='gobo' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    )
  }
}

export default Home
