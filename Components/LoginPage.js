

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    TextInput, Button, View, Image, 
    TouchableHighlight, ActivityIndicator} from 'react-native'; 
import { createStackNavigator } from 'react-navigation';
import { Logo } from './Logo';
import { DefaultButton } from './DefaultButton';
import { SocialButton } from './SocialButton';

export default class Login extends React.Component {
    
    state = {
        username: 'abc@uowmail.edu.au',
        password: '123456',
        errorMessage: '',
        isLoading: true,
    };

    componentDidMount(){
        this.setState({isLoading: false});
        this.props.firebase = this.props.screenProps;
    }

    loginPress() {
        this.setState({errorMessage: '', isLoading: true});
        const {username, password } = this.state;
        if(username != '' || password != ''){
            this.props.firebase.auth().signInWithEmailAndPassword(username, password)
            .then((result) =>{
                this.setState({isLoading: false});
                this.props.navigation.navigate('Home');
            })
            .catch((error) =>{
                this.setState({errorMessage: error.message, isLoading: false});
            });
        }
    };

    signupPress() {
        this.props.navigation.navigate('SUForm');
    }

    facebookLogin() {
        //this.setState({isLoading: true});
        
    }
    

    render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
        return (
        <View style={styles.container}>
            
            <View style={styles.logoCont} >
                <Logo scale={1}/>
            </View>
            
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputBox}
                    placeholder="username" underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={(un) => this.setState({username:un})}
                    value={this.state.username} />
                <TextInput style={styles.inputBox}
                    placeholder="password" underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={(pw) => this.setState({password:pw})} secureTextEntry
                    value={this.state.password}/>
                
                <DefaultButton title='Login' nav={() => this.loginPress()} />
                <DefaultButton title='Sign Up' nav={() => this.signupPress()} />
                
                <View style={styles.activityView}>
                    {actInd}
                </View>
            </View>
            

            <View style={styles.socialContainer}>
                <SocialButton title='Continue with' fbOnClick={()=>this.facebookLogin()} />
            </View>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },

    logoCont: {
        marginTop: 50,
        flex: 2,
    },
    
    errorText: {color: 'red',},

    activityView: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    /////////////////////////////////////////INPUT STYLES
    inputContainer: {
        flex: 2.5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 60,
        alignContent: 'flex-start',
    },
    inputBox: {
        alignItems: 'center',
        color: 'grey',
        marginBottom: 0,
        marginTop: 0,
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
        borderWidth: 1,
    },

    /////////////////////////////////////////SOCIAL STYLES
    socialContainer: {
        flex: 1,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
    },
});