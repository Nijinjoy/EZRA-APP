// ... other imports ...

const ProductOrderScreen = () => {
    // ... other state and variables ...

    const fetchProducts = async () => {
        try {
            const apiUrl = 'https://esra-dev.applab.qa/api/products';
            const headers = {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1NWYzMDZmMzA0MzAwNzQxMmQ5M2MiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc2NTMwNjk3fQ.8ZUDKzZ9Lfx8_23JC2yPzYFUGwRmIOBG_L0ZZxcexrk`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(apiUrl, { headers });

            if (!response.data.status) {
                throw new Error(`API error! Message: ${response.data.message}`);
            }

            setProductlist(response.data);
            console.log("data====>", response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const createOrder = async () => {
        await fetchProducts();
        const { name, email, phone, image, addressLine1, addressLine2 } = formData;
        try {
            const response = await fetch(`${Api}/orders`, {
                method: "POST",
                body: JSON.stringify({
                    name, email, phone, image, addressLine1, addressLine2
                }),
                headers: {
                    Accept: "application/json",
                    authorization: `Bearer ${token}`
                }
            });

            if (response?.status) {
                console.log("responsee===>", response.status);
                navigation.navigate('OrderHistoryDrawer');
            } else {
                Alert.alert('Error', 'Failed to create an order. Please try again.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    };

    // ... rest of the component ...
};

export default ProductOrderScreen;
