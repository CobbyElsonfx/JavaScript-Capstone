const getMoviesData = async (url) => {
  try {
    const fetchedData = await fetch(url);
    const data = await fetchedData.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const postData = async ()=> {
    // others
    return "nothing";
}

export {
  getMoviesData,
  postData
};