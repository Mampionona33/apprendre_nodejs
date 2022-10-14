const axios = require('axios');

const addUser = async () => {
  const user = {
    name: 'mohit',
    password: 'password4',
    profession: 'teacher',
    id: 4,
  };

  try {
    const res = await axios.post('http://127.0.0.1:8081/addUser', user);

    console.log(`status : ${res.status}`);
    console.log('body: ', res.data);
  } catch (error) {
    console.log(error);
  }
};

addUser();
