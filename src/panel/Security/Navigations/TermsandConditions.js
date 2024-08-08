import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsandConditions = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* <Text style={styles.header}>Terms & Conditions</Text> */}
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>User Agreement:</Text> By downloading, accessing, or using the apartment security management app ("the App"), 
                    you agree to abide by these terms and conditions. If you do not agree with any part of these terms, 
                    you may not use the App.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Security Protocols:</Text> Users are responsible for maintaining the security of their login credentials 
                    and ensuring that unauthorized access to the App does not occur. Any suspicious activity should 
                    be reported immediately to the app administrator.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Data Privacy:</Text> The App may collect and store personal information in accordance with its Privacy Policy. 
                    Users consent to the collection, storage, and use of their personal data as outlined in the Privacy Policy.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Usage Restrictions:</Text> Users may not use the App for any unlawful or prohibited purpose. This includes but 
                    is not limited to attempting to gain unauthorized access to the system, interfering with the proper 
                    functioning of the App, or engaging in any activity that could compromise the security of the App or its users.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Intellectual Property:</Text> All content and materials available through the App, including but not limited 
                    to text, graphics, logos, and images, are the property of the App owner and are protected by intellectual 
                    property laws. Users may not reproduce, distribute, or create derivative works from any content obtained 
                    through the App without the owner's permission.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Liability:</Text> The App owner is not liable for any damages or losses resulting from the use or inability to 
                    use the App, including but not limited to direct, indirect, incidental, or consequential damages.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Updates and Maintenance:</Text> The App owner reserves the right to update, modify, or discontinue the App at any 
                    time without prior notice. Users are responsible for ensuring they have the latest version of the App installed 
                    on their devices.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Third-Party Services:</Text> The App may integrate with third-party services or websites. Users acknowledge and agree 
                    that the App owner is not responsible for the availability or accuracy of content provided by third-party services, 
                    nor for any damages or losses resulting from the use of such services.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Indemnification:</Text> Users agree to indemnify and hold harmless the App owner, its affiliates, and their respective officers, 
                    directors, employees, and agents from any claims, damages, or losses arising out of or related to the user's use of the App.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subHeader}>Governing Law:</Text> These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction]. 
                    Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
                </Text>
            </ScrollView>
             
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        paddingBottom: 20,
        
        marginTop:10,
        paddingHorizontal:20,
    },
   
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 5,
    },
    subHeader: {
        fontWeight: 'bold',
    },
    
});

export default TermsandConditions;