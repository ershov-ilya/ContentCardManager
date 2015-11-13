'use strict';

var App = React.createClass({
    displayName: 'App',

    //    $this:null,
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
        $.get('json/second.json', (function (response) {
            if (this.isMounted()) {
                this.setState({
                    items: $.merge(this.state.items, response)
                });
            }
        }).bind(this));
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'ul',
                { id: 'List', className: "row marketing" },
                this.state.items.map(function (item, i) {
                    return React.createElement(
                        'div',
                        { className: "col-lg-4", key: i },
                        React.createElement(
                            'h4',
                            null,
                            item.title
                        ),
                        React.createElement('img', { className: "img-responsive", src: item.img }),
                        React.createElement(
                            'p',
                            null,
                            item.description
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'a',
                                { className: "btn btn-primary", href: '#', role: 'button' },
                                'View details »'
                            )
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
                        'a',
                        { className: "btn btn-lg btn-success", href: '#', onClick: this.LoadMore },
                        'Load More!'
                    )
                )
            )
        );
    }
});

// Mounting
if (typeof App != 'undefined') ReactDOM.render(React.createElement(App, { source: 'json/first.json' }), document.getElementById('App'));