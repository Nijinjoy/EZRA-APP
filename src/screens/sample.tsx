const handleAddChild = async () => {
    try {
        // Assuming the API expects JSON data
        const apiEndpoint = 'https://hbkuesra.herokuapp.com/api/child/addChild';
        const apiData = {
            name: childInfo.name,
            gender: childInfo.gender,
            dateOfBirth: childInfo.dateOfBirth,
        };

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
            },
            body: JSON.stringify(apiData),
        });

        if (!response.ok) {
            throw new Error('Failed to add child');
        }

        // Successfully added child, navigate to HomeScreen
        Navigation.navigate('HomeScreen', { childInfo: childInfo.name });

        if (route.params?.isNewChild) {
            setChildInfo({ name: '', gender: 'Male', dateOfBirth: '' });
        }
    } catch (error) {
        console.error('Error adding child:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
};


const handleAddChild = async () => {
    try {
        // Your existing code...

        // Storing child information in AsyncStorage
        await AsyncStorage.setItem('childName', childInfo.name);
        await AsyncStorage.setItem('childGender', childInfo.gender);
        await AsyncStorage.setItem('childDateOfBirth', childInfo.dateOfBirth);

        // Navigating to HomeScreen with childInfo parameter
        Navigation.navigate('HomeScreen', { childInfo: childInfo.name });

        if (route.params?.isNewChild) {
            setChildInfo({ name: '', gender: 'Male', dateOfBirth: '' });
        }
    } catch (error) {
        console.error('Error storing child information:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
};
