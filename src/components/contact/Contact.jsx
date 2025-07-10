import React from 'react'
import { useLocation } from 'react-router-dom'

import './Contact.css'

import { CiPhone } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";


const Contact = () => {

    const location = useLocation()
    return (
        <div className='contact-component'>
            <div>
                <p>Home{location.pathname}</p>
            </div>

            <div className='contat-component-container-two'>
                <div className='contat-component-container-two-divison-one'>
                    <div className='contat-component-container-two-divison-one'>
                        <div className='contat-component-container-two-divison-one-container-one'>
                            <div>
                                <CiPhone className='contact-icon' />
                                <h3>Call to us</h3>
                            </div>
                            <p>We are available 24/7, 7 days a week.</p>
                            <p>Phone: +8801611112222</p>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid gray'}}></div>

                    <div className='contat-component-container-two-divison-one'>
                        <div className='contat-component-container-two-divison-one-container-one'>
                            <div>
                                <MdOutlineMail className='contact-icon' />
                                <h3>Write to us</h3>
                            </div>
                            <p>Fill out our form and we will contact <br/>you within 24 hours.</p>
                            <p>Emails: customer@exclusive.com</p>
                            <p>Emails: support@exclusive.com</p>
                        </div>
                    </div>

                </div>


                <div className='contat-component-container-two-divison-two'>
                    <form className='contat-component-container-two-divison-two-form'>
                        <div className='contat-component-container-two-divison-two-form-division-one'>
                            <input type="text" placeholder='Your Name *' />
                            <input type="text" placeholder='Your Email *' />
                            <input type="text" placeholder='Your Phone *'/>
                        </div>

                        <div className='contat-component-container-two-divison-two-form-division-two'>
                            <textarea name="" id="" placeholder='Your Message'>

                            </textarea>
                        </div>
                        <div className='contat-component-container-two-divison-two-form-division-three'>
                            <button>Send message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact