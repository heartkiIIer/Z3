import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the It's Bedtime routine page.
 * */
class ItsBedtime extends React.Component {
    toggleCheckbox(element){
        if(document.getElementById(element).checked == true){
            document.getElementById(element).checked = false;
        }
        else {
            document.getElementById(element).checked = true;
        }
    }

    setOpacity(){
        document.getElementsById("outer-circle").style.opacity = 1;
    }

    render(){
        return (
            <div class = "itsBedtime">
               <div class = "outer-circle" id = "outer-circle" onload = "document.getElementById(outer-circle).style.opacity='1'">
                   <div className="inner-circle">
                       It's Bedtime
                   </div>
               </div>

                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action" onClick={() => this.toggleCheckbox("checkbox1")}>
                        <div class = "align-check-and-label">
                            <div class = "checkbox checkbox-circle checkbox-primary ">
                                <input type="checkbox" id = "checkbox1"/>
                                <label for="checkbox1"/>
                            </div>
                            <p> 10 minutes of reading </p>
                        </div>
                    </button>
                    <button type="button" className="list-group-item list-group-item-action"
                            onClick={() => this.toggleCheckbox("checkbox2")}>
                        <div className="align-check-and-label">
                            <div className="checkbox checkbox-circle checkbox-primary ">
                                <input type="checkbox" id="checkbox2"/>
                                <label htmlFor="checkbox2"/>
                            </div>
                            <p> Brush teeth </p>
                        </div>
                    </button>
                    <button type="button" className="list-group-item list-group-item-action"
                            onClick={() => this.toggleCheckbox("checkbox3")}>
                        <div className="align-check-and-label">
                            <div className="checkbox checkbox-circle checkbox-primary ">
                                <input type="checkbox" id="checkbox3"/>
                                <label htmlFor="checkbox3"/>
                            </div>
                            <p> Meditate </p>
                        </div>
                    </button>
                </div>
            </div>
        );
    };
}
export default ItsBedtime;
