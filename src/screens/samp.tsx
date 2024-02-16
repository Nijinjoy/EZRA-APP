const galleryOpen = async () => {
    const options = {
        mediaType: 'photo',
        includeBase64: false,
        includeExif: true,
    };
    launchImageLibrary(options, async (response) => {
        if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.didCancel) {
            console.log('User cancelled image picker');
        } else {
            if (response.assets && response.assets.length > 0) {
                try {
                    const selectedImage = response.assets[0];
                    console.log("selectedImage===>", selectedImage);

                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            fileType: '.png', // Assuming fileType is always ".png"
                            bucketName: selectedImage.fileName
                        }),
                    };

                    console.log('Request Body:', requestOptions.body);

                    const res = await fetch(`${Api}/inference/generatePresignedUrl`, requestOptions);
                    const data = await res.json();
                    if (res.status === 200) {
                        console.log("Pre-signed URL:", data);

                        // Uploading the image using the obtained pre-signed URL
                        const uploadResponse = await fetch(data.url, {
                            method: 'PUT',
                            body: selectedImage.uri,
                            headers: {
                                'Content-Type': selectedImage.type,
                            },
                        });

                        if (uploadResponse.ok) {
                            console.log('Image uploaded successfully');
                        } else {
                            console.log('Failed to upload image:', uploadResponse.statusText);
                        }
                    } else {
                        console.log('Failed to generate pre-signed URL:', data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
                setModalVisible(false);
            } else {
                console.log('Image URI is undefined');
            }
        }
    });
};
