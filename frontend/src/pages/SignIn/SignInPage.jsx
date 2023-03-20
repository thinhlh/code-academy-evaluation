import Header from '../../components/Header/Header'
import './SignInPage.scss'
import useAxios from '../../hooks/use-axios'
import { HttpMethod } from '../../utils/http-method'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_KEY } from '../../config/constants';
export default function SignInPage() {

    const { data: createUserData, error: createUserError, loading: createUserLoading, operation } = useAxios();
    const [nameError, setNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [allowSubmit, setAllowSubmit] = useState(false)

    const navigate = useNavigate()

    const onUsernameChanged = (e) => {
        const username = e.target.value

        if (username.length <= 0) {
            setNameError("Username must not be blank")
        } else {
            setNameError(null)
        }
    }

    const onPhoneNumberChanged = (e) => {
        const phoneNumber = e.target.value

        if (/^\d+$/.test(phoneNumber)) {
            if (phoneNumber.length !== 9) {
                setPhoneNumberError("Phone number must have 9 digits")
            } else {
                setPhoneNumberError(null)
            }
        }
        else {
            setPhoneNumberError("Phone number must contains only digits")
        }


    }

    useEffect(() => {
        if (phoneNumberError === null && nameError === null) {
            setAllowSubmit(true)
        } else {
            setAllowSubmit(false)
        }

    }, [phoneNumberError, nameError])

    const submit = (e) => {
        e.preventDefault()

        const username = e.target.elements.username.value
        const phoneNumber = e.target.elements.phone.value

        operation('/users', HttpMethod.POST, {
            username: username,
            phoneNumber: phoneNumber
        })
    }

    useEffect(() => {
        if (createUserData) {
            localStorage.setItem(USER_KEY, JSON.stringify(createUserData))
            navigate('/movies')
        } else {
            if (createUserError) {
                alert(createUserError)
            }
        }
    }, [createUserData, createUserError, createUserLoading, navigate])

    return (
        <div className='signin-container'>
            <Header className='signin-header' />
            <form className='signin-form' onSubmit={submit}>
                <div className='signin-form-username'>
                    <label for="username">Username</label>
                    <br />
                    <input onChange={onUsernameChanged} type="text" name="username" required />
                    <p className='form-error-message'>{nameError}</p>
                </div>
                <div className='signin-form-phone'>
                    <label for="phone">Phone Number</label>
                    <br />

                    <div className='signin-form-phone-input'>
                        <span>+84</span>
                        <input onChange={onPhoneNumberChanged} type="tel" name="phone" required maxLength="9" minLength="9" />
                    </div>
                    <p className='form-error-message'>{phoneNumberError}</p>
                </div>
                <div>
                    <br />
                    <br />
                    <input
                        data-testid='create-user-btn'
                        disabled={!allowSubmit}
                        type="submit"
                        id="signin-form-submit-button"
                        value="Create User" />
                </div>
            </form>
        </div>
    )
}