import baseApi from './baseApi';

const homeScreenImages = async (num) => {
  const token = `X4XsklGpZ2PNKqqaMR01n53ee5Pyv9ZpatIvcs9DhQ5PrYfhM8z8c6jm`;
  try {
    const response = await baseApi.get('/curated', {
      params: {
        page: num,
        per_page: 10,
      },
      headers: {
        Authorization: `${token}`,
      },
    });
  return response;
    // console.log(JSON.stringify(response.data, null, 2));  // Beautified JSON output
  } catch (error) {
    console.error(error);  // Used console.error for error logging
  }
};

export default homeScreenImages;
