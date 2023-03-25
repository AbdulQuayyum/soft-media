import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import { Client } from "./Client";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const CreateOrGetUser = (response) => {
    const navigate = useNavigate();
    localStorage.setItem("User", JSON.stringify(response.credential))
    const decoded = jwt_decode(response.credential)

    const { name, picture, sub } = decoded

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    }
    Client.createIfNotExists(user).then(() => {
        navigate('/', { replace: true });
    });
}