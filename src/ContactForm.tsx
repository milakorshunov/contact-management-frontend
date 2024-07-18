import React from "react";
import { Container, Form, Input, Button } from "reactstrap";
import { Contact } from "./types";

interface ContactFormProps {
    contact: Contact;
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCancel: () => void;

}

const ContactForm: React.FC<ContactFormProps> = ({ contact, handleSubmit, handleChange , handleCancel}) => {
    return (
        <Container>
            <Form onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gap: "10px",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "repeat(6, auto)",
                    marginTop: "10px"
                }}>
                <Input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={contact.first_name}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={contact.last_name}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={handleChange}
                    style={{ gridColumn: "span 2" }}
                />
                <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleChange}
                    style={{ gridColumn: "span 2" }}
                />
                <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={contact.address}
                    onChange={handleChange}
                    style={{ gridColumn: "span 2" }}
                />
                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={contact.notes}
                    onChange={handleChange}
                    style={{ gridColumn: "span 2" }}
                ></textarea>
                <Input
                    type="date"
                    name="birthday"
                    value={contact.birthday}
                    onChange={handleChange}
                    style={{ gridColumn: "span 2" }}
                />
                <Button type="submit" color="primary">
                    Save
                </Button>
                <Button type="button" onClick={handleCancel} color="primary">
                    Cancel
                </Button>

            </Form>

        </Container>
    );

}
export default ContactForm;