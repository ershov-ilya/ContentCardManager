'use strict';

var App = React.createClass({
    displayName: 'App',

    componentWillMount: function componentWillMount() {
        //        $this=this;
    },

    statics: {
        get: function get() {
            return $this.state.userInput;
        },
        set: function set(data) {
            $this.setState({ userInput: data });
        }
    },

    getInitialState: function getInitialState() {
        return {
            userInput: '',
            items: []
        };
    },

    componentDidMount: function componentDidMount() {
        $.get(this.props.source, (function (response) {
            if (this.isMounted()) {
                this.setState({
                    items: response
                });
            }
        }).bind(this));
    },

    LoadMore: function LoadMore() {
        // Must be replaced with real API with parameters passing
        $.get('json/second.json', (function (response) {
            if (this.isMounted()) {
                this.setState({
                    items: $.merge(this.state.items, response)
                });
            }
        }).bind(this));
    },

    Open: function Open(event) {
        event.preventDefault();
        alert('Open done!');
        return false;
    },

    Delete: function Delete(event) {
        event.preventDefault();
        alert('Delete done!');
        return false;
    },

    Print: function Print(event) {
        event.preventDefault();
        alert('Print done!');
        return false;
    },

    render: function render() {
        var $item = this;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'ul',
                { id: 'List', className: "row marketing" },
                this.state.items.map(function (item, i) {
                    var itemStyle = {
                        backgroundImage: 'url(' + item.img + ')',
                        height: '100%'
                    };
                    return React.createElement(
                        'div',
                        { className: "col-lg-3 col-md-6 item", key: i },
                        React.createElement('div', { className: "background", style: itemStyle }),
                        React.createElement(
                            'div',
                            { className: "card-content" },
                            React.createElement(
                                'div',
                                { className: "image" },
                                React.createElement('img', { className: "preview", src: item.img })
                            ),
                            React.createElement(
                                'h4',
                                null,
                                item.title
                            ),
                            React.createElement(
                                'p',
                                null,
                                item.description
                            )
                        ),
                        React.createElement('div', { className: "overlay" }),
                        React.createElement(
                            'a',
                            { onClick: $item.Open, className: "btn btn-default btn-open" },
                            React.createElement('span', { className: "glyphicon glyphicon-folder-open", 'aria-hidden': 'true' })
                        ),
                        React.createElement(
                            'a',
                            { onClick: $item.Print, className: "btn btn-default btn-print" },
                            React.createElement('span', { className: "glyphicon glyphicon-print", 'aria-hidden': 'true' })
                        ),
                        React.createElement(
                            'a',
                            { onClick: $item.Delete, className: "btn btn-danger btn-delete" },
                            React.createElement('span', { className: "glyphicon glyphicon-remove-circle", 'aria-hidden': 'true' })
                        )
                    );
                })
            ),
            React.createElement(
                'div',
                { className: "jumbotron" },
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'button',
                        { className: "btn btn-lg btn-success", onClick: this.LoadMore },
                        'Load More!'
                    )
                )
            )
        );
    }
});

/*
    <a className={"btn btn-primary btn-block"} href={item.url} target="_blank" role="button">View details »</a>
*/

// Mounting
if (typeof App != 'undefined') ReactDOM.render(React.createElement(App, { source: 'json/first.json' }), document.getElementById('App'));