import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import GoalItem from './GoalItem';
import GoalInput from './GoalInput';
import { StatusBar } from 'expo-status-bar';
import { AsyncStorage } from 'react-native';


export default function App() {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const addGoalHandler = (goalText) => {
    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = goalText;
      setList(updatedList);
      setEditIndex(null);
    } else {
      setList((prevList) => [...prevList, goalText]);
    }
    setIsModalOpen(false);
    setEditText('');
  };

  const deleteGoalHandler = (index) => {
    const remaining = list.filter((_, i) => i !== index);
    setList(remaining);
  };

  const editGoalHandler = (index, goalText) => {
    setEditIndex(index);
    setIsModalOpen(true);
    setEditText(goalText);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setEditText('');
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Text style={styles.title}>Goals of your day...!</Text>
        <Button title='Add New Goal' onPress={openModal} color="#A070D6" />

        <GoalInput
          visible={isModalOpen}
          addGoal={addGoalHandler}
          editIndex={editIndex}
          editText={editText}
          close={closeModal}
        />

        <View style={styles.goalsContainer}>
          <Text style={styles.subtitle}>List of goals</Text>
          <FlatList
            data={list}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>No goals for today!</Text>
            )}
            renderItem={({ item, index }) => (
              <GoalItem
                text={item}
                deleteGoal={() => deleteGoalHandler(index)}
                editGoal={() => editGoalHandler(index, item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1A0037"
  },

  title: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "white"
  },

  subtitle: {
    textAlign: "left",
    fontSize: 18,
    marginBottom: 10,
    color: "#f31282",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "red"
  },

  goalsContainer: {
    paddingTop: 10,
    flex: 6
  },

  emptyListText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});
