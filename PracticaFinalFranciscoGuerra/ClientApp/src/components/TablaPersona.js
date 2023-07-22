import { Button, Table } from "reactstrap"

const TablaPersona = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarTarea }) => {

    const enviarDatos = (persona) => {
        setEditar(persona)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Tarea completa</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin Registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.isCompleted}</td>
                                <td>
                                    <Button onClick={() => enviarDatos(item)} className="me-2" color="primary" size="sm">Editar</Button>
                                    <Button onClick={() => eliminarTarea(item.id)} color="danger" size="sm">Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaPersona;