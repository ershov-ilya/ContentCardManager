var App = React.createClass({
//    $this:null,
    componentWillMount: function(){
//        $this=this;
    },
    statics: {
        get: function() {
            return $this.state.userInput;
        },
        set: function(data) {
            $this.setState({userInput: data});
        }
    },

    getInitialState: function() {
        return {
            userInput: '',
            items: []
        };
    },

    componentDidMount: function() {
        $.get(this.props.source, function(response) {
            if (this.isMounted()) {
                this.setState({
                    items: response
                });
            }
        }.bind(this));
    },

    LoadMore: function(){
        $.get('json/second.json', function(response) {
            if (this.isMounted()) {
                this.setState({
                    items: $.merge(this.state.items,response)
                });
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                <ul id="List" className={"row marketing"}>
                    {
                        this.state.items.map(function(item, i) {
                            return <div className={"col-lg-4"} key={i}>
                                          <h2>{item.title}</h2>
                                          <p>{item.description}</p>
                                          <p>{item.img}</p>
                                          <p><a className={"btn btn-primary"} href="#" role="button">View details »</a></p>
                                      </div>
                        })
                    }
                </ul>
      <div className={"jumbotron"}>
        <p><a className={"btn btn-lg btn-success"} href="#" onClick={this.LoadMore}>Load More!</a></p>
      </div>
             </div>
        );
    }
});

// Mounting
if(typeof App != 'undefined') ReactDOM.render(<App source="json/first.json" />, document.getElementById('App'));
