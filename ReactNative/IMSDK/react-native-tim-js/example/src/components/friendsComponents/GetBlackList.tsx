import * as React from 'react';

import { TencentImSDKPlugin } from 'react-native-tim-js';
import CommonButton from '../commonComponents/CommonButton';
import SDKResponseView from '../sdkResponseView';
const GetBlackListComponent = () => {
    const getBlackList = async () => {
        const res = await TencentImSDKPlugin.v2TIMManager.getFriendshipManager().getBlackList()
        setRes(res)
    }

    const [res, setRes] = React.useState<any>({})
    const CodeComponent = () => {
        return (
            res.code !== undefined ?
                (<SDKResponseView codeString={JSON.stringify(res)}/>) : null
        );
    }
    return (
        <>
            <CommonButton handler={() => getBlackList()} content={'获取黑名单列表'}></CommonButton>
            <CodeComponent></CodeComponent>
        </>
    )
}

export default GetBlackListComponent