import React, { useReducer } from "react"
// import uuid from 'uuid'
import ContactContext from "./contactContext"
import contactReducer from "./contactReducer"
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [{
            id: 1,
            name: 'Shekhar',
            email: 'shekhar@gmail.com',
            phone: '123-456-789',
            type: 'personal'
        }, {
            id: 2,
            name: 'Anjali',
            email: 'anjali@gmail.com',
            phone: '123-456-789',
            type: 'personal'
        }, {
            id: 3,
            name: 'Trishika',
            email: 'trishu@gmail.com',
            phone: '123-456-789',
            type: 'professional'
        }],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)
    // Add contact
    const addContact = contact => {
        contact.id = '126735781452'
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    // Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }
    // Set Current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    // Clear Current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    // Update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }
    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
