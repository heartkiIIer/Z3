import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SaveButton from "../resources/icons/save-solid.svg";
import EditButton from "../resources/icons/edit-solid.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class UserSettings extends React.Component {

    render(){
        return (
            <div class = "content settings">
                <div class = "inner">
                    <h1 class = "blueHeader"> Modify your settings</h1>

                </div>
            </div>
        );
    };
}
export default UserSettings;
