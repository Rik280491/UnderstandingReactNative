import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	ScrollView,
	FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const [courseGoals, setCourseGoals] = useState([]);

	const addGoalHandler = (goalTitle) => {
		setCourseGoals((currentGoals) => [
			...currentGoals,
			{ id: Math.random().toString(), value: goalTitle },
		]);
	};

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.id !== goalId);
		});
	};

	return (
		// every View uses flexbox by default
		<View style={styles.screen}>
			<GoalInput onAddGoal={addGoalHandler} />
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
