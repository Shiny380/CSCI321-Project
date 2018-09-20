

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image, ActivityIndicator, ScrollView} from 'react-native';

<<<<<<< HEAD
=======
import { EventSingle } from '../Events/EventSingleOld';
import { DashButton } from '../CustomProps/DashButton';
import { Logo } from './discLogo';

>>>>>>> eaaa98dff94b19f5e8951b44fafb97cd42470381
import Vultrsdk from '../Vultrsdk';


const tmpImg = require('../assets/dashTmp.png');


export default class Discounts extends Component {
	constructor(props){
        super(props);
    }
    
	static navigationOptions = {
        title: 'Discounts',
		headerStyle: {
            backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
            
        },
    }
    
    state = {
        isLoading: true,
        errorMessage: '',
        data: null,
    }
    
    componentDidMount(){ 
        Vultrsdk.getDiscounts('category')
        .then((res) => {
            this.setState({data: res, isLoading: false, errorMessage: ''});

        }).catch((error) => {
            console.warn(error);
            this.setState({isLoading: false, errorMessage: error});
        })
    }

    renderActivityIndicator(){
        return this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
    }

    renderItem(item){
        return(
            <TouchableHighlight onPress={() => this.props.navigation.navigate('EventSingle')}>
                <View style={styles.itemView}>
                    <Image
                        style={styles.image}
                        source={{uri: item.imageURL}}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.text}>
                            {item.blurb}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    renderList(){
        if(this.state.isLoading)
            return <View/>;
        
        else return(
            <ScrollView style={styles.scrollView}>
                <FlatList style={styles.fList}
                    data={this.state.data}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>
        )
    }
	render() {
		return (
			<View style={styles.container}>
                {this.renderActivityIndicator()}
				{this.renderList()}
			</View>
		);
		}
};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
        },
        scrollView: {
            //flex: 1,
        },
        fList: {
            //flex: 1,
        },
		itemView: {
            flexDirection: 'row',
            borderWidth: 0.5,
            //flex: 1,
        },
        image: {
            backgroundColor: '#FFFFFF',
            flex: 1,
            resizeMode: 'contain',
        },
        textView: {
            flex: 2,
        },
        text: {
            color: 'white',
            fontSize: 18,
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 20,
            paddingRight: 10,
        }
	});