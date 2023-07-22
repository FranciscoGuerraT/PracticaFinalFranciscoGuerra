import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";


const modeloTarea = {
    id: 0,
    name: "",
    description: "",
    isCompleted: "",
}

const ModalTarea = ({ mostrarModal, setMostrarModal, guardarTarea, editar, setEditar, editarTarea }) => {

    const [tarea, setTarea] = useState(modeloTarea);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setTarea(
            {
                ...tarea,
                [e.target.name]: e.target.value
            }
        );
    }

    const enviarDatos = () => {
        if (tarea.id == 0) {
            guardarTarea(tarea)
        } else {
            editarTarea(tarea)
        }
        setTarea(
            {
                ...tarea,
                id: 0,
                name: "",
                description: "",
                isCompleted: ""
            }
        );
    }

    useEffect(() => {
        if (editar != null) {
            setTarea(editar);
        } else {
            setTarea(modeloTarea);
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {tarea.id == 0 ? "Nueva Tarea" : "Editar Tarea"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="name" onChange={(e) => actualizaDato(e)} value={tarea.name} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input name="description" onChange={(e) => actualizaDato(e)} value={tarea.description} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Tarea completa</Label>
                        <Input name="isCompleted" onChange={(e) => actualizaDato(e)} value={tarea.isCompleted} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button className="me-2" onClick={enviarDatos} color="primary" size="sm" >Guardar</Button>
                <Button color="danger" onClick={() => setMostrarModal(!mostrarModal)} size="sm">Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalTarea;