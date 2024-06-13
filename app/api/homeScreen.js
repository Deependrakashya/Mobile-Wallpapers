import baseApi from './baseApi';

const homeScreenImages = async (num) => {
  const token = `X4XsklGpZ2PNKqqaMR01n53ee5Pyv9ZpatIvcs9DhQ5PrYfhM8z8c6jm`;
  try {
    const response = await baseApi.get('/curated', {
      params: {
        page: num,
        per_page: 80,
      },
      headers: {
        Authorization: `${token}`,
      },
    });
  return response;
   
  } catch (error) {
    console.error(error); 
  }
};

export default homeScreenImages;
