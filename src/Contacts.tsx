import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Input, Table } from 'reactstrap';

const Contacts: React.FC<{token: string}> = ({token}) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filter, setFilter] = useState(''); 
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

    interface Contact {
        id: number;
        first_name: string;
        last_name: string;
        birthday: string;
        address?: string;
        email?: string;
        phone?: string;
        notes?: string;
    
    }

    
    const handleContact = async ():Promise<void> => {
       try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts`,
            {headers: {'x-auth-token': token}}
        );

        setContacts(response.data);
        
       } catch (error) {
        console.log(error);
        
       }
    }
    useEffect(()=> {
        handleContact();
    }, []);

    useEffect(()=>{
        setFilteredContacts(contacts.filter((contact:Contact)=>{
            return contact.first_name.toLowerCase().includes(filter.toLowerCase());
        }));

    },[contacts, filter]);

    return (
        <Container>
            <Input 
                type="text"
                placeholder='Search'
                value={filter}
                onChange={(e)=> setFilter(e.target.value)}>

            </Input>
            <Table hover> 
                <thead>
                    <tr className='table-primary'>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Birthday</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key='{contact.id}'>
                            <td>{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.birthday}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Container>
    );

}
export default Contacts;