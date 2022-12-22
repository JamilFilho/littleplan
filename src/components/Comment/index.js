import React from 'react'
import styles from './styles.module.scss'
import commentBox from 'commentbox.io'

export class PageWithComments extends React.Component {
    componentDidMount() {
        this.removeCommentBox = commentBox('5668071469481984-proj');
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <>
            <div className={"commentbox" + styles.comments} />
            </>
        );
    }
}