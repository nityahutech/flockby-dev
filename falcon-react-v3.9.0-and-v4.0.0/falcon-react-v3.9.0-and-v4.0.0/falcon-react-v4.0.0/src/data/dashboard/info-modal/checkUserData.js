import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpModal = async id => {
  const navigate = useNavigate();

  //   checkUserData = async id => {
  console.log(id);
  try {
    let exists = await axios.get(`http://127.0.0.1:8000/users/${id}`);
    console.log(exists);
    //navigate dashboard
  } catch (err) {
    this.navigate('/info-modal/user-info-modal');
    console.log(err);
  }
  //   };
};

export default SignUpModal;
