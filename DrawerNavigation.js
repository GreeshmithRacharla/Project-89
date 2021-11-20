import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'
import Profile from '../screens/Profile';


const Drawer = createDrawerNavigator()

export default class DrawerNavigator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          light_theme: true
        };
      }
    
      componentDidMount() {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function(snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({ light_theme: theme === "light" ? true : false });
      }
    render(){
        let props = this.props;
         return(
        <Drawer.Navigator
        drawerContentOptions={{
            activeTintColor: "#e91e63",
            inactiveTintColor: this.state.light_theme ? "black" : "white",
            itemStyle: { marginVertical: 5 }
          }}
          drawerContent={props => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen name = "Home" component={TabNavigator}/>
            <Drawer.Screen name = "Profile" component={Profile}/>
        </Drawer.Navigator>
    )
    }
}
   


export default DrawerNavigator;