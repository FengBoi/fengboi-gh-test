import React from "react"
import { Button, Container, Col, Row } from "react-bootstrap"
import { PlanetObject } from "../../objects/planetObject";
import { ResponseObject } from "../../objects/responseObject";
import { ResultObject } from "../../objects/resultObject";
import { SelectObject } from "../../objects/selectObject";
import postFetchClient from "../../services/postFetchClient";
import ShipPicker from "../shipPicker/ShipPicker";
import { MainText, Spacer } from "../common/common";

interface Props {
    planets: PlanetObject[],
    setResult: (result: ResultObject) => {}
    setHasSearched: (boolean: boolean) => {}
}

const Selector = (props: Props) => {

    const initialState: SelectObject = {
        planet: "",
        ship: "",
        time: 0
    };

    const [firstOption, setFirstOption] = React.useState( initialState as SelectObject);
    const [secondOption, setSecondOption] = React.useState(initialState as SelectObject);
    const [thirdOption, setThirdOption] = React.useState(initialState as SelectObject);
    const [fourthOption, setFourthOption] = React.useState(initialState as SelectObject);

    const filteredPlanets = (selectedPlanet: string) => {
        const selectedPlanets = [firstOption.planet, secondOption.planet, thirdOption.planet, fourthOption.planet]
        return props.planets.filter(planet => {
            return !selectedPlanets.filter(planetName => planetName !== selectedPlanet).includes(planet.name)
        })
    }

    const buttonHandler = () => {
        postFetchClient("https://5f5ff7f790cf8d00165573ed.mockapi.io/find", buildPostObject)
            .then(res => returnResult(res));
    };

    const returnResult = (res: ResponseObject) => {
        console.log(res);
        let resultObject = {} as ResultObject;
        let allOptions = [firstOption, secondOption, thirdOption, fourthOption]; 

        if(res.status === "failure"){
            resultObject.result = false;
            resultObject.resultMessage = "Unsucessful, please try again commander"
        } else if(res.status === "success") {
            let optionObject = allOptions.find(currentPlanet => currentPlanet.planet === res.planet_name);
            if(optionObject !== undefined) {
                resultObject.time = optionObject.time
            }
            resultObject.result = true;
            resultObject.resultMessage = "Success! Congratulations on Finding Falcone. King Shan is mighty pleased."
            resultObject.planet = res.planet_name;
        }

        console.log(resultObject);
        props.setResult(resultObject);
        props.setHasSearched(true);
    }

    const buildPostObject = {
        "planet_name" : [
            firstOption.planet,
            secondOption.planet,
            thirdOption.planet,
            fourthOption.planet
        ], "vehicle_names" : [
            firstOption.ship,
            secondOption.ship,
            thirdOption.ship,
            fourthOption.ship
        ]
    }

    const isButtonDisabled = () => {
        return !(firstOption.ship && secondOption.ship && thirdOption.ship && fourthOption.ship);
    } 

    return (    
        <React.Fragment>
            <Container data-testid="container">
                <Row data-testid="row">
                    <Col data-testid="col">
                        <MainText>Select planets you want to search in:</MainText>
                    </Col>
                </Row>
                <Spacer/>
                <Row data-testid="row">
                    <Col data-testid="col">
                        <ShipPicker data-testid="shipPicker" key={"shipPicker-1"} id={1} planets={filteredPlanets(firstOption.planet)} setOption={setFirstOption} />
                    </Col>
                    <Col data-testid="col">
                        <ShipPicker data-testid="shipPicker" key={"shipPicker-2"} id={2} planets={filteredPlanets(secondOption.planet)} setOption={setSecondOption}/>
                    </Col>
                    <Col data-testid="col">
                        <ShipPicker data-testid="shipPicker" key={"shipPicker-3"} id={3} planets={filteredPlanets(thirdOption.planet)} setOption={setThirdOption}/>
                    </Col>
                    <Col data-testid="col">
                        <ShipPicker data-testid="shipPicker" key={"shipPicker-4"} id={4} planets={filteredPlanets(fourthOption.planet)} setOption={setFourthOption}/>
                    </Col>
                </Row>
                <Spacer/>
                <Row data-testid="row">
                    <Col data-testid="col">
                        <Button data-testid="button" onClick={buttonHandler} disabled={isButtonDisabled()}>Find Falcone!</Button>
                    </Col>
                    <Col data-testid="col">
                        <MainText> Maximum Time: {Math.max(firstOption.time, secondOption.time, thirdOption.time, fourthOption.time)}</MainText>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Selector;