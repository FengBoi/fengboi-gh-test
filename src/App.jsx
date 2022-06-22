import React from "react";
import { Wrapper } from "./components/common/common";
import PageFooter from "./components/layout/PageFooter";
import PageHeader from "./components/layout/PageHeader";
import Selector from "./components/selector/Selector";
import getFetchClient from "./services/getFetchClient";
import Result from "./components/result/Results";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { shipActions } from "./store";

function App() {

  const [planets, setPlanets] = React.useState([]);
  const [ships, setShips] = React.useState([]);
  const [result, setResult] = React.useState({});

  const dispatch = useDispatch();

  const [hasSearched, setHasSearched] = React.useState(false);

  const shipFilter = (ships) => {
    return ships.filter(ship => ship.name !== 'name NaN');
  }

  React.useEffect(() => {
    const updateHandler = (ship) => {
      dispatch(shipActions.update(ship));
    }

    getFetchClient("https://5f5ff7f790cf8d00165573ed.mockapi.io/planets")
      .then(planets => setPlanets(planets));
    getFetchClient("https://5f5ff7f790cf8d00165573ed.mockapi.io/vehicles")
    .then(ships => {
      updateHandler(shipFilter(ships));
      setShips(shipFilter(ships));
    });
  }, [dispatch])

  return (
    <Wrapper>
      <PageHeader/>
      { hasSearched ? 
        <Result resultObject={result} setHasSearched={setHasSearched} ships={ships}/> : 
        <Selector planets={planets} setResult={setResult} setHasSearched={setHasSearched}/>}
      <PageFooter/>
    </Wrapper>
  );
}

export default App;
