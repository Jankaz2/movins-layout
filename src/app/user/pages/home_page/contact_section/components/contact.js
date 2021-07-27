import React from 'react'
import {useForm} from "react-hook-form"
import ContactCss from '../styles/contact.scss'
import GridCss from "../../../../../utils/grid/grid.scss"

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
            <div className="contact-us-section__form">
                <h3 className="heading-tertiary">Contact us</h3>
                <form action={'mailto:appcinema2021@gmail.com'}
                      method={'post'}
                      encType={'text/plain'}
                      onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name"
                           className='contact-us-section__form__label'
                    >Name</label>
                    <input type="text"
                           className='no-outline contact-us-section__form__input'
                           name={"name"}
                           {...register("name", {required: true})}
                    />
                    <label htmlFor="surname"
                           className='contact-us-section__form__label'
                    >Surname</label>
                    <input type="text"
                           className='no-outline contact-us-section__form__input'
                           name={"surname"}
                           {...register("surname", {required: true})}
                    />
                    <label htmlFor="email"
                           className='contact-us-section__form__label'
                    >Email</label>
                    <input type="email"
                           className='no-outline contact-us-section__form__input'
                           name={"email"}
                           {...register("email", {required: true})}
                    />
                    <label htmlFor="subject"
                           className='contact-us-section__form__label'
                    >Subject</label>
                    <input type="text"
                           className='no-outline contact-us-section__form__input'
                           name={"subject"}
                           {...register("subject", {required: true})}
                    />
                    <textarea name="content" cols="30" rows="10"
                              placeholder='Message...'
                              className='contact-us-section__form__textarea'
                              {...register("content", {required: true})}
                    />
                    <input type="submit"
                           className='contact-us-section__form__input--submit'
                           value="SEND"/>
                </form>
            </div>
        </section>
    );
}