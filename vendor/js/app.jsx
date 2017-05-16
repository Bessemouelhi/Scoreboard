var PLAYERS = [
  {
    id: 1,
    name: "John Hopkins",
    score: 42
  },
  {
    id: 2,
    name: "Bruce Smith",
    score: 49
  },
  {
    id: 3,
    name: "Linda Afflek",
    score: 53
  }
]

function Header(props) {
  return (
    <div className="panel-heading">
      <div className="row">
        <div className="col-xs-3">
          <p className="display text-center">Players : 0</p>
          <p className="display text-center">Total Points : 0</p>
        </div>
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
  title: React.PropTypes.string.isRequired
}

/*var Counter = React.createClass({
  propTypes: {
    initialScore: React.PropTypes.number.isRequired
  },
  getInitialState: function () {
    return {
      score: this.props.initialScore,
    }
  },
  incrementScore: function (e) {
    this.setState({
      score: (this.state.score + 1)
    })
  },
  decrementScore: function (e) {
    this.setState({
      score: (this.state.score - 1)
    })
  },
  render: function () {
    return (
      <div className="row">
        <div className="btn-group btn-group-justified" role="group"
          aria-label="Justified button group">
          <a href="#" className="btn btn-danger" role="button" onClick={this.decrementScore} >
            <span className="display glyphicon glyphicon-minus" aria-hidden="true"></span>
          </a>
          <a href="#" className="display btn btn-default" disabled="disabled"
            role="button">{this.state.score}</a>
          <a href="#" className="btn btn-success" role="button" onClick={this.incrementScore} >
            <span className="display glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    )
  }
});*/

function Counter(props) {
  return (
    <div className="row">
      <div className="btn-group btn-group-justified" role="group"
        aria-label="Justified button group">
        <a className="btn btn-danger" role="button" >
          <span className="display glyphicon glyphicon-minus" aria-hidden="true"></span>
        </a>
        <a href="#" className="display btn btn-default" disabled="disabled"
          role="button">{props.score}</a>
        <a className="btn btn-success" role="button" >
          <span className="display glyphicon glyphicon-plus" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  )
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired
}

function Player(props) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="title col-xs-8">{props.name}</div> {/*JIM HOSKINS*/}
        <div className="col-xs-4">
          <Counter score={props.score} />
        </div>
      </div>
    </li>
  )
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired
}

function Application(props) {
  return (
    <div className="application">
      <div className="panel panel-primary">
        <Header title={props.title} />
        <ul className="players list-group">
          {props.players.map(function (player) {
            return <Player name={player.name} score={player.score} key={player.id} />
          })}
        </ul>
      </div>
    </div>
  )
}

Application.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired
  })).isRequired
}

Application.defaultProps = {
  title: 'Scoreboard'
}

/*Application.getInitialState = {
  return {
    players: ...,
  };
}*/

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));