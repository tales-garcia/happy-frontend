import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from './components/pages/CreateOrphanage/CreateOrphanage';
import Landing from './components/pages/Landing/landing';
import Map from './components/pages/Map/map';
import Orphanage from './components/pages/Orphanage/Orphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Landing} />
                <Route path="/map" exact={true} component={Map} />
                <Route path="/orphanages/create" exact={true} component={CreateOrphanage}/>
                <Route path="/orphanages/:id" exact={true} component={Orphanage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;