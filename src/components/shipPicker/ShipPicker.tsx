import React from "react";
import { FormControl, FormControlLabel, InputLabel, MenuItem , Radio, RadioGroup, Select } from "@mui/material";
import { Spacer } from "../common/common";
import { ShipObject } from "../../objects/shipObject";
import { PlanetObject } from "../../objects/planetObject";
import { SelectObject } from "../../objects/selectObject";
import { StoreObject } from "../../objects/storeObject";
import { shipActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";

interface Props {
    id: number,
    planets: PlanetObject[],
    setOption: (selectObject : SelectObject) => void,
}

const ShipPicker = (props: Props) => {

    const dispatch = useDispatch();
    const ships : ShipObject[] = useSelector((state: StoreObject) => state.ships);

    const increaseHandler = (ship: string) => {
        dispatch(shipActions.increase(ship));
    }

    const decreaseHandler = (ship: string) => {
        dispatch(shipActions.decrease(ship));
    }

    const initialState: SelectObject = {
        planet: "",
        ship: "",
        time: 0
    };

    var option = initialState;

    const [planet, setPlanet] = React.useState("");
    const [ship, setShip] = React.useState("");

    const handleDropdown = (event: any) => {
        option.planet = event.target.value;
        props.setOption(option);
        setPlanet(event.target.value);
    }

    const dropdownOptions = props.planets.map(planet => 
        <MenuItem key={`${props.id}-dropdown-${planet.name}`} data-testid={`${props.id}-dropdown-${planet.name}`} value={planet.name}>
            {planet.name}
        </MenuItem>
    );

    const handleRadioGroup = (event: any) => {
        if(ship !== "") {increaseHandler(ship)};
        decreaseHandler(event.target.value);

        let planetObject = props.planets.find(currentPlanet => currentPlanet.name === planet);
        let shipObject = ships.find(currentShip => currentShip.name === event.target.value);

        if(planetObject && shipObject) {
            option.planet = planet
            option.time = planetObject.distance / shipObject.speed;
            option.ship = event.target.value
            props.setOption(option);
        }
        setShip(event.target.value);
    }

    const isShipViable = (shipName: string) => {
        let planetObject = props.planets.find(currentPlanet => currentPlanet.name === planet);
        let shipObject = ships.find(currentShip => currentShip.name === shipName);
        
        if(!planetObject || !shipObject) {
           return true
        } else if(planetObject.distance > shipObject.max_distance){
            return false;
        } else if(shipName === ship) {
            return true;
        }else if(shipObject.total_no < 1){
            return false;
        } else {
            return true;
        }
    }

    const radioGroupOptions = ships.map(ship => 
        <FormControlLabel 
            data-testid={`${props.id}-radio-group-${ship.name}`}
            key={`${props.id}-radio-group-${ship.name}`}
            value={ship.name} 
            control={<Radio />} 
            label={ship.name} 
            disabled={!isShipViable(ship.name)}
        />)

    return (
        <Col>
            <FormControl fullWidth>
                <InputLabel id={`falcone-label-input-${props.id}`}>Planets</InputLabel>
                <Select
                    data-testid={`${props.id}-dropdown-menu`}
                    labelId={`falcone-select-label-${props.id}`}
                    inputProps={{ "data-testid": `${props.id}-dropdown-input` }}
                    id={`falcone-select-${props.id}`}
                    value={planet}
                    label="Planets"
                    SelectDisplayProps={{ "data-testid": `${props.id}-dropdown-button` } as {}}
                    onChange={handleDropdown}
                >
                    {dropdownOptions}
                </Select>
            </FormControl>
            <Spacer/>
            {planet && <RadioGroup
                data-testid={`${props.id}-radio-group`}
                aria-labelledby={`falcone-radio-buttons-group-${props.id}`}
                name={`controlled-radio-buttons-group-${props.id}`}
                value={ship}
                onChange={handleRadioGroup}
            >
                {radioGroupOptions}
            </RadioGroup>
            }
        </Col>
    )
};

export default ShipPicker;