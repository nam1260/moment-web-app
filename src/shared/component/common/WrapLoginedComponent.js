import StorageManager from "../../../managers/StorageManager";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { saveUser } from "../../../redux/user";


export const WrapLoginedComponent = (WrappedComponent) => {
    const ChildComponent = (props) => {
        const dispatch = useDispatch();    
        const userInfo = useSelector(state => state.user) || {};

        useEffect(() => {
            if(StorageManager.checkUserIsLogined()) {
                if(!userInfo.isLogined) {
                    const loadedUserInfo = StorageManager.loadUserInfo();
                    dispatch(saveUser({
                        userNickNm: loadedUserInfo.userNickNm,
                        userId: loadedUserInfo.userId,
                    }))
                }
            }
        }, [])
        
        let combinedProps = {
            ...props,
            ...userInfo
        }

        return (
            <WrappedComponent {...combinedProps} />
        )
    }

    return ChildComponent
}
