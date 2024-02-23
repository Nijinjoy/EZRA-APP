function savePrediction(childid, url, token) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${token}`);

    const raw = JSON.stringify({
        "childId": childid,
        "imagePath": url?.downloadUrl,
        "assessAvailable": "true",
        "isChildInPhoto": "Yes",
        "feeling": "Sad",
        "hasStory": "No",
        "isSpontaneous": "Yes",
        "isInGroup": "Yes",
        "isBeforeSchool": "No",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    return fetch("https://esra-dev.applab.qa/api/child/savePrediction", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Call the function with appropriate arguments
savePrediction("childId123", { downloadUrl: "https://example.com/image.jpg" }, "your-token-here")
    .then(() => console.log("Prediction saved successfully"))
    .catch((error) => console.error("Error saving prediction:", error));
