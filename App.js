import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar } from 'react-native';
import Login from "./src/panel/User/Navigations/Authentication/Login";
import Header from "./src/panel/Security/Component/Header/Header";
import Residents from "./src/panel/Security/Navigations/Residents";

import { Provider } from 'react-redux';
import store from './src/panel/User/Redux/Store';

import Messages from "./src/panel/Security/Navigations/Messages";
import Notice from "./src/panel/Security/Navigations/Notice";
import EditProfile from "./src/panel/Security/Navigations/EditProfile";
import TermsandConditions from "./src/panel/Security/Navigations/TermsandConditions";
import Support from "./src/panel/Security/Navigations/Support";
import AddVisitors from "./src/panel/Security/Navigations/AddVisitors";
import Cab from "./src/panel/Security/Navigations/AddCab";
import Others from "./src/panel/Security/Navigations/AddOthers";
import FrequentVisitors from "./src/panel/Security/Navigations/FrequentVisitors";
import ApartmentDetails from "./src/panel/User/Navigations/Authentication/ApartmentDetails";
import ForgotPassword from "./src/panel/User/Navigations/Authentication/ForgotPassword";
import Onboard from "./src/panel/User/Navigations/Authentication/Onboard";
import SignUp from "./src/panel/User/Navigations/Authentication/SignUp";
import Verification from "./src/panel/User/Navigations/Authentication/Verification";
import ResetPassword from "./src/panel/User/Navigations/Authentication/ResetPassword";
import UserDetails from "./src/panel/User/Navigations/Authentication/UserDetails";
import AddService from "./src/panel/Security/Navigations/AddService";
import AddDelivery from "./src/panel/Security/Navigations/AddDelivery";
import AddGuest from "./src/panel/Security/Navigations/AddGuest";
import Tabs from "./src/panel/User/Components/Bottom-tabs/Tabs";
import Tab2 from "./src/panel/User/Components/Bottom-tabs/Tab";
import MaidList from "./src/panel/User/Navigations/Screens/Services/MaidList";
import MaidProfile from "./src/panel/User/Navigations/Screens/Services/MaidProfile";
import MilkManList from "./src/panel/User/Navigations/Screens/Services/MilkManList";
import MilkManProfile from "./src/panel/User/Navigations/Screens/Services/MilkManProfile";
import CookList from "./src/panel/User/Navigations/Screens/Services/CookList";
import CookProfile from "./src/panel/User/Navigations/Screens/Services/CookProfile";
import PaperboyList from "./src/panel/User/Navigations/Screens/Services/PaperboyList";
import PaperBoyProfile from "./src/panel/User/Navigations/Screens/Services/PaperboyProfile";
import DriverList from "./src/panel/User/Navigations/Screens/Services/DriverList";
import DriverProfile from "./src/panel/User/Navigations/Screens/Services/DriverProfile";
import WaterList from "./src/panel/User/Navigations/Screens/Services/WaterList";
import WaterProfile from "./src/panel/User/Navigations/Screens/Services/WaterProfile";
import PlumberList from "./src/panel/User/Navigations/Screens/Services/PlumberList";
import CarpentersList from "./src/panel/User/Navigations/Screens/Services/CarpentersList";
import PaintersList from "./src/panel/User/Navigations/Screens/Services/PaintersList";
import Electrician from "./src/panel/User/Navigations/Screens/Services/Electrician";
import MoversList from "./src/panel/User/Navigations/Screens/Services/MoversList";
import MechanicList from "./src/panel/User/Navigations/Screens/Services/MechanicList";
import ApplianceList from "./src/panel/User/Navigations/Screens/Services/ApplianceList";
import PestControlList from "./src/panel/User/Navigations/Screens/Services/PestControlList";
import RaiseComplaint from "./src/panel/User/Navigations/Screens/GetHelp/RaiseComplaint";
import SubCategories from "./src/panel/User/Navigations/Screens/GetHelp/SubCategories";
import CalltoSecurity from "./src/panel/User/Navigations/Screens/QuickActions/CalltoSecurity";
import ProfileScreen from "./src/panel/User/Navigations/Screens/Profile/ProfileScreen";
import EditProfile1 from "./src/panel/User/Navigations/Screens/Profile/EditProfile";
import TermsandConditions1 from "./src/panel/User/Navigations/Screens/Profile/TermsandConditions";
import ResetPassword1 from "./src/panel/User/Navigations/Screens/Profile/ResetPassword";
import Amenities from "./src/panel/User/Navigations/Screens/Community/Amenities";
import BookingScreen from "./src/panel/User/Navigations/Screens/Community/BookingScreen";
import Discussion from "./src/panel/User/Navigations/Screens/Community/Discussion";
import DiscussionChat from "./src/panel/User/Navigations/Screens/Community/DiscussionChat";
import Documents from "./src/panel/User/Navigations/Screens/Community/Documents";
import Emergency from "./src/panel/User/Navigations/Screens/Community/Emergency";
import Flats from "./src/panel/User/Navigations/Screens/Community/Flats";
import NoticeBoard from "./src/panel/User/Navigations/Screens/Community/NoticeBoard";
import Payment from "./src/panel/User/Navigations/Screens/Community/Payment";
import RentalFlats from "./src/panel/User/Navigations/Screens/Community/RentalFlats";
import Resident from "./src/panel/User/Navigations/Screens/Community/Residents";
import Notifications from './src/panel/User/Navigations/Screens/Notifications/Notifications';
import Sample from './src/panel/Security/Component/Barcode/Sample';
import PreApproval from './src/panel/User/Navigations/Screens/QuickActions/PreApprovals/PreApproval';
import MessagetoGuard from './src/panel/User/Navigations/Screens/QuickActions/MessagetoGuard';
import Household from './src/panel/User/Navigations/Screens/Profile/Household';
import Polls from './src/panel/User/Navigations/Screens/Community/Polls';
import CreateUser from './src/panel/User/Navigations/Authentication/CreateUser';
import ForgotVerification from './src/panel/User/Navigations/Authentication/ForgotVerification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManageDailyHelp from './src/panel/User/Navigations/Screens/Profile/ManageDailyHelp';
import Events from './src/panel/User/Navigations/Screens/Community/Events';
import InandOut1 from './src/panel/Security/Component/Header/InandOut1';
import MyDocuments from './src/panel/User/Navigations/Screens/Profile/MyDocuments';
import Communication from './src/panel/User/Navigations/Screens/Community/Communication';
import MyBills from './src/panel/User/Navigations/Screens/Profile/MyBills/MyBills';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Onboard');
  useEffect(() => {
    const checkTokenExpiry = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token'); if (token) {
          const decodedToken = jwt_decode(token); const exp = decodedToken.exp * 1000;

          const currentTime = Date.now(); if (currentTime >= exp) {
            await AsyncStorage.clear();
            console.log('Token expired. Cleared AsyncStorage.');
          }
        }
      }
      catch (error) {
        console.error('Error checking token expiry:', error);
      }
    };
    checkTokenExpiry();
    console.log(checkTokenExpiry())
  }, []);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const userToken = await AsyncStorage.getItem('userToken');
        const userRole = JSON.parse(user).role
        console.log(userRole)
        if (user !== null && userToken !== null) {
          if (userRole === 'Sequrity') {
            setInitialRoute('Header');
          } else {
            setInitialRoute('Tabs');
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerStyle: {
                backgroundColor: '#7D0431',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Login" component={Login} options={{
              headerShown: false,
            }} />
            <Stack.Screen
              name="Create User"
              component={CreateUser}
              options={{
                headerShown: false,
              }}

            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Apartment Details" component={ApartmentDetails} />
            <Stack.Screen name="Polls" component={Polls} />
            <Stack.Screen name="Tabs" component={Tabs} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Tab" component={Tab2} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="Verification " component={ForgotVerification} />
            <Stack.Screen name="User Details" component={UserDetails} />
            <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="SignUp" component={SignUp} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Onboard" component={Onboard} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Header" component={Header} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Residents" component={Residents} />
            <Stack.Screen name="Manage Daily Help" component={ManageDailyHelp} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Add Service" component={AddService} />
            <Stack.Screen name="Add Delivery" component={AddDelivery} />
            <Stack.Screen name="Add Guest" component={AddGuest} />
            <Stack.Screen name="Notice" component={Notice} />
            <Stack.Screen name="Edit Security Profile" component={EditProfile} />
            <Stack.Screen name="Terms and Conditions" component={TermsandConditions} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="Add Visitor" component={AddVisitors} />
            <Stack.Screen name="Add Cab" component={Cab} />
            <Stack.Screen name="Add Others" component={Others} />
            <Stack.Screen name="Frequent Visitors" component={FrequentVisitors} />
            <Stack.Screen name="Maids" component={MaidList} />
            <Stack.Screen name="Maid Profile" component={MaidProfile} />
            <Stack.Screen name="Milk Man" component={MilkManList} />
            <Stack.Screen name="Milk Man Profile" component={MilkManProfile} />
            <Stack.Screen name="Cook" component={CookList} />
            <Stack.Screen name="Cook Profile" component={CookProfile} />
            <Stack.Screen name="Paper Boy" component={PaperboyList} />
            <Stack.Screen name="Scanner" component={Sample} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Paper Boy Profile" component={PaperBoyProfile} />
            <Stack.Screen name="Driver" component={DriverList} />
            <Stack.Screen name="Driver Profile" component={DriverProfile} />
            <Stack.Screen name="Water" component={WaterList} />
            <Stack.Screen name="Water Profile" component={WaterProfile} />
            <Stack.Screen name="Plumber" component={PlumberList} />
            <Stack.Screen name="Carpenter" component={CarpentersList} />
            <Stack.Screen name="Painter" component={PaintersList} />
            <Stack.Screen name="My Documents" component={MyDocuments} />
            <Stack.Screen name="Electrician" component={Electrician} />
            <Stack.Screen name="Movers" component={MoversList} />
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="Mechanic" component={MechanicList} />
            <Stack.Screen name="Appliance" component={ApplianceList} />
            <Stack.Screen name="Pest Control" component={PestControlList} />
            <Stack.Screen name="Raise Complaint" component={RaiseComplaint} />
            <Stack.Screen name="Select the Category" component={SubCategories} />
            <Stack.Screen name="Call to Security" component={CalltoSecurity} />
            <Stack.Screen name="InandOut1" component={InandOut1} />
            <Stack.Screen name="My Bills" component={MyBills} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Edit Profile" component={EditProfile1} />
            <Stack.Screen name="Terms and Conditions " component={TermsandConditions1} />
            <Stack.Screen name="Reset Password " component={ResetPassword1} />
            <Stack.Screen name="Amenities" component={Amenities} />
            <Stack.Screen name="Booking Screen" component={BookingScreen} />
            <Stack.Screen name="Communication" component={Communication} />
            <Stack.Screen name="DiscussionChat" component={DiscussionChat} />
            <Stack.Screen name="Documents" component={Documents} />
            <Stack.Screen name="Emergency" component={Emergency} />
            <Stack.Screen name="Flats" component={Flats} />
            <Stack.Screen name="Notice Board" component={NoticeBoard} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Rental Flats" component={RentalFlats} />
            <Stack.Screen name="Residents " component={Resident} />
            <Stack.Screen name="Notification" component={Notifications} />
            <Stack.Screen name="Pre Approval Visitors" component={PreApproval} />
            <Stack.Screen name="Message to Guard" component={MessagetoGuard} />
            <Stack.Screen name="Household" component={Household} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

