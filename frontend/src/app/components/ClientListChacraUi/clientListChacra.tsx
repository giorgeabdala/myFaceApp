import React, { useState, useEffect } from "react";
import {
    ChakraProvider,
    Box,
    Heading,
    Table,
    Tbody,
    Tr,
    Td,
    Input,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:3001/clients"


interface Client {
    id: number;
    firstName: string;
    lastName: string;
    DDD: string;
    phone: string;
    email: string;
}

function ClientListChacra() {
    console.log("Backend_ur:" + process.env.NEXT_PUBLIC_BACKEND_URI);
    const [clients, setClients] = useState<Client[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DDD, setDDD] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        async function fetchClients() {
            try {
                console.log("Fetching clients");
                const response = await axios.get(BACKEND_URI);
                setClients(response.data.body);
            } catch (error) {
                console.log(error);
            }
        }
        fetchClients();
    }, []);

    async function handleUpdateClient(client: Client) {
        try {
            const updatedClient = { id: client.id, firstName: client.firstName, lastName: client.lastName, DDD: client.DDD, phone: client.phone, email: client.email };
            console.log(updatedClient);
            const patch = await axios.patch(BACKEND_URI, updatedClient);

            // @ts-ignore
            setClients(clients.map((c) => (c.id === client.id ? updatedClient : c)));
            toast({
                title: "Cliente atualizado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Erro ao atualizar cliente",
                description: "Verifique os dados e tente novamente",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    async function handleAddClient() {
        try {
            const newClient = { firstName, lastName, DDD, phone, email };
            const response = await axios.post(BACKEND_URI, newClient);
            setClients([...clients, response.data.body]);
            toast({
                title: "Cliente adicionado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            console.log(error);
            toast({
                title: "Erro ao adicionar cliente",
                description: "Verifique os dados e tente novamente",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>, client: Client) {
        const updatedClients = clients.map((c) => {
            if (c.id === client.id) {
                return { ...c, firstName: event.target.value };
            }
            return c;
        });

        setClients(updatedClients);
    }

    function handleDDDChange(event: React.ChangeEvent<HTMLInputElement>, client: Client) {
        const updatedClients = clients.map((c) => {
            if (c.id === client.id) {
                return { ...c, DDD: event.target.value };
            }
            return c;
        });

        setClients(updatedClients);
    }

    function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>, client: Client) {
        const updatedClients = clients.map((c) => {
            if (c.id === client.id) {
                return { ...c, phone: event.target.value };
            }
            return c;
        });
        setClients(updatedClients);
    }







    return (
        <ChakraProvider>
            <Box>
                <Heading>Listagem de clientes</Heading>
                <Button colorScheme="blue" onClick={onOpen}>
                    Adicionar
                </Button>
                <Table>
                    <Tbody>
                        {clients.map((client) => (
                            <Tr key={client.id}>
                                <Td>{client.id}</Td>
                                <Td> <Input value={client.firstName} onChange={(event) => handleFirstNameChange(event, client)}/> </Td>
                                <Td>{client.lastName}</Td>
                               <Td><Input value={client.DDD} onChange={(event) => handleDDDChange(event, client)}/></Td>
                                <Td> <Input value={client.phone} onChange={(event) => handleNumberChange(event, client)}/> </Td>
                                <Td>{client.email}</Td>
                                <Td>
                                    <Button colorScheme="pink" onClick={() => handleUpdateClient(client)}>
                                        Alterar
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Adicionar Cliente</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Sobrenome</FormLabel>
                                <Input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>DDD</FormLabel>
                                <Input value={DDD} onChange={(e) => setDDD(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Telefone</FormLabel>
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleAddClient}>
                                Adicionar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </ChakraProvider>
    );
}

export default ClientListChacra;
