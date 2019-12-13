import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the an example modules page.
 * */

class MobileExampleModule extends React.Component {

    render(){
        return (
            <div class = "content modules mobilePage" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                <div className="inner mindfulnessMobile" id="page-wrap">
                    <h1 class = "blueHeaderMobile"> Mindful Eating</h1>
                    <hr class = "hr-settings"/>
                    <h2>Subtopic 1</h2>
                    <p>I am so used to being the bad boy. I am so used to fighting Corporate that I forget that I am Corporate. Upper management, Jan made me breakfast this morning. Well, she bought the milk... It's soy! Ah, that baby is just discovering the whole wide world right now.</p>
                    <br/>
                     <p> It's pretty amazing, did this happen on company property? I miss the feeling of knowing you did a good job beacuse someone gives you proof of it. 'Sir, you're awesome, let me give you a plaque! What? A whole year has gone by? You need more proof? Here is a certificate.' They stopped making plaques that year, whoa. Wow. Who told you that?

                        It's a trap, what I wanna do, right now, is try something a little different.  I want you to say whatever you want, take it away. Your meeting.</p>
                    <hr className="hr-settings"/>

                    <iframe id = "video" width="250" height="175" src="https://www.youtube.com/embed/CtOU4f3smt4" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" align="center"
                            allowFullScreen>
                    </iframe>
                </div>
                </div>
            </div>
        );
    };
}
export default MobileExampleModule;
