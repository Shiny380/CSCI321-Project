import React, { Component } from 'react';
import { Text, FlatList, View, TouchableHighlight, ActivityIndicator, ScrollView} from 'react-native';

//Custom Props
import { navigationOptionsFunc } from '../styles/navOptions';

//Styles
import { listStyles } from '../styles/EventStyles';
import {baseStyles} from '../styles/BaseStyles';


export default class EventsList extends Component {
	constructor(props){
        super(props);
    }
    
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Events', navigation, false);
	}
    
    state = {
        isLoading: true,
        errorMessage: '',
        data: null,
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Calls getEvents() from Vultrsdk to load event list from server
    componentDidMount(){ 
        this.props.screenProps.getEvents('events')
        .then((res) => {
            this.setState({data: res, isLoading: false, errorMessage: ''});

        }).catch((error) => {
            console.warn(error);
            this.setState({isLoading: false, errorMessage: error});
        })
    }

    //////////////////////////////////////////////////////////////////
    //Calls renderList() and builds page
	render() {
		return (
			<View style={baseStyles.container}>
            <View style={baseStyles.activityView}>
                {this.renderActivityIndicator()}
            </View>
				{this.renderList()}
			</View>
		);
	}
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //Loading Wheel
    renderActivityIndicator(){
        return this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    //Builds list of event items
    renderList(){
        if(this.state.isLoading)
            return <View/>;
        
        else return(
            <ScrollView style={listStyles.scrollView}>
                <FlatList style={listStyles.fList}
                    data={this.state.data}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item, index) => index.toString()
                    }
                />
            </ScrollView>
        )
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////
    //Displays an event item
    renderItem(item){
        var parts = item.startdate.split('/')
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return(
            <TouchableHighlight onPress={() => this.props.navigation.navigate('EventSingle', {eventData: item})}>
                <View style={listStyles.itemView}>
                    <View style={listStyles.textView}>
                        <Text style={listStyles.text}>
                            {item.eventname}
                        </Text>
                        <Text style={listStyles.textBlurb}>
                            {item.blurb}
                        </Text>
                    </View>
                    <View style={listStyles.hlDate}>
                        <Text style={listStyles.hlDay}>
                            {parts[0]}
                        </Text>
                        <Text style={listStyles.hlMonth}>
                            {months[parts[1]-1]}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
};
	
	