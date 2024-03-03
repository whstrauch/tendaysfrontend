import React from 'react';
import "./RulesModal.css";

const Rules = () => {
    return (
        <div className='flex-col' style={{width: "100%", padding: "5px"}}>
            <h3>The Objective:</h3>
            <p>Using country and transportation cards be the first player to create a successful 10 day route across Africa.</p>
            <h3>Getting Started:</h3>
            <p>
                Taking turns, players fill their DAY 1-10 blocks with cards from the draw pile.
                Once all players have filled their blocks the first player starts the game by drawing from the draw pile.
            </p>
            <h3>During the Turn:</h3>
            <p>
                A player may either draw from the face down draw pile or from one of the communal face up piles.
                When drawing the tile the player may replace one tile from their ten tiles and place the replaced
                tile on a face up pile of their choice or they can decide not to use the tile and place on a face up pile.
            </p>
            <h3>Making Connections:</h3>
            <div style={{marginLeft: "10px"}}>
                
                <p><span>Connecting by Foot:</span> Players may travel by foot from one country to a bordering country. The bordering country tiles are connected to each other when they are positioned side-by-side in the tile holder. A broken black line indicates a connection by ferry (therefore by foot). Two country tiles are considered connected if there is a broken black line connecting the two countries on the map, or if they are located next to each other. </p>
                <p><span>Connecting by Automobile:</span> Players may use an automobile to travel from one country to another country by driving through a third country which borders both of those countries. When the automobile tile is positioned between the two country tiles, these three tiles are connected to each other.</p>
                <p><span>Connecting by Airplane:</span> Players may use an airplane to fly from one country to another country of the same color. When the airplane tile is positioned between the two country tiles, and is the same color as both country tiles, these three tiles are connected to each other. </p>
            </div>
            <h3>Winning the Game:</h3>
            <p>
                A player has won the game when they have completed a successful 10 day journey.
            </p>
            <h4>Requirements:</h4>
            <ul>
                <li>Completed journeys must start with a country tile and end with a country tile.</li>
                <li>Not necessary to include either an airplane or an automobile tile to complete the journey</li>
                <li>No transportation tiles may be next to each other.</li>
            </ul>
        </div>
    )
}

const RulesModal = ({active, exit}) => {
    if (active) {
        return (
            <div className='modal-background' >
                <div className='modal-container'>
                    <div className='flex-row' style={{width: "100%", justifyContent: 'space-between', position: 'sticky', top: "-5px", backgroundColor: 'white'}}>
                        <div style={{width: 20, display: 'flex'}}></div>
                        <h2>RULES</h2>
                        <button className="menu" onClick={exit} style={{paddingRight: "5px", cursor: "pointer"}}>
                            <svg viewBox="-15 -15 115 115" width="25" height="25" fill='blue' transform='rotate(45)'>
                                <rect width="10" height="100" rx={8} x={45} fill='black'></rect>
                                <rect width="100" height="10" rx={8} y={45} fill='black'></rect>
                            </svg>
                        </button>
                    </div>
                    <Rules/>

                </div>
            </div>
        );
    }
    
};

export default RulesModal;

