import React from 'react' 

const pokeProgressBar = props => {
    return (
        <div className="pokedex__details-stats">
            { props.stats.map((stats, index) => (
                    <div className="pokedex__details-stat" key={index}>
                        <label className="pokedex__details-stat-label">{stats.stat.name}</label>
                        <div className="pokedex__details-progressbar-container">
                            <div className="pokedex__details-progressbar" style={{ width: (stats.base_stat/150*100) + "%" }}>
                                {stats.base_stat}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default pokeProgressBar