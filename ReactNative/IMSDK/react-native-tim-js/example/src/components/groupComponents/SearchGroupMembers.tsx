import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch ,TouchableOpacity} from 'react-native';
import { TencentImSDKPlugin } from 'react-native-tim-js';
import CommonButton from '../commonComponents/CommonButton';
import SDKResponseView from '../sdkResponseView';
import UserInputComponent from '../commonComponents/UserInputComponent';
import CheckBoxModalComponent from '../commonComponents/CheckboxModalComponent';
const SearchGroupMembersComponent = () => {
    const searchGroupMembers = async () => {
        const keywordList = keywords.split(' ');
        const res = await TencentImSDKPlugin.v2TIMManager.getGroupManager().searchGroupMembers({
            keywordList:keywordList,
            isSearchMemberUserID:isSearchMemberUserID,
            isSearchMemberNameCard:isSearchMemberNameCard,
            isSearchMemberNickName:isSearchMemberNickName,
            isSearchMemberRemark:isSearchMemberRemark
        })
        console.log(res)
        setRes(res)
    }

    const [res, setRes] = useState<any>({})
    const [keywords, setKeywords] = useState<string>('')
    const [groupID,setGroupID] = useState<string>('')
    const [isSearchMemberNickName, setIsSearchMemberNickName] = useState(false);
    const [isSearchMemberUserID, setIsSearchMemberUserID] = useState(false);
    const [isSearchMemberNameCard, setIsSearchMemberNameCard] = useState(false);
    const [isSearchMemberRemark, setIsSearchMemberRemark] = useState(false);
    const searchMemberNickNametoggle = () => setIsSearchMemberNickName(previousState => !previousState);
    const searchMemberUserIDtoggle = () => setIsSearchMemberUserID(previousState => !previousState);
    const searchMemberNameCardtoggle = () => setIsSearchMemberNameCard(previousState => !previousState);
    const searchMemberRemarktoggle = () => setIsSearchMemberRemark(previousState => !previousState);
    const CodeComponent = () => {
        return (
            res.code !== undefined ?
                (<SDKResponseView codeString={JSON.stringify(res)} />) : null
        );
    }

    const GroupSelectComponent = () => {
        const [visible, setVisible] = useState<boolean>(false)
        return (
            <View style={styles.container}>
                <View style={styles.selectContainer}>
                    <TouchableOpacity onPress={() => { setVisible(true) }}>
                        <View style={styles.buttonView}>
                            <Text style={styles.buttonText}>选择群组</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.selectedText}>{groupID}</Text>
                </View>
                <CheckBoxModalComponent visible={visible} getVisible={setVisible} getUsername={setGroupID} type={'group'} />
            </View>
        )
    };
    return (
        <>
            <View style={styles.userInputcontainer}>
                <UserInputComponent content='搜索关键词列表，最多支持5个' placeholdercontent='关键词(example只有设置了一个关键词)' getContent={setKeywords} />
            </View>
            <GroupSelectComponent/>
            <View style={styles.switchcontainer}>
                <Text style={styles.switchtext}>设置是否搜索群成员userID</Text>
                <Switch
                    trackColor={{ false: "#c0c0c0", true: "#81b0ff" }}
                    thumbColor={isSearchMemberUserID ? "#2F80ED" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={searchMemberUserIDtoggle}
                    value={isSearchMemberUserID}
                />
            </View>
            <View style={styles.switchcontainer}>
                <Text style={styles.switchtext}>设置是否搜索群成员昵称</Text>
                <Switch
                    trackColor={{ false: "#c0c0c0", true: "#81b0ff" }}
                    thumbColor={isSearchMemberNickName? "#2F80ED" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={searchMemberNickNametoggle}
                    value={isSearchMemberNickName}
                />
            </View>
            <View style={styles.switchcontainer}>
                <Text style={styles.switchtext}>设置是否搜索群成员名片</Text>
                <Switch
                    trackColor={{ false: "#c0c0c0", true: "#81b0ff" }}
                    thumbColor={isSearchMemberNameCard? "#2F80ED" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={searchMemberNameCardtoggle}
                    value={isSearchMemberNameCard}
                />
            </View>
            <View style={styles.switchcontainer}>
                <Text style={styles.switchtext}>设置是否搜索群成员备注</Text>
                <Switch
                    trackColor={{ false: "#c0c0c0", true: "#81b0ff" }}
                    thumbColor={isSearchMemberRemark? "#2F80ED" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={searchMemberRemarktoggle}
                    value={isSearchMemberRemark}
                />
            </View>
            <CommonButton handler={() => searchGroupMembers()} content={'搜索群成员'}></CommonButton>
            <CodeComponent></CodeComponent>
        </>
    )
}

export default SearchGroupMembersComponent

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
    },
    userInputcontainer: {
        margin: 10,
        marginBottom: 0,
        marginTop: 1,
        justifyContent: 'center'
    },
    switchcontainer: {
        flexDirection: 'row',
        margin: 10
    },
    switchtext: {
        lineHeight: 35,
        marginRight: 8
    },
    selectContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 14,
        textAlignVertical: 'center',
        lineHeight: 35
    },
    buttonView: {
        backgroundColor: '#2F80ED',
        borderRadius: 3,
        width: 100,
        height: 35,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 35
    },
})