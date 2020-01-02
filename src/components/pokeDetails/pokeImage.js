import React, { Component } from 'react' 

const PokeImage = props => {
    return (
        <div className="pokedex__details-sprite">
            <img src={`../sprites/${props.id}.png`} alt={props.name} />
        </div>
    )
}

export default PokeImage