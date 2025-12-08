"use client";

import React from "react";
export default function Home() {
	const [taskTitle, setTaskTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [status, setStatus] = React.useState("Not Started");
	const [dueDate, setDueDate] = React.useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (taskTitle.trim() === "") {
			alert("Task Title is required");
			return;
		}
		if (dueDate && isNaN(Date.parse(dueDate))) {
			alert("Invalid Due Date");
			return;
		}
		if (dueDate && new Date(dueDate) < new Date()) {
			alert("Due Date cannot be in the past");
			return;
		}
		const res = await fetch(
			"http://localhost:5160/api/TaskItem/createTask",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: taskTitle,
					description,
					Taskstatus: status,
					dueDateTime: dueDate ? new Date(dueDate) : null,
				}),
			}
		);
		if (!res.ok) {
			alert("Failed to add task");
			return;
		}
		const data = await res.json();
		console.log(data.task);
		setTaskTitle("");
		setDescription("");
		setStatus("Not Started");
		setDueDate("");
		alert(
			"Task added successfully! \nTask ID: " +
				data.task.id +
				"\nTask Title: " +
				data.task.title +
				"\nDescription: " +
				data.task.description +
				"\nStatus: " +
				data.task.taskstatus +
				"\nDue Date: " +
				data.task.dueDateTime
		);
	};
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<h1 className="text-5xl font-extrabold text-zinc-900 dark:text-white sm:text-6xl">
					Add Task
				</h1>
				<form className="w-full mt-8">
					<div className="mb-4">
						<label
							className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
							htmlFor="task"
						>
							Task Title
						</label>
						<input
							value={taskTitle}
							onChange={(e) =>
								setTaskTitle(e.target.value)
							}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-zinc-800"
							id="task"
							type="text"
							placeholder="Enter task title"
							required
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) =>
								setDescription(e.target.value)
							}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-zinc-800"
							id="description"
							placeholder="Enter task description"
						></textarea>
					</div>
					<div className="text-xs text-zinc-500 mt-1">
						<label
							className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Task Status
						</label>
						<select
							value={status}
							onChange={(e) =>
								setStatus(e.target.value)
							}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-zinc-800"
							id="status"
							required
						>
							<option>Not Started</option>
							<option>InProgress</option>
							<option>Completed</option>
							<option>On Hold</option>
						</select>
					</div>
					<div className="text-xs text-zinc-500 mt-1">
						<label className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2">
							Due Date
						</label>
						<input
							value={dueDate}
							onChange={(e) =>
								setDueDate(e.target.value)
							}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-zinc-800"
							type="date"
						/>
					</div>
					<div className=" m-5 flex items-center justify-between">
						<button
							onClick={handleSubmit}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
						>
							Add Task
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
