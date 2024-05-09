import { REST_URL, getAccessToken } from "./AuthUtil";

const getImageWithAuthorization = (url) => {
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${getAccessToken()}`);
    return fetch(url, { headers });
}

export const displayProtectedProfileImage = async () => {
    // Fetch the image.
    const imageUrl = `${REST_URL}/api/v1/user/get/profile-picture`

    const response = await getImageWithAuthorization(
        imageUrl
    );

    // Convert the data to Base64 and build a data URL.
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    // Update the source of the image.
    console.log(objectUrl);
    return objectUrl;
}