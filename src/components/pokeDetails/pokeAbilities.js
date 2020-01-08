import React from 'react' 

const pokeAbilities = props => {
    return (
        <tbody>
            { props.abilities.map((abilities, index) => (
                    <tr key={index}>
                        <td>{abilities.ability.name}</td>
                        <td>{abilities.is_hidden.toString()}</td>
                        <td>{abilities.slot}</td> 
                    </tr>
                )
            )}
        </tbody>
    )
}

export default pokeAbilities