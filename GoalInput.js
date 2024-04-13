import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, TextInput, Modal, Image, Text } from 'react-native';

function GoalInput(props) {
    const [goalText, setGoalText] = useState("");

    useEffect(() => {
        if (props.visible && props.editText) {
            setGoalText(props.editText);
        } else {
            setGoalText("");
        }
    }, [props.visible, props.editText]);

    function goalInputHandler(text) {
        setGoalText(text);
    }

    function handleAction() {
        if (props.editGoal) {
            props.editGoal(goalText);
        } else {
            props.addGoal(goalText);
        }
        setGoalText(""); // Clear input after adding/editing goal
        props.close(); // Close modal after adding/editing goal
    }

    return (
        <Modal visible={props.visible} animationType="fade">
            <View style={styles.inputContainer}>
                <Image source={require('./assets/goal.png')} style={styles.image} />
                <Text style={styles.label}>{props.editGoal ? 'Edit Your Goal' : 'Add Your Goal'}:</Text>
                <TextInput
                    placeholder={props.editGoal ? 'Edit Your goal' : 'Add Your goal'}
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={goalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title={props.editText ? 'Edit Goal' : 'Add Goal'} onPress={handleAction} color="#5e0acc" />
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.close} color="#f31282" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 20,
        flex: 1,
        backgroundColor: "#1A0037",
    },

    label: {
        color: "white",
        fontSize: 20,
        marginBottom: 10
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: '75%',
        height: 50,
        padding: 5,
        color: "black",
        fontSize: 16,
        backgroundColor: "#e4d0ff"
    },

    buttonContainer: {
        flexDirection: "row-reverse",
        gap: 20,
        marginTop: 20
    },

    button: {
        backgroundColor: "#5e0acc",
        width: 100,
        marginHorizontal: 8,
        borderRadius: 6
    },
    image: {
        width: 150, height: 120, margin: 20, padding: 20
    }
});

export default GoalInput;
