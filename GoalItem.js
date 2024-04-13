import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function GoalItem(props) {
    const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState(false);

    function deleteBtnHandler() {
        setIsDeleteBtnVisible(!isDeleteBtnVisible);
    }

    return (
        <Pressable
            onPress={deleteBtnHandler}>
            <View style={styles.goalItem}>
                <View style={styles.goalItemTextContainer}>
                    <Text style={styles.goalItemText}>{props.text}</Text>
                    {isDeleteBtnVisible && <View style={styles.btnContainer}>
                        <Pressable
                            onPress={props.deleteGoal}
                            style={({ pressed }) =>
                                pressed && styles.pressItem
                            }>
                            <View style={styles.btn}>
                                <Text style={{ color: "white" }}>
                                    <MaterialCommunityIcons name="delete" size={25} color="white" />
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => props.editGoal(props.text, props.index)}>
                            <View style={styles.btn}>
                                <Text style={{ color: "white" }}>
                                    <MaterialCommunityIcons name="pencil" size={25} color="white" />
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                    }
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    goalItem: {
        borderRadius: 6,
        marginTop: 15,
        backgroundColor: "#5e0acc",
    },

    goalItemTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding:6
    },

    btnContainer: {
        justifyContent: "space-between",
        flexDirection: "row"
    },

    btn: {
        marginRight: 10,
        borderWidth: 0,
        padding: 10,
        backgroundColor: "#A070D6",
        borderRadius: 7
    },

    goalItemText: {
        margin: 6,
        padding: 8,
        color: "white"
    },

    pressItem: {
        backgroundColor: "#dddd",
        opacity: 0.2,
        borderRadius: 6,
    }
});

export default GoalItem;
