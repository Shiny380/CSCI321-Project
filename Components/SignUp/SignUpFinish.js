

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';

//custom props
import { DefaultButton } from '../CustomProps/DefaultButton';
import { Logo } from '../CustomProps/Logo.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//styles
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';
import { homeStyles } from '../styles/HomeStyles';
import { navigationOptionsFunc } from '../styles/navOptions';


export default class SignUpFinish extends Component {
    
    //Nav header
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Sign Up', navigation, false);
	}
    
    state = {
        errorMessage: '',
        isLoading: false,
        email: '',
        username: '',
        password: '',
        passwordConf: '',
    };

    //get emil passed to page and strip to get suggested username
    componentDidMount(){
        this.setState({vultr: this.props.screenProps});
        var emailProp = this.props.navigation.getParam('email', '');
        id = this.props.navigation.getParam('id', '');
        var un = '';
        try{ //strip email of everything from @ onwards
            un = emailProp.substr(0, emailProp.indexOf('@'));
        }catch(err){un = '';};
        this.setState({email: emailProp, id: id, username: un});
    }
    
    //submit button press handler
    submitForm() {
        
        this.setState({isLoading: true, errorMessage: ''});
            //NO USERNAME
        if(this.state.username == ''){
            this.setState({isLoading: false, errorMessage: 'No username'});
        }
            //PASSWORDS EMPTY OR DONT MATCH
        else if(this.state.password != this.state.passwordConf || (this.state.password == '' || this.state.passwordConf == '')){
            this.setState({isLoading: false, errorMessage: 'Passwords do not match'});
        }
        else{ //ELSE SUBMIT REGISTRATION TO BACKEND
            this.state.vultr.registerUser(this.state.username, this.state.password, this.state.id)
            .then((result) => {                
                this.setState({isLoading: false, errorMessage: ''});    
                this.props.navigation.navigate('HomeDrawer');
            }).catch(error => {
                this.setState({isLoading: false, errorMessage: error});
            });
        }
    }





    /////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// UI /////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

	renderInput(title, ph, setValue, stateValue, isSecure, isEditable){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey' value={stateValue}
                    onChangeText={setValue} secureTextEntry={isSecure} autoCapitalize='none' editable={isEditable}
                />
            </View>
		);
    }

    //MAIN RENDER
	render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
            <ScrollView>
                <View style={{marginTop:0}}/>
                <View style={homeStyles.logoCont}>
                    <Logo scale={1}/>
                </View>
                <View style={{marginTop:20}}/>
				<Text style={styles.title}>
                    Finalise Sign Up
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>

                <View style={baseStyles.activityView}>
                    {actInd}
                </View>

                {this.renderInput('username', '', (value) => this.setState({username: value}), this.state.username, false, true )}
                {this.renderInput('password', '', (value) => this.setState({password: value}), this.state.password, true, true )}
                {this.renderInput('confirm password', '', (value) => this.setState({passwordConf: value}), this.state.passwordConf, true, true )}
			</ScrollView>
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Continue' nav={() => this.submitForm()} />
                </View>
			</View>
		);
		}
    };
    
    const stylesA = StyleSheet.create({
        logoCont: {
            flex: 0.5,
            marginTop: 50,
        },
    });