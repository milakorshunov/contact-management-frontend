import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactList from './ContactList';
import { Contact } from './types';

test('render contact list', () => {
    const contacts: Contact[] = [
        { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', phone: '', address: '', notes: '', birthday: '' },
        { id: 2, first_name: 'Mary', last_name: 'Donovan', email: 'mary@example.com', phone: '', address: '', notes: '', birthday: '' },
    ];


    const setFilter = jest.fn();
    const handleAddNewContact = jest.fn();
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    const {getByText} = render(
        <ContactList
            contacts={contacts}
            setFilter={setFilter}
            handleAddNewContact={handleAddNewContact}
            handleEdit={handleAddNewContact}
            handleDelete={handleDelete}
        />
    );
        
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Mary')).toBeInTheDocument();
});

test('renders "Add New Contact" button', ()=> {
    const setFilter = jest.fn();
    const handleAddNewContact = jest.fn();
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    render (
        <ContactList
        contacts ={[]}
        setFilter={setFilter}
        handleAddNewContact={handleAddNewContact}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />

    );

    const addButton= screen.getByRole('button', {name:/add new contact/i});
    fireEvent.click(addButton);

    expect(handleAddNewContact).toHaveBeenCalled;
});