import { useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import { useGetTrackQuery } from "./api/apiSlice";
import { RootState } from "./store/store";

export default function TrackInformation({imageHeight}:{imageHeight: number}) {
    const accessToken = useSelector(authSelectors.getAccessToken);
    const trackId = useSelector((state: RootState) => state.accountState.id);
    const { data: track } = useGetTrackQuery(trackId, {
        skip: !accessToken
    });
    if(track !== undefined){
        return (
            <div>
                <p>{track.name}</p>
                {track.preview_url !== null && <div id="audioPlayer">
                    <audio src={track.preview_url} controls></audio>
                </div>}
            </div>
        )
    }
}