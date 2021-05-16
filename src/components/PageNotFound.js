import React from 'react';
import { useHistory } from 'react-router';

export default function PageNotFound() {
    let history = useHistory();
    return (
        <div className="col page-not-found">

            <img id="police"
                src="https://www.svgrepo.com/show/274871/policeman.svg"
                alt="police says go back" />


            <p id="warning-401">WARNING: YOU ARE NOT AUTHORISED HERE.</p>
            <p id="police-says">  Popo says <b>Press Home</b> to go back</p>

            <img id="home-pic"
                src="https://www.svgrepo.com/show/129433/home.svg"
                alt="home" onClick={() => history.push("/")}
            />



        </div>
    )
}
