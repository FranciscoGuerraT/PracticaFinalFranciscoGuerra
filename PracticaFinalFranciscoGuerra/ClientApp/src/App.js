import { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button, CardFooter } from "reactstrap"
import ModalTarea from "./components/ModalTarea";
import TablaTarea from "./components/TablaPersona";

const App = () => {

    const [tareas, setTareas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const mostrarTareas = async () => {
        const response = await fetch("api/persona/Lista");

        if (response.ok) {
            const data = await response.json();
            setTareas(data)
        } else {
            console.log("Errror en los datos de la vista")
        }
    }

    useEffect(() => {
        mostrarTareas()
    }, [])


    const guardarTarea = async (contactos) => {
        const response = await fetch("api/persona/Guardar", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contactos)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarTareas();
        }
    }


    const editarTarea = async (tarea) => {
        const response = await fetch("api/persona/Editar", {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tarea)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarTareas();
        }
    }

    const eliminarTarea = async (id) => {

        var respuesta = window.confirm("Desea eliminar la tarea?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/persona/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarTareas();
        }
    }

    const mostrarTareaById = async (id) => {
        const response = await fetch("api/persona/ListaById/" + id);

        if (response.ok) {
            const data = await response.json();
            setTareas(data)
        } else {
            console.log("Errror en los datos de la vista")
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <Row className="mt-1">
                                <Col sm="6"><h5>Lista de Tareas</h5></Col>
                                <Col sm="3"></Col>
                                <Col sm="3">
                                    <Button onClick={() => setMostrarModal(!mostrarModal)} size="sm" color="success">Nueva Tarea</Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <TablaTarea data={tareas}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarTarea={eliminarTarea}
                            />
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ModalTarea
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarTarea={guardarTarea}
                editar={editar}
                setEditar={setEditar}
                editarTarea={editarTarea}
            />
        </Container>
    )
}


export default App;


