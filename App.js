import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const [courseGoals, setCourseGoals] = useState([]);
	const [isAddMode, setIsAddMode] = useState(false);

	const addGoalHandler = (goalTitle) => {
		if (goalTitle.length === 0) {
			return;
		}
		setCourseGoals((currentGoals) => [
			...currentGoals,
			{ id: Math.random().toString(), value: goalTitle },
		]);
		setIsAddMode(false);
	};

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.id !== goalId);
		});
	};

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
	};

	return (
		// every View uses flexbox by default
		<View style={styles.screen}>
			<Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
			<GoalInput
				visible={isAddMode}
				onAddGoal={addGoalHandler}
				onCancel={cancelGoalAdditionHandler}
			/>
			{/* unlike web, RN not scrollable by default. Use ScrollView for this behaviour */}
			{/* However, with ScrollView all items are loaded incl those not on the screen. FlatList is better for performance */}
			<FlatList
				keyExtractor={(item, index) => item.id}
				data={courseGoals}
				renderItem={(itemData) => (
					<GoalItem
						id={itemData.item.id}
						onDelete={removeGoalHandler}
						goalTitle={itemData.item.value}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 50,
	},
});
