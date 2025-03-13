<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

const name = 'Jane Doe';
const status = ref('inactive');
const tasks = ref(['one', 'two', 'three']);
const newTask = ref('');

const toggleStatus = () => {
	if (status.value === 'inactive') {
		status.value = 'pending';
	} else if (status.value === 'pending') {
		status.value = 'active';
	} else {
		status.value = 'inactive';
	}
};

const addTask = () => {
	tasks.value = [...tasks.value, newTask.value];
	newTask.value = '';
};

onBeforeMount(async () => {
	console.log('on before mount');
});

onMounted(async () => {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const data = await response.json();
		tasks.value = data.map((task) => task.title);
	} catch (error) {
		console.log('error: ', error);
	}
});
</script>

<template>
	<div class="flex">
		<div>
			<h1>Hello {{ name }}</h1>
			<p v-if="status === 'active'">User is active</p>
			<p v-else-if="status === 'pending'">User is pending</p>
			<p v-else>User is inactive</p>
			<!-- <button v-on:click="toggleStatus">Toggle Status</button> -->
			<button @click="toggleStatus">Toggle Status</button>
		</div>
		<div>
			<form @submit.prevent="addTask">
				<label for="newTask">Add Task</label>
				<input type="text" id="newTask" name="newTask" v-model="newTask" />
				<button type="submit">Add Task</button>
			</form>

			<h3>Tasks:</h3>
			<ul>
				<li v-for="(task, index) in tasks" :key="task">{{ task }}</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.flex {
	display: flex;
	flex-direction: column;
}
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
