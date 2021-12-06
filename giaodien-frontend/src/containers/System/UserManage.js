import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
class UserManage extends Component {

    constructor() {
        super() 
        this.mdParser = new MarkdownIt();
    }
    state = {

    }

    componentDidMount() {

    }
    handleEditorChange = ( ) => {
        console.log('handleEditorChange');
    }

    render() {
        return (
            <div className="text-center">Manage users<br/>
              <MdEditor style={{ height: '500px' }} 
                renderHTML={text => this.mdParser.render(text) } 
                onChange={() => this.handleEditorChange()} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
