

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';

import { EventSingle } from './HomeComps/EventSingle.js';


const tempEvents = [
	{title: "Event1"},
	{title: "Event2"},
	{title: "Event3"},
	{title: "Event4"},
	{title: "Event5"},
	{title: "Event6"}
]

const dashTmp = './assets/dashTmp.png';
const uowLogo = './assets/logo.png';

export default class HomePage2 extends Component {
	constructor(props){
		super(props);
		this.props.eventDataSource = tempEvents;
	}
	static navigationOptions = {
		title: 'Home',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	renderEventSingle(event){
		return(
			<EventSingle
				title={event.title}
			/>
		)
	}

	renderdashBtn(title){
		return(
			<TouchableHighlight style={styles.dashBtn}
					onPress={this._onPressButton}>
				<View style={styles.dashBtnContainer}>
					<Image
                        style={styles.dashBtnImg}
                        source={require(dashTmp)}
                    />
					<Text style={styles.dashText}>
						{title}
					</Text>
				</View>
            </TouchableHighlight>
		)
	}
	renderdashBtnSmall(title){
		return(
			<TouchableHighlight style={styles.dashBtnSmall}
					onPress={this._onPressButton}>
				<View style={styles.dashBtnContainerSmall}>
					<Image
                        style={styles.dashBtnImgSmall}
                        source={require(dashTmp)}
                    />
					<Text style={styles.dashTextSmall}>
						{title}
					</Text>
				</View>
            </TouchableHighlight>
		)
	}
	renderHighlight(title, day, month){
		return(
			<TouchableHighlight style={styles.hlBtn}
					onPress={this._onPressButton}>
				<View style={styles.hlBtnView}>
					<View style={styles.hlCont}>
						<Text style={styles.hlTitle}>
							{title}
						</Text>
					</View>
					<View style={styles.hlDate}>
						<Text style={styles.hlDay}>
							{day}
						</Text>
						<Text style={styles.hlMonth}>
							{month}
						</Text>
					</View>
				</View>
            </TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logoCont}>
					<Image
						style={styles.logo}
						resizeMode='center'
						resizeMethod='resize'
						source={require(uowLogo)}
					/>
					<View style={styles.banner}>
							<Text style={styles.bannerText}>
								ALUMNI
							</Text>
					</View>
				</View>
				
				<View style={styles.dashboard}>
					{this.renderdashBtn("Update Details")}
					{this.renderdashBtn("Events")}
				</View>

				<View style={styles.dashboardSmall}>
					{this.renderdashBtnSmall("Outlook")}
					{this.renderdashBtnSmall("Promotions")}
					{this.renderdashBtnSmall("Networking")}
					{this.renderdashBtnSmall("Mentoring")}
				</View>

				<View style={styles.highlightsContainer}>
					<Text style={styles.highlightHeading}>
						Highlights
					</Text>

					{this.renderHighlight("Presentation", "25", "MAY", )}
				</View>

			</View>
		);
		}
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},

		/////////////////////////////////////////LOGO
		logoCont: {
			//marginTop: 10,
			flex: 1,
		},
		logo: {
			width: 180,
			height: 72,
			flexDirection: 'row',
			alignSelf: 'center',
		},
		banner: {
			//marginTop: 8,
			backgroundColor: 'white',
			margin: 0,
			justifyContent: 'center',
			padding: 5,
			paddingBottom: 10,
			flexDirection: 'row',
			marginBottom: 10,
		},
		bannerText: {
			fontSize: 18,
			color: '#0C2340',
			fontWeight: 'bold',
		},
		

		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},
				dashBtn: {
					flex: 1,
					margin: 5,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignContent: 'center',
				},
				dashBtnContainer: {
					justifyContent: 'center',
					alignContent: 'center',
				},
						dashBtnImg: {
							width: 45,
							height: 45,
							alignSelf: 'center',
						},
						dashText: {
							color: '#0C2340',
							fontSize: 18,
							textAlign: 'center',
							alignSelf: 'center',
						},
/////////////////////////////////////////DASH BOARD    SMALL
dashboardSmall: {
	flex: 0.75,
	flexDirection: 'row',
	marginLeft: 7,
	marginRight: 7,
	justifyContent: 'space-between',
},
		dashBtnSmall: {
			flex: 1,
			margin: 5,
			backgroundColor: 'white',
			justifyContent: 'center',
			alignContent: 'center',
		},
		dashBtnContainerSmall: {
			justifyContent: 'center',
			alignContent: 'center',
		},
				dashBtnImgSmall: {
					width: 30,
					height: 30,
					alignSelf: 'center',
				},
				dashTextSmall: {
					color: '#0C2340',
					fontSize: 12,
					textAlign: 'center',
					alignSelf: 'center',
				},

		/////////////////////////////////////////HIGHLIGHTS
		highlightsContainer: {
			flex: 1.5,
		},
		highlightHeading: {
			color: 'white',
			marginLeft: 10,
			marginTop: 20,
			marginBottom: 20,
			fontSize: 28,
		},
		/////////////Button
		hlBtn: {
			flex: 1,
			backgroundColor: 'white',
			borderWidth: 2,
			borderColor: 'white',
			marginBottom: 20,
			marginLeft: 10,
			marginRight: 10,
		},
		hlBtnView: {
			flex: 1,
			flexDirection: 'row',
		},
				hlCont: {
					flex: 2.5,
					padding: 20,
				},
						hlTitle: {
							fontSize: 24,
							color: '#0C2340',
							//margin: 30,
						},
				hlDate: {
					flex: 1,
					backgroundColor: '#0C2340',
					justifyContent: 'center',
				},
						hlDay: {
							fontSize: 36,
							textAlign: 'center',
							color: 'white',
							margin: 0,
						},
						hlMonth: {
							fontSize: 18,
							textAlign: 'center',
							color: '#cc0000',
							margin: 0,
						},
	});