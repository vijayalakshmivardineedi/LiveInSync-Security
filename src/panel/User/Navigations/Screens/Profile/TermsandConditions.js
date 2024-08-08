import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsandConditions = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* <Text style={styles.header}>Terms & Conditions</Text> */}
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Acceptance of Terms:</Text>By using Liveeasy, 
                    you agree to comply with and be bound by these terms and conditions. 
                    If you do not agree, please do not use the app.


                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>User Accounts:</Text> Users are required to 
                    create an account to access certain features of the app. You are 
                    responsible for maintaining the confidentiality of your account 
                    information and for all activities that occur under your account.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>User Conduct:</Text> Users agree to use 
                    Liveeasy for lawful purposes only. You must not use the app to 
                    engage in any unlawful or fraudulent activities or to infringe on 
                    the rights of others.
                </Text>
                
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Content Ownership and Use:</Text> All content 
                    and materials available on Liveeasy, including but not limited to text, 
                    graphics, and logos, are the property of Liveeasy or its licensors and 
                    are protected by applicable intellectual property laws. Users may not 
                    reproduce, distribute, or create derivative works from this content 
                    without explicit permission.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Privacy Policy:</Text> Liveeasy is committed 
                    to protecting your privacy. Please review our Privacy Policy to understand 
                    how we collect, use, and protect your personal information.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Fees and Payments:</Text> Certain features 
                    of Liveeasy may require payment of fees. Users agree to provide accurate 
                    billing information and authorize Liveeasy to charge the applicable fees 
                    to their chosen payment method.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Service Availability:</Text> While Liveeasy 
                    aims to provide a reliable service, we do not guarantee that the app 
                    will be available at all times or without interruptions. We are not 
                    liable for any downtime or disruptions in service.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Limitation of Liability:</Text> Liveeasy is 
                    not liable for any indirect, incidental, special, or consequential 
                    damages arising out of or in connection with your use of the app. 
                    Our total liability to you for any claims arising from the use of 
                    the app is limited to the amount you paid, if any, for accessing 
                    the app.
                
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Termination:</Text> Liveeasy reserves 
                    the right to terminate or suspend your account at any time, without 
                    prior notice, for conduct that we believe violates these 
                    terms and conditions or is harmful to other users or the app itself.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Changes to Terms:</Text> Liveeasy may 
                    update these terms and conditions from time to time. We will notify 
                    users of any changes by posting the new terms on the app. Continued 
                    use of the app after such changes constitutes acceptance of the 
                    new terms.
                </Text>
            </ScrollView>
             
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        paddingBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 16,
    },
    subHeader: {
        fontWeight: 'bold',
    },
    
});

export default TermsandConditions;