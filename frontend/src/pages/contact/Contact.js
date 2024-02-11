import React, { useState } from 'react'
import './Contact.scss'
import Card from '../../components/card/Card'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BACKEND_URL } from '../../services/authService'

const Contact = () => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const data = {
        subject,
        message,
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/contactus`,
                data
            )
            setSubject('')
            setMessage('')
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='contact'>
            <h3 className='--mt'>Send a message to Jason</h3>
            <div className='section'>
                <form onSubmit={sendEmail}>
                    <Card cardClass='card'>
                        <label>Subject</label>
                        <input
                            type='text'
                            name='subject'
                            placeholder='Subject'
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <label>Message</label>
                        <textarea
                            cols='30'
                            rows='15'
                            name='message'
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button className='--btn --btn-primary'>
                            Send Message
                        </button>
                    </Card>
                </form>

                <div className='details'>
                    <Card cardClass={'card2'}>
                        <h3>Jason's Contact Information</h3>
                        <p>
                            Fill in the form or contact Jason via other methods
                            listed below...
                        </p>

                        <div className='icons'>
                            <span>
                                <FaPhoneAlt />
                                <p>409.720.9742</p>
                            </span>
                            <span>
                                <FaEnvelope />
                                <p>jason.armstrong@gmail.com</p>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Contact
