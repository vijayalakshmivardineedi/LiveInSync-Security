
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
 
const SubCategories = ({ goBack }) => {

       const navigation = useNavigation();
    const handlebuttonPress = () => {
        navigation.navigate('Raise Complaint');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.categoryButton} onPress={handlebuttonPress}>
                <Text style={styles.categoryButtonText}>Electrical</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Plumbing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Lift</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Common Area</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Car Parking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Others</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    category: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    categoryButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderWidth:1,
        borderColor:"#91A8BA",
        borderRadius: 5,
    },
    categoryButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default SubCategories;