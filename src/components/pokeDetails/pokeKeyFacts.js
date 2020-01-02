import React, { Component } from 'react' 

const pokeKeyFacts = props => {
    return (
        <div className="pokedex__details-key-facts">
            <div className="pokedex__detials-key-fact">
                <label className="pokedex__details-label">Weight: </label>
                <span className="pokedex__details-info">{ (props.weight/10) + "kg" }</span>
            </div>
            <div className="pokedex__detials-key-fact">
                <label className="pokedex__details-label">Type(s): </label>
                { 
                    props.types.map((types, index) => 
                    <span className="pokedex__details-info" key={index}>
                        {types.type.name}
                        {
                            props.types.length !== (index+1) ? " / " : null
                        }                                
                    </span>
                    )
                }
            </div>
            <div className="pokedex__detials-key-fact">
                <label className="pokedex__details-label">Height: </label>
                <span className="pokedex__details-info">{ (props.height/10) + "m" }</span>
            </div>
        </div>
    )
}

export default pokeKeyFacts