import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addChild } from '../redux/actions';

const AddChildScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleAddChild = (childDetails) => {
        // Assuming childDetails contains the name, gender, and dob of the child
        dispatch(addChild(childDetails));
        navigation.navigate('HomeScreen');
    };

    return (
        <View>
            {/* Your UI for adding child details */}
            <Text>Add Child Details</Text>
            {/* Example button to trigger handleAddChild */}
            <Button
                title="Add Child"
                onPress={() => handleAddChild({ name: 'John', gender: 'Male', dob: '01/01/2022' })}
            />
        </View>
    );
};

export default AddChildScreen;

import { SET_TOKEN, ADD_CHILD } from './constants';

export const addChild = (childDetails) => ({
    type: ADD_CHILD,
    payload: childDetails,
});




import { ADD_CHILD } from '../constants';

const initialState = {
    userDetails: {
        // Initial user details
        name: 'Initial User',
        // ...other fields
    },
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHILD:
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    // Update the name field with the new child's name
                    name: action.payload.name,
                },
            };
        // ...other cases
        default:
            return state;
    }
};

export default commonReducer;
