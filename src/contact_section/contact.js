import React, {Component} from 'react'
import ContactCss from './contact.css'
import GridCss from "../grid/grid.css"

class Contact extends Component {
    render() {
        return (
            <section className='contact-us-section'>
                <div className="contact-form">
                    <h3 className="font-link">Contact us</h3>
                    <label htmlFor="name">First name</label>
                    <input type="text" id='name' name='firstname' placeholder='First name'/>
                    <label htmlFor="name">Surname</label>
                    <input type="text" id='surname' name='lastname' placeholder='Surname'/>
                    <label htmlFor="name">Email</label>
                    <input type="email" id='name' name='userEmail' placeholder='e-mail'/>
                    <label htmlFor="textarea">Message</label>
                    <textarea name="textarea" id="textarea" cols="30" rows="10"
                              placeholder='Leave us message'></textarea>
                    <button className='send-message-btn'>Send message</button>
                </div>
            </section>
        );
    }
}

export default Contact