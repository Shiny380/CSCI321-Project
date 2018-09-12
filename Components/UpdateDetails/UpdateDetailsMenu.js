

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';
import { DefaultButton } from '../DefaultButton';
import { DashButton } from '../DashButton';
import { SocialButton } from '../SocialButton';


const accountIcon = require('../assets/Account.png');
const contactIcon = require('../assets/Contact.png');
const employmentIcon = require('../assets/Employment.png');
const subscripIcon = require('../assets/Subscriptions.png');

export default class UpdateDetailsMenu extends Component {
	
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			
		},
	}

	state = {
		vultr: this.props.screenProps,
		isLoading: true,
		didLoad: false,
		errorMessage: '',
		successMessage: '',
	};
	
	
	componentWillMount(){
		try{
		
		
		let vultr = this.props.screenProps;
		const originalData = JSON.parse(JSON.stringify(vultr.data)); //duplicate
		this.setState({
			originalData: originalData,
			data: vultr.data,
			constituentRefID: vultr.data.id,
			isLoading: false,
			didLoad: true,
		});

		}catch(err){console.warn('try catch error: ' + err.message);}
	}


	handleDBErrors(error){
		this.setState({isLoading: false});
		if(error == null)
			console.warn('if else error');
		else console.warn(error.message)
	}

	
	//	Method to navigate to form and pass data
	//	 will pass the entire structure and each page can just pick out what it needs essentialls
	navigateToForm(formName){
		if(!this.state.isLoading)
			this.props.navigation.navigate(formName, {data: this.state.data});
	}

	discardChanges(){
		const newData = JSON.parse(JSON.stringify(this.state.originalData));
		this.setState({data: newData});
	}

	saveChanges(){
		this.setState({errorMessage: ''});
		try{
			
		}catch(err){console.warn('catch error: '+ err.message);}
	}


	renderLoading(){
		if(this.state.isLoading)
			return (
				<ActivityIndicator size='large' color='#cc0000'/>
			);
		else return (
			<View/>
		);
	}

	renderMessages(){
		if(this.state.errorMessage != ''){
			return(
				<View style={styles.errorView}>
					<Text style={styles.errorText}>
						{this.state.errorMessage}
					</Text>
				</View>
			);
		}
		else if(this.state.successMessage != ''){
			return(
				<View style={styles.SuccessView}>
					<Text style={styles.successText}>
						{this.state.successMessage}
					</Text>
				</View>
			);
		}
		else return (<View/>);
	}

	renderDashBoard(){
		if(this.state.didLoad)
			return(
				<View style={styles.container}>
				<View style={styles.dashboard}>
					<DashButton title='Account' img={accountIcon} nav={()=>this.props.navigation.navigate('AccForm', {data: this.state.data})} />
					<DashButton title='Contact' img={contactIcon} nav={()=>this.props.navigation.navigate('ContForm', {data: this.state.data})} />
				</View>

				<View style={styles.dashboard}>
					<DashButton title='Employment' img={employmentIcon} nav={()=>this.props.navigation.navigate('EmpForm', {data: this.state.data})} />
					<DashButton title='Subscriptions' img={subscripIcon} nav={()=>this.props.navigation.navigate('SubForm', {data: this.state.data})} />
				</View>

                <View style={styles.socialContainer}>
                    <SocialButton title='Import from' nav={{}} />
                </View>

                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save Changes' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard Changes' nav={() => this.discardChanges()} />   
                </View>
				</View>
			);
		else return(
			<View/>
		);
	}

	render() {

		return (
			<View style={styles.container}>
				{this.renderMessages()}
				{this.renderLoading()}
				{this.renderDashBoard()}

			</View>
		);
		}
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},

		errorView: {
			backgroundColor: 'red',
		},

		errorText: {
			color: 'white',
		},

		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},

		/////////////////////////////////////////SOCIAL STYLES
        socialContainer: {
            flex: 1,
            marginBottom: 30,
            marginLeft: 5,
            marginRight: 5,
            justifyContent: 'center',
        },

        /////////////////////////////////////////SUBMIT BUTTONS
        submitBtnCont: {
            flex: 1,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10,
            alignContent: 'flex-start',
            justifyContent: 'flex-end',
        },
	});