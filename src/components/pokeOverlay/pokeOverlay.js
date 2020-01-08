import React, { Component } from 'react'
import './poke-overlay.css'

export default class PokeOverlay extends Component {
    clearPoke = _ => {
        this.props.clearPoke()
    }

    render () {
        const props = this.props

        return (
            <div className="pokedex__overlay">
                {/* <div className="lds-ring"><div></div><div></div><div></div><div></div></div> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" display="block">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(30 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(60 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(90 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(120 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(150 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(180 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(210 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(240 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(270 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(300 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#3cb6ce" transform="rotate(330 50 50)">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
                    </rect>
                </svg>
            </div>
        )
    }
}