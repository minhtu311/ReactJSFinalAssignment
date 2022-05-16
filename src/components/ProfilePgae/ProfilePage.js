import React, { useEffect, useState, useContext } from 'react'
import LoginPage from '../LoginPage/LoginPage';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';


const ProfilePage = () => {
    const { userId, token } = useContext(UserContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (userId && token) {
            axios({
                method: "GET",
                url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`,
                headers: {
                    Authorization: token
                }
            }).then(({ data }) => {
                console.log("5555666", data)
                setProfile({
                    id: data.id,
                    name: data.name,
                    createdAt: data.createdAt
                })
            })
        }
    }, [userId, token])

    if (userId === null) {
        return (
            <div>
                <h5>You need to login to continue</h5>
                <LoginPage />
            </div>
        )
    }
    console.log("55555", profile)
    return (
        <div>
            <h3>Profile</h3>
            <p>Name: {profile?.name}</p>
            <p>UserId: {profile?.id}</p>
        </div>
    );
}

export default ProfilePage