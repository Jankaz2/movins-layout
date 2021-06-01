import React from 'react'
import {useForm} from "react-hook-form"
import ContactCss from './contact.css'
import GridCss from "../grid/grid.css"

export default function Contact() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        const email = data.email
        const sub = data.subject
        const content = data.content

        fetch(`http://localhost:4000/cinema/send-mail?from=${email}&subject=${sub}&text=${content}`)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <section className='contact-us-section'>
            <div className="contact-form">
                <h3 className="font-link">Contact us</h3>
                <form action={'mailto:appcinema2021@gmail.com'}
                      method={'post'}
                      encType={'text/plain'}
                      onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">First name</label>
                    <input type="text" className='no-outline' placeholder='First name'
                           name={"name"}
                           {...register("name", { required: true })}
                    />
                    <label htmlFor="surname">Surname</label>
                    <input type="text" className='no-outline' placeholder='Surname'
                           name={"surname"}
                           {...register("surname", { required: true })}
                    />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='no-outline' placeholder='e-mail'
                           name={"email"}
                           {...register("email", { required: true })}
                    />
                    <label htmlFor="subject">Subject</label>
                    <input type="text" className='no-outline' placeholder='Subject'
                           name={"subject"}
                           {...register("subject", { required: true })}
                    />
                    <label htmlFor="content">Message</label>
                    <textarea name="content" cols="30" rows="10"
                              placeholder='Leave us message'
                              {...register("content", { required: true })}
                    />
                    <input type="submit" className='send-message-btn' value="SEND"/>
                </form>
            </div>
        </section>
    );
}