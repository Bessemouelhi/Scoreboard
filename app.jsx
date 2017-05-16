var PLAYERS = [
  {
    id: 1,
    name: "John Hopkins",
    score: 53
  },
  {
    id: 2,
    name: "Bruce Smith",
    score: 58
  },
  {
    id: 3,
    name: "Linda Afflek",
    score: 64
  }
];

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function (total, player) {
    return total + player.score;
  }, 0);

  return (
    <div className="stats col-xs-3">
      <p className="display text-center">Players : {totalPlayers}</p>
      <p className="display text-center">Total Points : {totalPoints}</p>
    </div>
  )
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
}

function Header(props) {
  return (
    <div className="panel-heading">
      <div className="row">
        <Stats players={props.players} />
        <div className="title col-xs-6 text-center text-uppercase">{props.title}</div>
        <div className="col-xs-3">
          <p className="display text-center">0</p>
          <div className="btn-group btn-group-justified center-block" role="group"
            aria-label="Justified button group">
            <a href="#" className="btn btn-default" role="button">STOP</a>
            <a href="#" className="btn btn-default" role="button">RESET</a>
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
}

function Counter(props) {
  return (
    <div className="row">
      <div className="btn-group btn-group-justified" role="group"
        aria-label="Justified button group">
        <a className="btn btn-danger" role="button" onClick={function () { props.onChange(-1); }} >
          <span className="display glyphicon glyphicon-minus" aria-hidden="true"></span>
        </a>
        <a href="#" className="display btn btn-default" disabled="disabled"
          role="button">{props.score}</a>
        <a className="btn btn-success" role="button" onClick={function () { props.onChange(1); }} >
          <span className="display glyphicon glyphicon-plus" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  )
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}



function Player(props) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="title col-xs-8">{props.name}</div> {/*JIM HOSKINS*/}
        <div className="col-xs-4">
          <Counter score={props.score} onChange={props.onScoreChange} />
        </div>
      </div>
    </li>
  )
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired
}

var AddPlayer = React.createClass({
  render: function () {
    return (
        <div className="">
          <form role="form">
            <div className="row">
              <div className="col-xs-12">
                <div className="input-group input-group-md">
                  <input type="text" className="form-control" placeholder="Add a player here" />
                  <div className="input-group-btn">
                    <button type="submit" className="btn">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
})

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired
    })).isRequired,
  },

  getDefaultProps: function () {
    return {
      title: 'Scoreboard'
    };
  },

  getInitialState: function () {
    return {
      players: this.props.initialPlayers,
    };
  },

  onScoreChange: function (index, delta) {
    console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },


  render: function () {
    return (
      <div className="application">
        <div className="panel panel-primary">
          <Header title={this.props.title} players={this.state.players} />
          <ul className="players list-group">
            {this.state.players.map(function (player, index) {
              return (
                <Player onScoreChange={function (delta) { this.onScoreChange(index, delta) }.bind(this)}
                  name={player.name} score={player.score} key={player.id} />
              );
            }.bind(this))}
          </ul>
          <AddPlayer />
        </div>
        
      </div>
    )
  }
})

ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));