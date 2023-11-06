import React from 'react'
import img from '../components/profile.jpg'

const About = () => {

  return (
    <div className='about'>
      <section id="box-profile">
            <div className="img-profile">
                <img src={img} alt="" className='p' />
            </div>
            <div className="description">
                <h1>Destanto M.Y.</h1>
                <p>WEB Developer</p>
                <a className="button bg-green">Contact</a>
                <a className="button border-blue">Resume</a>
            </div>
            <div className="information">
                <div className="data">
                    <p className="field">Location</p>
                    <p className="text-gray">Magelang,Indonesia</p>
                </div>
                <div className="data">
                    <p className="field">Years experiences</p>
                    <p className="text-gray">5 years++</p>
                </div>
                <div className="data">
                    <p className="field">Github</p>
                    <p className="text-gray">github.com/destantomy</p>
                </div>
                <div className="data">
                    <p className="field">Instagram</p>
                    <p className="text-gray">instagram.com/itsdesta_</p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About
