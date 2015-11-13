var App = React.createClass({
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
        // Must be replaced with real API with parameters passing
        $.get('json/second.json', function(response) {
            if (this.isMounted()) {
                this.setState({
                    items: $.merge(this.state.items,response)
                });
            }
        }.bind(this));
    },

    Open: function(event){
        event.preventDefault();
        alert('Open done!');
        return false;
    },

    Delete: function(event){
        event.preventDefault();
        alert('Delete done!');
        return false;
    },

    Print: function(event){
        event.preventDefault();
        alert('Print done!');
        return false;
    },

    render: function() {
        var $item=this;
        return (
            <div>
                <ul id="List" className={"row marketing"}>
                    {
                        this.state.items.map(function(item, i) {
                            var itemStyle={
                                backgroundImage: 'url(' + item.img + ')',
                            };
                            return <div className={"col-lg-3 col-md-6 item"} key={i}>
                                <div className={"background"} style={itemStyle}></div>
                                <div className={"card-content"}>
                                    <div className={"image"} style={itemStyle}>
                                    </div>
                                  <h4>{item.title}</h4>
                                  <p>{item.description}</p>
                                </div>
                                <div className={"overlay"}></div>
                                <a onClick={$item.Open} className={"btn btn-default btn-open"}><span className={"glyphicon glyphicon-folder-open"} aria-hidden="true"></span></a>
                                <a onClick={$item.Print} className={"btn btn-default btn-print"}><span className={"glyphicon glyphicon-print"} aria-hidden="true"></span></a>
                                <a onClick={$item.Delete} className={"btn btn-danger btn-delete"}><span className={"glyphicon glyphicon-remove-circle"} aria-hidden="true"></span></a>
                          </div>
                        })
                    }
                </ul>
      <div className={"jumbotron"}>
        <p><button className={"btn btn-lg btn-success"} onClick={this.LoadMore}>Load More!</button></p>
      </div>
             </div>
        );
    }
});

/*
    <a className={"btn btn-primary btn-block"} href={item.url} target="_blank" role="button">View details »</a>
*/

// Mounting
if(typeof App != 'undefined') ReactDOM.render(<App source="json/first.json" />, document.getElementById('App'));
