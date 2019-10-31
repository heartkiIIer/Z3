import React from 'react';

class ItsBedtime extends React.Component {
    render(){
        return (
            <div>
                <h1>Test</h1>
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action active">
                        Cras justo odio
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Dapibus ac facilisis in
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
                    <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac
                    </button>
                    <button type="button" className="list-group-item list-group-item-action" disabled>Vestibulum at
                        eros
                    </button>
                </div>
            </div>
        );
    };
}
export default ItsBedtime;
