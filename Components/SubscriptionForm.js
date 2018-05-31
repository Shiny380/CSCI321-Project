

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class SubscriptionForm extends Component {
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}
	renderInput(title, ph){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'/>
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    Subscriptions
                </Text>
                <ScrollView>

                <Text style={styles.title}>
                    This page will later include radio buttons, tick boxes, drop downs
                </Text>
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Discard' nav={() => this.props.navigation.navigate('UDMenu')} />
                </View>
			</View>
		);
		}
	};