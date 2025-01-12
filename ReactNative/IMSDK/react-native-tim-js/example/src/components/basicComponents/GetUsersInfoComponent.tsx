import React, { useState } from 'react';

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TencentImSDKPlugin } from 'react-native-tim-js';
import CommonButton from '../commonComponents/CommonButton';
import MultiCheckBoxModalComponent from '../commonComponents/MultiCheckboxModalComponent';
import SDKResponseView from '../sdkResponseView';
const GetUsersInfoComponent = () => {
    const getUsersInfo = async () => {
        const res = await TencentImSDKPlugin.v2TIMManager.getUsersInfo(
            userList
        );
        setRes(res);
    };
    const [visible, setVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('未选择');
    const [userList, setUserList] = useState<any>([]);
    const [res, setRes] = React.useState<any>({});
    const getUsersHandler = (userList) => {
        setUserName('[' + userList.join(',') + ']');
        setUserList(userList);
    };
    const CodeComponent = () => {
        return res.code === 0 ? (
            <SDKResponseView
                codeString={JSON.stringify(res.data)}
            ></SDKResponseView>
        ) : null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.selectContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(true);
                    }}
                >
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>选择好友</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.selectedText}>{userName}</Text>
            </View>
            <MultiCheckBoxModalComponent visible={visible} getVisible={setVisible} getUsername={getUsersHandler} type={'friend'}/>
            <CommonButton handler={() => getUsersInfo()} content={'获取用户信息'}></CommonButton>
            <CodeComponent></CodeComponent>
        </View>
    );
};

export default GetUsersInfoComponent;
const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 0,
    },
    buttonView: {
        backgroundColor: '#2F80ED',
        borderRadius: 3,
        width: 100,
        height: 35,
        marginLeft: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 35,
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 14,
        textAlignVertical: 'center',
        overflow: 'scroll',
        width: '63%',
    },
});
