import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import { Contact } from "./types";
import PaginationComponent from "./PaginationComponent";

const ContactManagement: React.FC<{ token: string }> = ({ token }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentContact, setCurrentContact] = useState<Contact | null>(null);
    const [filter, setFilter] = useState<string>(''); // State for filtering contacts
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]); // State for filtered contacts

    // Fetch all contacts from API
    const fetchAllContacts = async (): Promise<void> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts`, {
                headers: { 'x-auth-token': token }
            });
            setContacts(response.data); // Update contacts state with API response
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    }

    // Fetch contacts on component mount or when token changes
    useEffect(() => {
        fetchAllContacts();
    }, [token]);

    // Filter contacts based on filter text whenever contacts or filter change
    useEffect(() => {
        setFilteredContacts(contacts.filter((contact: Contact) => {
            return contact.first_name.toLowerCase().includes(filter.toLowerCase());
        }));
    }, [contacts, filter]);

    // Function to handle adding a new contact
    const handleAddNewContact = (): void => {
        setCurrentContact({
            id: 0,
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: '',
            notes: '',
            birthday: ''
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (currentContact) {
            setCurrentContact({ ...currentContact, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentContact?.id) {
            try {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/contacts/${currentContact.id}`, currentContact, {
                    headers: { 'x-auth-token': token }
                });
                setContacts(contacts.map(contact => contact.id === currentContact.id ? currentContact : contact));
                setCurrentContact(null);
            } catch (error) {
                console.error('Error updating a contact:', error);
            }

        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/contacts`, currentContact, {
                    headers: { 'x-auth-token': token }
                });
                setContacts([...contacts, response.data]);
                setCurrentContact(null);
            } catch (error) {
                console.error('Error saving a contact:', error);
            }

        }
    };

    const handleCancel = () => {
        setCurrentContact(null);
    };

    const handleEdit = (id: number) => {
        const foundContact = contacts.find((contact) => contact.id === id);
        if (foundContact) {
            setCurrentContact(foundContact);
        } else {
            console.error(`Contact with id ${id} not found.`);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/contacts/${id}`,
                { headers: { 'x-auth-token': token } }
            );
            setContacts(contacts.filter(contact => contact.id !== id));
            setCurrentContact(null);

        } catch (error) {
            console.error('Error deleting contact:', error);

        }

    };

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [contactsPerPage] = useState<number>(10);
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
    const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            {currentContact
                ? <ContactForm contact={currentContact} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} />
                :
                <div>
                    <ContactList contacts={currentContacts} setFilter={setFilter} handleAddNewContact={handleAddNewContact} handleEdit={handleEdit} handleDelete={handleDelete} />
                    <PaginationComponent currentPage = {currentPage} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
                </div>
            }
        </div >
    ); 
}

export default ContactManagement;
