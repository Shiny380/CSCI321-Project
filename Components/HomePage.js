/////////////////////////////////////////
// MAIN HOME PAGE
//
// - Main navigation dashboard menu
// - highlights carousel of most recent events
// 	plus a random discount and magazine link
/////////////////////////////////////////

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions, ActivityIndicator} from 'react-native';

//styles
import { baseStyles } from './styles/BaseStyles';
import { homeStyles } from './styles/HomeStyles';
import {navigationOptionsFunc} from './styles/navOptions';

//custom props
import { DashButton } from './CustomProps/DashButton';
import { Logo } from './CustomProps/Logo';
import Carousel from 'react-native-snap-carousel';

//Button Icons
const updateDetailsIcon = require('./assets/UpdateDetails.png');
const outlookIcon = require('./assets/Outlook.png');
const eventsIcon = require('./assets/Events.png');
const promoIcon = require('./assets/Benefits.png');
//Placeholder image, waiting on smcu
const outlookLogo = require('./assets/outLogo.png')

export default class HomePage extends Component {
	
	//nav header
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Home', navigation, true);
	}
	
	//Navheader left button handler (toggle drawer nav menu)
	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	state = {
		isLoading: false,
		didLoad: false,
		highlightData: [],
		urlList: {
			magazine: 'https://www.uow.edu.au/alumni/outlook/index.html',
			careers: 'https://careerhub.uow.edu.au/students/login?ReturnUrl=%2fstudents',
			networks: 'https://www.uow.edu.au/alumni/networks/index.html',
			study: 'https://www.uow.edu.au/future/postgrad/index.html',
			scholarships: 'https://www.uow.edu.au/alumni/benefits/postgrad/index.html',
			volunteering: 'https://www.uow.edu.au/alumni/benefits/volunteer/index.html',
			mentoring: 'https://www.uow.edu.au/alumni/benefits/mentoring/index.html',
		},
		errorMessage: '',
	};

	componentDidMount(){
		this.props.navigation.setParams({toggleSettings: this.toggleSettings}) //bind handler function to header
		this.setState({isLoading: true, didLoad: false, highlightData: null});

		//Load Highlights carousel data
		try{
		var vultr = this.props.screenProps;
		vultr.getHighlights()
		.then(res => {
				this.setState({
					isLoading: false,
					highlightData: res.highlights,
					//urlList: res.urlList,
					didLoad: true,
				});
		}).catch(err =>{
			this.setState({isLoading: false, didLoad: false, errorMessage: err});
		})
		}catch(err){console.warn('try catch: ' + err);
			this.setState({isLoading: false});}
	}

	//Render single highlight item
	renderHighlight({item, index}){
		///////////////////////////////////////////////	EVENT
		if(item.type == 'event'){
			var parts = item.data.startdate.split('/')
        	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
					onPress={() => this.props.navigation.navigate('EventSingle', {eventData: item.data})}>
                <View style={homeStyles.highlightView}>
                    <View style={homeStyles.highlightTextView}>
                        <Text style={homeStyles.highlightText}>
                            {item.data.eventname}
                        </Text>
                        <Text style={homeStyles.highlightBlurb}>
                            {item.data.blurb}
                        </Text>
                    </View>
                    <View style={homeStyles.hlDate}>
                        <Text style={homeStyles.hlDay}>
                            {parts[0]}
                        </Text>
                        <Text style={homeStyles.hlMonth}>
                            {months[parts[1]-1]}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
			);
			}
		///////////////////////////////////////////////	DISCOUNT
		if(item.type == 'discount'){
			var redirect;
			if(item.data.discountType == 'card'){
				redirect = () => this.props.navigation.navigate('Discounts', {card: true});
			}
			else{
				redirect = () => this.props.navigation.navigate('WebViewPage', 
				{title: item.data.displayName, 
				link: item.data.link});
			}
			
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
					onPress={redirect}>
                <View style={homeStyles.highlightView}>
                    <Image
                        style={homeStyles.discImage}
                        source={{uri: item.data.imageURL}}
                    />
                    <View style={homeStyles.highlightTextView}>
                        <Text style={homeStyles.highlightText}>
                            {item.data.blurb}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
			);
		}
		///////////////////////////////////////////////	MAGAZINE ARTICLE
		if(item.type == 'mag')
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
						onPress={() => {this.props.navigation.navigate('WebViewPage', 
							{title: 'UOW Outlook Magazine', 
							link: item.data.link})
						}}>
					<View style={homeStyles.magView}>
						<View style={homeStyles.highlightTextView}>
							<Image style={homeStyles.discImage} source={outlookLogo}/>
							<Text style={homeStyles.highlightText}>
								{item.data.title}
							</Text>
						</View>
						
					</View>
				</TouchableHighlight>
			);
	}

	//Render Highlights carousel when data did load from server
	// SOURCE: https://github.com/archriss/react-native-snap-carousel
	renderCarousel(){
		if(this.state.isLoading || !this.state.didLoad) return (<View/>);
		else 
			return (
				<Carousel
					ref={(c) => {this.carousel = c}}
					data={this.state.highlightData}
					renderItem={this.renderHighlight.bind(this)}
					layout={'default'}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width/1.2}
				/>
			);
	}

	//MAIN RENDER
	render() {
		const actInd = this.state.isLoading? <ActivityIndicator size='large' color='#cc0000'/> : <View style={homeStyles.carouselView}/>;
        
		return (
			<View style={baseStyles.container}>
				<View style={baseStyles.logoCont}>
					<Logo scale={1} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Update Details' img={updateDetailsIcon} nav={()=>this.props.navigation.navigate('UDMenu')} />
					<DashButton title='Outlook Magazine' img={outlookIcon} nav={
						()=>this.props.navigation.navigate('WebViewPage', 
								{title: 'UOW Outlook Magazine', 
								link: this.state.urlList.magazine})
						} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Events' img={eventsIcon} nav={()=>this.props.navigation.navigate('EventsList')} />
					<DashButton title='Benefits' img={promoIcon} nav={()=>this.props.navigation.navigate('Benefits', {urlList: this.state.urlList})} />
				</View>

				<Text style={homeStyles.carouselTitle}>
					Highlights
				</Text>
				<View style={homeStyles.carouselView}>
					<Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>
					{this.renderCarousel()}
					<View style={baseStyles.activityView}>{actInd}</View>
				</View>
				
			</View>
		);
	}
};