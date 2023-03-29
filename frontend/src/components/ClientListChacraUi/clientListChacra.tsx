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
    number: string;
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
            const updatedClient = { id: client.id, firstName: client.firstName, DDD: client.DDD, number: client.number };
            await axios.patch("http://localhost:3000/client/", updatedClient);
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

    return (
        <ChakraProvider>
            <Box textAlign="center" fontSize="xl">
                <Heading>Listagem de Clientes</Heading>
                <Table mt="4" size="md" variant="simple">
                    <Tbody>
                        {clients.map((client : Client) => (
                            <Tr key={client.id}>
                                <Td>{client.id}</Td>
                                <Td> <Input placeholder={client.firstName} _placeholder={{ color: 'black' }} onChange={(e) => setFirstName(e.target.value)}/> </Td>
                                <Td>
                                    <Input placeholder={client.DDD} _placeholder={{ color: 'black' }} onChange={(e) => setDDD(e.target.value)} /></Td>
                                <Td>
                                    <Input placeholder={client.number} _placeholder={{ color: 'black' }} onChange={(e) => setNumber(e.target.value)} /> </Td>
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
