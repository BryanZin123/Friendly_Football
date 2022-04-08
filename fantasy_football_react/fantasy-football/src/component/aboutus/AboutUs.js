import React from "react";
import howToPlay from "../../images/how to play.jpg"
import howToScore from "../../images/scoring.jpg"
export const AboutUs=()=>{
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="row mt-2 bg-light">
                    <h3><strong>How to Play Fantasy Football</strong></h3>
                    </div>
                    <div className="row text-center pb-2">
                        <img src={howToPlay} alt="nfl pics"></img>
                        <a href="https://www.nfl.com/news/how-to-play-fantasy-football-a-beginners-guide">FANTASY FOOTBALL BEGINNER'S GUIDE</a>
                    </div>
                    <div className="row pb-5">
                        <img src={howToScore} alt="how to score"></img>
                    </div>
                </div>
            </div>
        </div>

    )
}

