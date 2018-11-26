import React, { PropTypes } from 'react';
import { getPageInfo, getRange } from '../utils/utils';


class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    componentDidMount() {
        if (this.props.currentPage) {
            this.setState({ currentPage: this.props.currentPage });
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger
        if (nextProps.currentPage !== this.props.currentPage) {
            this.setState({ currentPage: nextProps.currentPage });
        }
    }

    getPageItemOptions = props => {
        const { pageValue, onPageChange: handlePageChange } = props;

        const onPageChange = () => {
            if (typeof handlePageChange === 'function') {
                handlePageChange(pageValue);
            }
            this.setState({ currentPage: pageValue });
        }

        return {
            onClick: onPageChange
        }
    }

    render() {
        const { total, limit, pageCount } = this.props;
        const { currentPage } = this.state;
        const pageDetails = getPageInfo({ limit, pageCount, total, page: currentPage });

        const {
            firstPage,
            lastPage,
            hasNextPage,
            hasPreviousPage,
            nextPage,
            previousPage,
            totalPages
        } = pageDetails;

        const pages = total ? getRange(firstPage, lastPage) : [];

        return (
            <div>
                {this.props.children({
                    pages,
                    nextPage,
                    previousPage,
                    totalPages,
                    hasNextPage,
                    hasPreviousPage,
                    getPageItemProps: this.getPageItemOptions,
                })}
            </div>
        )
    }
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    limit: PropTypes.number,
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
    pageValue: PropTypes.number,
    children: PropTypes.func.isRequired,
    onPageChange: PropTypes.func
}


Pagination.defaultProps = {
    limit: 2,
    pageCount: 4,
    currentPage: 0,
    pageValue: 0
}

export default Pagination