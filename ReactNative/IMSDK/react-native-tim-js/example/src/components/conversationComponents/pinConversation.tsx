import { TencentImSDKPlugin } from 'react-native-tim-js';
import React, { useState } from 'react';
import CommonButton from '../commonComponents/CommonButton';
import SDKResponseView from '../sdkResponseView';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MultiCheckBoxModalComponent from '../commonComponents/MultiCheckboxModalComponent';

export const PinConversation = () => {
    const [res, setRes] = useState<any>({});
    const [visible, setVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('未选择');
    const [userList, setUserList] = useState<any>([]);
    const getUsersHandler = (userList) => {
        setUserName('[' + userList.join(',') + ']');
        setUserList(userList);
    };

    const CodeComponent = () => {
        return res.code !== undefined ? (
            <SDKResponseView codeString={JSON.stringify(res)} />
        ) : null;
    };

    const getConversationList = async () => {
        if (userList.length == 0) {
            return;
        }
        const res = await TencentImSDKPlugin.v2TIMManager
            .getConversationManager()
            .pinConversation(userList[0], true);
        // const res = await TencentImSDKPlugin.v2TIMManager
        //     .getConversationManager()
        //     .deleteConversation('c2c_121405');
        // const res = await TencentImSDKPlugin.v2TIMManager
        //     .getConversationManager()
        //     .setConversationDraft('c2c_109442', 'test draft');
        setRes(res);
        TencentImSDKPlugin.v2TIMManager
            .getConversationManager()
            .addConversationListener({
                onConversationChanged: (conversationList) => {
                    console.log('conversationList', conversationList);
                },
                onNewConversation: (conversationList) => {
                    console.log('conversationList', conversationList);
                },
            });
    };
    return (
        <>
            <View style={styles.selectContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(true);
                    }}
                >
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>选择会话</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.selectedText}>{userName}</Text>
            </View>
            <MultiCheckBoxModalComponent
                visible={visible}
                getVisible={setVisible}
                getUsername={getUsersHandler}
                type={'conversation'}
            />
            <CommonButton
                handler={getConversationList}
                content={'会话置顶'}
            ></CommonButton>
            <CodeComponent></CodeComponent>
        </>
    );
};

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
        lineHeight: 35,
    },
});
