import React, { Component, PropTypes } from "react";

import DashboardHeader from "../components/DashboardHeader.jsx";
import DashboardGrid from "../components/DashboardGrid.jsx";
import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper.jsx";

export default class Dashboard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: null
        };
    }

    static propTypes = {
        addCardToDashboard: PropTypes.func.isRequired,
        deleteDashboard: PropTypes.func.isRequired,
        fetchCards: PropTypes.func.isRequired,
        fetchDashboard: PropTypes.func.isRequired,
        fetchRevisions: PropTypes.func.isRequired,
        revertToRevision: PropTypes.func.isRequired,
        saveDashboard: PropTypes.func.isRequired,
        setDashboardAttributes: PropTypes.func.isRequired,
        setEditingDashboard: PropTypes.func.isRequired,

        onChangeLocation: PropTypes.func.isRequired,
        onDashboardDeleted: PropTypes.func.isRequired,
    };

    async componentDidMount() {
        try {
            await this.props.fetchDashboard(this.props.selectedDashboard);
        } catch (error) {
            if (error.status === 404) {
                this.props.onChangeLocation("/404");
            } else {
                this.setState({ error });
            }
        }
    }

    render() {
        let { dashboard } = this.props;
        let { error } = this.state;
        return (
            <LoadingAndErrorWrapper className="Dashboard flex flex-full" loading={!dashboard} error={error}>
            {() =>
                <div className="full flex flex-column">
                    <header className="bg-white border-bottom">
                        <DashboardHeader {...this.props} />
                    </header>
                    <div className="Dash-wrapper wrapper flex layout-centered flex-full flex-column">
                        { dashboard.ordered_cards.length === 0 ?
                            <div className="flex flex-column layout-centered">
                                <span className="QuestionCircle">?</span>
                                <div className="text-normal mt3 mb1">This dashboard is looking empty.</div>
                                <div className="text-normal text-grey-2">Add a question to start making it useful!</div>
                            </div>
                        :
                            <DashboardGrid {...this.props} />
                        }
                    </div>
                </div>
            }
            </LoadingAndErrorWrapper>
        );
    }
}
