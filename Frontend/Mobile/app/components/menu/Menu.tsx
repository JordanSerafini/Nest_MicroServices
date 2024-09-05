import {  Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Portal } from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type MenuProps = {
  visible: boolean;
  onClose: () => void;
};

const Menu = ({ visible, onClose }: MenuProps) => {
  const translateX = useSharedValue(visible ? 0 : -width);

  React.useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      });
    } else {
      translateX.value = withTiming(-width, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  console.log("Menu rendered, visible:", visible);

  return (
    <Portal>
      <Animated.View style={[styles.menu, animatedStyle]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.menuText}>Menu Content</Text>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  menu: {
    zIndex: 1000,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 16,
    color: 'red',
  },
  menuText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Menu;
