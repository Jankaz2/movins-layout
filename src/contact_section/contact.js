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
                    <input type="text" className='no-outline' id='name' name='firstname' placeholder='First name'/>
                    <label htmlFor="name">Surname</label>
                    <input type="text" className='no-outline' id='surname' name='lastname' placeholder='Surname'/>
                    <label htmlFor="name">Email</label>
                    <input type="email" className='no-outline' id='name' name='userEmail' placeholder='e-mail' required={true}/>
                    <label htmlFor="name">Subject</label>
                    <input type="email" className='no-outline' id='subject' name='subject' placeholder='Subject' required={true}/>
                    <label htmlFor="textarea">Message</label>
                    <textarea name="textarea" id="textarea" cols="30" rows="10"
                              placeholder='Leave us message'></textarea>
                    <input type="submit" className='send-message-btn' value="Send message"/>
                </div>
            </section>
        );
    }
}

export default Contact