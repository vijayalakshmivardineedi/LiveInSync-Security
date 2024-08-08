import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './Slice/ServiceSlice/ServiceSlice';
import noticeReducer from './Slice/CommunitySlice/NoticeSlice';
import SignupReducer from './Slice/AuthSlice/SignupSlice';
import loginReducer from './Slice/AuthSlice/LoginSlice';
import userLoginReducer from './Slice/AuthSlice/Login/LoginSlice';
import forgotPasswordReducer from './Slice/AuthSlice/ForgotSlice';
import profileReducer from './Slice/ProfileSlice/ProfileSlice';
import profileEditReducer from './Slice/ProfileSlice/EditProfileSlice';
import emergencyContactsReducer from './Slice/CommunitySlice/EmergencyContactSlice';
import emailVerificationReducer from './Slice/AuthSlice/Signup/SendEmailVerification';
import cityReducer from './Slice/AuthSlice/Signup/citySlice';
import societiesReducer from './Slice/AuthSlice/Signup/societySlice';
import otpReducer from './Slice/AuthSlice/Signup/otpSlice';
import userProfileReducer from './Slice/AuthSlice/Signup/userProfileSlice';
import forgotPasswordEmailReducer from './Slice/AuthSlice/Forgot/SendForgotEmail';
import forgotOtpReducer from './Slice/AuthSlice/Forgot/forgotOtpSlice';
import resetPasswordReducer from './Slice/AuthSlice/Forgot/resetPasswordSlice';
import userResetPasswordReducer from './Slice/ProfileSlice/resetSlice';
import visitorReducer from './Slice/Security_Panel/VisitorsSlice';
import visitorsReducer from './Slice/Security_Panel/InandOutSlice';
import frequentVisitorsReducer from './Slice/Security_Panel/FrequentVisitorsSlice';
import noticesReducer from './Slice/Security_Panel/NoticeSlice';
import houseHoldsReducer from './Slice/ProfileSlice/Household/AddMemberSlice';
import vehicleReducer from './Slice/ProfileSlice/Household/VehicleSlice';
import petReducer from './Slice/ProfileSlice/Household/PetSlice';
import frequentVisitorsuserReducer from "./Slice/ProfileSlice/Household/frequentVisitorsSlice"
import residentsuserReducer from './Slice/CommunitySlice/residentsSlice';
import  eventsReducer from './Slice/CommunitySlice/EventSlice';
import  preApprovalReducer from './Slice/Home/PreapprovalSlice';
import  manageserviceReducer from './Slice/ProfileSlice/manageServiceSlice';
import addServiceSlice from './Slice/ServiceSlice/AddServiceSlice';
import SocietyByIdReducer from './Slice/Security_Panel/SocietyByIdSlice';

const store = configureStore({
  reducer: {
    //Services
    services: serviceReducer,
    addService: addServiceSlice,
    ///Notice
    notices: noticeReducer,
    //Auth
    login: loginReducer,
    signup: SignupReducer,
    forgotPassword: forgotPasswordReducer,
    userLogin: userLoginReducer,
    senEmailforgotPassword: forgotPasswordEmailReducer,
    forgototp: forgotOtpReducer,
    resetPassword:resetPasswordReducer,
    userResetPassword:userResetPasswordReducer,
    //Auth //Signup
    citiesState: cityReducer,
    societiesState: societiesReducer,
    emailVerification: emailVerificationReducer,
    otp: otpReducer,
    user: userProfileReducer,
    //Profile
    profiles: profileReducer,
    profileEdit: profileEditReducer,
    manageServices: manageserviceReducer,
    //Profile//Households
    frequentVisitor:frequentVisitorsuserReducer,
    houseHolds: houseHoldsReducer,
    vehicle: vehicleReducer,
    pet: petReducer,
    //Community
    emergencyContacts: emergencyContactsReducer,
    userResidents:residentsuserReducer,
    events: eventsReducer,
    //Home
    preApprovals: preApprovalReducer,


    //Security_Panel
    visitor: visitorReducer,  
    visitors: visitorsReducer,
    frequentVisitors: frequentVisitorsReducer,
    notices: noticesReducer,
    societyById:SocietyByIdReducer
  },
});

export default store;
