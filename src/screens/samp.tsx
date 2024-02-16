const galleryOpen = async () => {
    const options = {
        mediaType: 'photo',
        includeBase64: true, // Change this to true to get base64 representation of the image
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
                    const fileExtension = selectedImage.fileName.split('.').pop();
                    const fileType = `.${fileExtension}`;

                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            fileType: fileType,
                            bucketName: "esra-bucket-applab-2"
                        }),
                    };

                    console.log('Request Body:===>', requestOptions.body);

                    const res = await fetch(`${Api}/inference/generatePresignedUrl`, requestOptions);
                    const data = await res.json();
                    if (data.status) {
                        console.log("Pre-signed URL:===>", data);
                        // Convert base64 image to blob
                        const blob = b64toBlob(selectedImage.base64, selectedImage.type);

                        // Upload the image using the obtained pre-signed URL
                        const uploadResponse = await fetch(data.url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': selectedImage.type,
                            },
                            body: blob,
                        });
                        if (uploadResponse.ok) {
                            console.log('Image uploaded ===>', uploadResponse);
                            Alert.alert('Successfully uploaded the image')
                        } else {
                            console.log('Failed to upload image:', uploadResponse.statusText);
                        }
                    } else {
                        console.log('Failed to generate pre-signed URL:', data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('Image URI is undefined');
            }
        }
    });
};

// Function to convert base64 to Blob
function b64toBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
