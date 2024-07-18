import React, { useEffect, useState } from "react";
import { Container, Table, Input , Row, Col, Button} from "reactstrap";
import { Contact } from "./types";

interface ContactListProps {
    contacts: Contact[];
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    handleAddNewContact:()=>void;
    handleEdit: (id:number)=> void;
    handleDelete: (id:number) => void;
}
const ContactList:React.FC<ContactListProps> = ({contacts, setFilter, handleAddNewContact, handleEdit, handleDelete}) => {

    return (
        <Container>
          <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col md={8} style={{ paddingRight: "5px" }}>
            <Input
              type="text"
              placeholder="Search Contacts"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            ></Input>
          </Col>
          <Col md={4} style={{ paddingLeft: "5px" }}>
            <Button
              color="primary"
              className="w-100"
              onClick={handleAddNewContact}
            >
              Add New Contact
            </Button>
          </Col>
        </Row>
          <Table hover>
            <thead>
              <tr className="table-primary">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthday</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.birthday}</td>
                  <td>
                    <Button color="primary" onClick={()=>handleEdit(contact.id)} style={{ marginRight: "10px" }}>Edit</Button>
                    <Button color="danger" onClick={()=>handleDelete(contact.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
}

export default ContactList;