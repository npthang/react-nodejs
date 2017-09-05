var list;

var Note = React.createClass(
    {
        delete() {
            $.post('/delete', {idXoa: this.props.id}, function(data) {
                list.setState({mang: data})
            })
        },
        edit() {
            this.setState({onEdit: true})
        },
        getInitialState() {
            return {onEdit: false}
        },
        save() {
            var note = this
            $.post('/update', {idSua: this.props.id, noidung: this.refs.txt.value}, function(data){
                list.setState({mang: data})
                note.setState({onEdit: false})
            })
        },
        cancel() {
            this.setState({onEdit: false})
        },
        render: function(){
            if (this.state.onEdit){
                return (
                    <div className="div-note">
                        <input defaultValue={this.props.children} ref='txt'/>
                        <button onClick={this.save}>Luu</button>
                        <button onClick={this.cancel}>Huy</button>
                    </div>
                )
            }else {
                return (
                    <div className="div-note">
                        <p>{this.props.children}</p>
                        <button onClick={this.delete}>Xoa</button>
                        <button onClick={this.edit}>Sua</button>
                    </div>
                )
            }
            
        }
    }
)

var InputDiv = React.createClass({
    send(){
        $.post('/add', {note: this.refs.txt.value}, function(data){
            list.setState({mang: data})
        })
        ReactDOM.unmountComponentAtNode(document.getElementById('div_add'))
    },
    render(){
        return <div>
            <input type="text" ref="txt" placeholder="Enter your note"/>
            <button onClick={this.send}>Send</button>
        </div>
    }
})

function addDiv() {
    ReactDOM.render(<InputDiv/>, document.getElementById('div_add'))
}

var List = React.createClass({
    getInitialState() {
        list = this
        return {mang: []}
    },
    render() {
        return (
            <div className='div-list'>
                <div id='div_add'></div>
                <button onClick={addDiv}>Them</button>
                {
                    this.state.mang.map(function(note, index){
                    return <Note key={index} id={index}>{note}</Note>
                    })
                }
            </div>
        )
    },
    // get data from server
    componentDidMount() {
        var that = this
        $.post('/getNotes', function(data){
            that.setState({mang: data})
        })
    }
})

ReactDOM.render(
    <div>
        <List/>
   </div>,
    document.getElementById('root')
)