import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ResultObject } from "../../objects/resultObject";
import { ShipObject } from "../../objects/shipObject";
import { shipActions } from "../../store";
import { MainText, Spacer } from "../common/common";

interface Props {
    resultObject: ResultObject;
    setHasSearched: (boolean: boolean) => {};
    ships: ShipObject[];
} 

const Result = (props : Props) => {

    const dispatch = useDispatch();

    const updateHandler = (ship: ShipObject[]) => {
        dispatch(shipActions.update(ship));
      }

    const buttonHandler = () => {
        updateHandler(props.ships);
        props.setHasSearched(false);
    }

    return (
        <React.Fragment>
            <Container data-testid={"container"}>
                <Row data-testid={"row"}>
                    <Col style={{textAlign: "center"}} data-testid={"col"}>
                        <MainText>{props.resultObject.resultMessage}</MainText>
                    </Col>
                </Row>
                <Spacer/>
                { props.resultObject.result && 
                    <React.Fragment>
                        <Row data-testid={"row"}>
                            <Col data-testid={"col"}>
                                <MainText>Time taken: {props.resultObject.time}</MainText>
                            </Col>
                        </Row>
                        <Spacer/>
                        <Row data-testid={"row"}>
                            <Col data-testid={"col"}>
                                <MainText>Planet found: {props.resultObject.planet}</MainText>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
                <Spacer/>
                <Row data-testid={"row"}>
                    <Col style={{textAlign: "center"}}data-testid={"col"}>
                        <Button data-testid={"button"} onClick={buttonHandler}>Start Again</Button>
                    </Col>    
                </Row> 
            </Container>
        </React.Fragment> 
    )
}

export default Result;