import React from 'react';
import "../styles/ItsBedtime.css";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the It's Bedtime routine page.
 * */
class ItsBedtime extends React.Component {
    render(){
        return (
            <div class = "itsBedtime">
                <h1>Test</h1>
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action">
                        Cras justo odio
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Dapibus ac facilisis in
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
                    <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Vestibulum at
                        eros
                    </button>
                </div>
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action">
                        <input type="checkbox" class = "customCheckbox"/>
                        <input type="checkbox" />

                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Dapibus ac facilisis in
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
                    <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Vestibulum at
                        eros
                    </button>
                </div>
            </div>
        );
    };
}
export default ItsBedtime;
