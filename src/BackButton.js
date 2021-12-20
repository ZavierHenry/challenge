
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit"


export default function BackButton({onBack, visible}) {

    return (
        <MDBBtn tag='a' onClick={onBack} color='none' style={{visibility: visible ? "visible" : "hidden", color: 'blue', marginLeft: "30vh"}}>
            <MDBIcon fas size="lg" icon="arrow-left"></MDBIcon>
        </MDBBtn>
    )
}