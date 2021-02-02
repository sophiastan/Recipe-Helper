class AuthService {

  // Retrieves user
  fetchUser = async () => {
    const url = 'http://localhost:5000/api/current_user';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } 
}

export default AuthService;