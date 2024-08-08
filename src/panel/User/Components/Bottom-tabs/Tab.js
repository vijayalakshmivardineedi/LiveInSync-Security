import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Navigations/Screens/HomeScreen';
import GetHelp from '../../Navigations/Screens/GetHelp';
import QuickActions from '../../Navigations/Screens/QuickActions';
import Services from '../../Navigations/Screens/Services';
import Community from '../../Navigations/Screens/Community';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const icons = {
    Home: 'home',
    'Get Help': 'question-circle',
    'Quick Actions': 'bolt',
    Services: 'cogs',
    Community: 'users',
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const scaleAnim = React.useRef(new Animated.Value(1)).current;
        const translateYAnim = React.useRef(new Animated.Value(0)).current;

        React.useEffect(() => {
          if (isFocused) {
            Animated.parallel([
              Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(translateYAnim, {
                toValue: -10,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start();
          } else {
            Animated.parallel([
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start();
          }
        }, [isFocused]);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {isFocused && <View style={styles.curvedBackground} />}
            <Animated.View
              style={[
                styles.iconContainer,
                isFocused && styles.iconContainerFocused,
                {
                  transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
                },
              ]}
            >
              <Icon name={icons[route.name]} size={22} color="#fff" />
            </Animated.View>
            {isFocused && (
              <Text style={{ color: '#fff', fontSize: 10 }}>{label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Tab2() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen name="Get Help" component={GetHelp} options={{ 
          headerStyle: { backgroundColor: '#7D0431' }, 
          headerTintColor: '#fff',
        }} />
      <Tab.Screen name="Quick Actions" component={QuickActions} options={{ 
          headerStyle: { backgroundColor: '#7D0431' }, 
          headerTintColor: '#fff',
        }} />
      <Tab.Screen name="Services" component={Services} options={{ 
          headerStyle: { backgroundColor: '#7D0431' }, 
          headerTintColor: '#fff',
        }} />
      <Tab.Screen name="Community" component={Community} options={{ 
          headerStyle: { backgroundColor: '#7D0431' }, 
          headerTintColor: '#fff',
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#7D0431',
    position: 'relative',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    position: 'relative',
  },
  iconContainer: {
    backgroundColor: '#7D0431',
    padding: 5,
    borderRadius: 50,
    zIndex: 1,
  },
  iconContainerFocused: {
    backgroundColor: '#7D0431',
  },
  curvedBackground: {
    position: 'absolute',
    top: -20,
    width: 70,
    height: 70,
    backgroundColor: '#7D0431',
    borderRadius: 35,
    zIndex: 0,
  },
});

export default Tab2;
