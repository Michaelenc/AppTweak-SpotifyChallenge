import { useSelector } from "react-redux";
import { useGetUserQuery } from "./api/apiSlice";
import { authSelectors } from "./containers/auth/selectors";

import './Profile.css'

export default function Profile({imageHeight}:{imageHeight: number}) {
    const accessToken = useSelector(authSelectors.getAccessToken);
    const { data: user } = useGetUserQuery(undefined, {
        skip: !accessToken
    });
    if (user !== undefined){
        console.log(user)
        return (
            <div id='profileContainer' style={{marginBlockStart:imageHeight/2}}>
                <div id='profile'>
                    <img
                        loading="lazy"
                        height={imageHeight}
                        width={imageHeight}
                        src={user.images.length > 0 ? user.images[0].url : "/user.png"}
                        alt={"Profile picture for " + user.display_name}
                        draggable="false"
                        style={{top:-(imageHeight/2)}}
                    />
                    <a href={user.external_urls.spotify} target="_blank" rel="noreferrer">
                        <h3 style={{marginBlockStart:imageHeight/2}}>{user.display_name}</h3>
                    </a>
                    <p>Email address: {user.email}</p>
                    <p>Country: {user.country}</p>
                    <p>Type of account: {user.product}</p>
                    <p>Amount of followers: {user.followers.total}</p>
                </div>
            </div>
        )
    }
}