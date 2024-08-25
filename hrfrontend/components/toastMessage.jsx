// ToastMessage.js
import React from 'react';
import Toast from 'react-native-root-toast';
import { View, Text } from 'react-native';

export const ToastMessage = ({ message, type = 'success', visible, onClose }) => {
    if (!visible) return null;

    let backgroundColor;
    let textColor;

    switch (type) {
        case 'success':
            backgroundColor = '#28a745';
            textColor = '#ffffff';
            break;
        case 'error':
            backgroundColor = '#dc3545';
            textColor = '#ffffff';
            break;
        default:
            backgroundColor = '#007BFF';
            textColor = '#ffffff';
    }

    return (
        <Toast
            visible={visible}
            duration={Toast.durations.SHORT}
            position={Toast.positions.BOTTOM}
            shadow={true}
            animation={true}
            hideOnPress={true}
            backgroundColor={backgroundColor}
            onHide={onClose}
        >
            <Text style={{ color: textColor, fontSize: 16, textAlign: 'center' }}>
                {message}
            </Text>
        </Toast>
    );
};

