import { connect } from 'react-redux';
import TabBar from './TabBar';
import { selectCurrentTab } from './tabSelectors';
import { selectTab } from './tabActions';

const mapStateToProps = (state) => {
    const currentTab = selectCurrentTab(state);
    return { currentTab };
}

const mapDispatchToProps = {
    onTabClick: selectTab
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);