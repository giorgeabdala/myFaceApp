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
} from "@chakra-ui/react";
import axios from "axios";

interface Client {
    id: number;
    firstName: string;
    lastName: string;
    DDD: string;
    phone: string;
    email: string;
}

function ClientListChacra() {
    const [clients, setClients] = useState<Client[]>([]);
    const [firstName, setFirstName] = useState("");
    const [DDD, setDDD] = useState("");
    const [number, setNumber] = useState("");

    const toast = useToast();

    useEffect(() => {
        async function fetchClients() {
            try {
                console.log("Fetching clients");
                const response = await axios.get("http://localhost:3000/client");
                setClients(response.data.body);
            } catch (error) {
                console.log(error);
            }
        }
        fetchClients();
    }, []);

    async function handleUpdateClient(client: Client) {
        try {
            const updatedClient = { id: client.id, firstName: client.firstName, lastName: client.lastName, DDD: client.DDD, phone: client.phone, email: null };
            console.log(updatedClient);
            const patch = await axios.patch("http://localhost:3000/client/", updatedClient);

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
            <Box textAlign="center" fontSize="xl">
                <Heading>Listagem de Clientes</Heading>
                <Table mt="4" size="md" variant="simple">
                    <Tbody>
                        {clients.map((client : Client) => (
                            <Tr key={client.id}>
                                <Td>{client.id}</Td>
                                <Td> <Input value={client.firstName} onChange={(event) => handleFirstNameChange(event, client)}
                                /> </Td>
                                <Td>
                                    <Input value={client.DDD} onChange={(event) => handleDDDChange(event, client)}/></Td>
                                <Td>
                                    <Input value={client.phone} onChange={(event) => handleNumberChange(event, client)}/> </Td>
                                <Td>
                                    <Button colorScheme="pink" onClick={() => handleUpdateClient(client)}>
                                        Atualizar
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </ChakraProvider>
    );
}

export default ClientListChacra;
