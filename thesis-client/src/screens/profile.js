import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { getUserRoutes, getUserSessions, deleteUserRoute } from '../actions/getUserInfo-action';
import { getActiveTrip } from '../actions/activeTrip-action';
// import { STATUS_BAR_HEIGHT } from '../constants';
import ProfileStats from '../components/profile-stats-component';
import ProfileRoutes from '../components/profile-routes-component';

class ProfileScreen extends Component {

  static propTypes = {
    showTripLocation: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,    
    getUserSessions: PropTypes.func.isRequired,
    getUserRoutes: PropTypes.func.isRequired,
    deleteUserRoute: PropTypes.func.isRequired,
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    // eslint-disable-next-line
    sessions: PropTypes.array.isRequired,
    // eslint-disable-next-line
    routes: PropTypes.array.isRequired,
  }

  componentWillMount() {
    this.props.getUserSessions(this.props.user.id);
    this.props.getUserRoutes(this.props.user.id);
  }

  render() {
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
      >
        <View>
          <Text style={styles.title}>
            Your Stats
          </Text>
          <View>
            <ProfileStats sessions={this.props.sessions} />
          </View>
        </View>
        <View>
          <Text style={styles.title}>
            Your Routes
          </Text>
          <ScrollView>
            <ProfileRoutes 
              routes={this.props.routes}
              navigate={this.props.navigation.navigate}
              showTripLocation={this.props.showTripLocation}
            />
          </ScrollView>
        </View>
      </Swiper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    routes: state.userRoutes.routes,
    sessions: state.userSessions.sessions,
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(getActiveTrip(trip, cb));
  },
  getUserSessions: (userId) => {
    dispatch(getUserSessions(userId));
  },
  getUserRoutes: (userId) => {
    dispatch(getUserRoutes(userId));
  },
  deleteRoute: (userId, routeId) => {
    dispatch(deleteUserRoute(userId, routeId));
  },
});

 const styles = StyleSheet.create({
  wrapper: {
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
