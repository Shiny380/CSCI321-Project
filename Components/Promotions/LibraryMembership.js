

import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, Alert, Image, ActivityIndicator} from 'react-native';

//styles
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';

//custom props
import { FormInput } from '../CustomProps/FormInput';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { navigationOptionsFunc } from '../styles/navOptions';
import { staticStyles } from '../styles/BenefitsStyles';

const libraryLogo = require('../assets/libraryLogo.jpg');

const blurbStart = 'UOW alumni are entitled to a complimentary Alumni Membership to the UOW Library.\n\n'

const blurbPoints = '-  Access a wide range of online resources, including e-journals and databases\n\n'+
            '-  Borrow 30 items for 28 days at the Wollongong location, or five items at other locations\n\n'+
            '-  Renew items and place up to 10 holds at a time.\n\n';

const blurbEnd = 'New membership applications will be processed and confirmed within 5-7 business days via return email. '+
            'Memberships need to be renewed annually, and you will be sent a reminder.';

export default class LibraryMembership extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Library Membership', navigation, false);
	}
    
    /////////////////////////////////////////////////////////
    ///Loads Constituent Data from Vultrsdk
    componentWillMount(){
        try{
            var vultr = this.props.screenProps;
            this.setState({vultr: this.props.screenProps});
            if(vultr.data && vultr.data.email)
                this.setState({
                    email: vultr.data.email, 
                });
            else
                this.setState({
                    email: '', 
                });
            }catch(err){console.warn('try catch error: ' + err.message);}
        
        this.setState({
            errorMessage: '',
            isLoading: false,
        });
    }

    /////////////////////////////////////
    //Handles UI Output for page
    render() {
		return (
			<View style={staticStyles.container}>
                    <Image style={staticStyles.logo}
                        source={libraryLogo} />
                

                <Text style={staticStyles.title}>
                    Claim your library card
                </Text>
                <Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>
				<ScrollView style={staticStyles.blurbView}>
                    
                    <Text style={staticStyles.blurbTextEnd}>
                        {blurbStart}
                    </Text>
                    <Text style={staticStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
                {this.renderForm()}
                {this.renderBtn()}
			</View>
		);
    }

    ////////////////////////////////////////////////////////////////////////////////
    //Called by render to display email input
    renderForm(){
        if(this.state.isLoading)
            return (
                <View style={baseStyles.activityView}>
                    <ActivityIndicator size='large' color='#cc0000'/>
                </View>
            );
        else return (
            <FormInput title='Preferred email' onChangeText={(a) => this.setState({email:a})} 
                    value={this.state.email} keyboardType='email-address' autoCapitalize='none'/>
            );
    }


    ///////////////////////////////////////////////////////////////////////////////
    //Displays button for submit
    renderBtn(){
        if(this.state.isLoading) return <View/>
        else return (
            <View style={staticStyles.submitBtnCont}>
                <DefaultButton title='Claim Now' nav={() => this.submit()} />
            </View>
        );
    }
    
    ///////////////////////////////////////////////////////////////////////////
    //Handles the submission of data
    submit(){
        this.setState({errorMessage: '', isLoading: true});
        try{
            this.state.vultr.libraryReq(this.state.email)
            .then(() => { //submit successful
                this.setState({
                    errorMessage: '',
                    isLoading: false
                });
                Alert.alert(
                    'Success!',
                    blurbEnd,
                    [
                        {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                )
            }).catch((err) => { //submit failed
                this.setState({
                    errorMessage: err,
                    isLoading: false
                });
                if(err == 'Already registered')
                    Alert.alert(
                        'Oops!',
                        err,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                    )
            })
        }catch(err){console.warn('catch error: '+ err.message);}
    }
};