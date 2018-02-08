import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import { container } from 'reactstrap';

export default function run_demo(root, channel) {
  ReactDOM.render(<Demo channel={channel}/>, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
	board: [],
	actual: ([]),
	isEnabled: [],
	score:0,
	noClick: 0,
	index1: -1,
	index2: -1,
	char1: "",
	char2: "",
	clickable: true,
	name: ""
 	};
    this.name = props.name
    this.channel = props.channel
     	this.channel.join()
        			.receive("ok", this.passToState.bind(this))
        			.receive("error", resp => { console.log("Unable to join", resp) });
  }
	
 
handleClick(index)
{
		if(this.state.clickable)
			this.channel.push("click", {index: index}).receive("ok", this.passToState.bind(this))
}


passToState(gameState)
{
	if(!gameState.game.clickable)
	{
		setTimeout(() => 
		{
			var tempBoard = gameState.game.board
			tempBoard[gameState.game.index1] = "?"
			tempBoard[gameState.game.index2] = "?"
			var tempIsEnabled = gameState.game.isEnabled
			tempIsEnabled[gameState.game.index1] = true
			tempIsEnabled[gameState.game.index2] = true
    		this.channel.push("update", {board: tempBoard,
										actual: gameState.game.actual,
										isEnabled: tempIsEnabled,
										score: gameState.game.score,
										noClick: gameState.game.noClick,
										index1: gameState.game.index1,
										index2: gameState.game.index2,
										char1: gameState.game.char1,
										char2: gameState.game.char1,
										clickable: true,
										name: gameState.game.name})
    					.receive("ok", resp => { console.log("Updated", resp) })
				this.setState({
            	board: tempBoard,
            	isEnabled: tempIsEnabled,
		    	clickable: true
   			})
		}, 2000);
	}
	this.setState(gameState.game)		
}

getScore(gameState)
{
	return gameState.score;
}

newGame()
{
	this.channel.push("new",{name: this.state.name}).receive("ok", this.passToState.bind(this))
}

  render() {
		return (
		<div className="container">
			<div className="row">
				<div className="col">
					<div id="Playername">	
						Name={this.state.name}
					</div>
					<div id="score">	
						Score={this.getScore(this.state)}
					</div>
				</div>
				<div className="col">
					<div className="board">
						{this.state.board.map((cell, index) => {return <div className="square" 	onClick={() => this.handleClick(index)} >{cell}</div>})}
					</div>
				</div>
				<div className="col">
					<div className="row">					
						<button className="btn btn-info" name="Restart" onClick={() => this.newGame()} >New Game</button>
					</div>
					<div className="row">					
						<a href="http:\\prateekpisat.com"><button className="btn btn-info" name="Back to HomePage">Back</button></a>
					</div>
				</div>
		      </div>	
		 </div>		
    		);
	}
}






