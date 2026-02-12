let activities = JSON.parse(localStorage.getItem("activities")) || [];

function saveData() {
    localStorage.setItem("activities", JSON.stringify(activities));
}

function addActivity() {
    const steps = parseInt(document.getElementById("stepsInput").value) || 0;
    const calories = parseInt(document.getElementById("caloriesInput").value) || 0;
    const workout = parseInt(document.getElementById("workoutInput").value) || 0;

    if (steps === 0 && calories === 0 && workout === 0) {
        alert("Please enter at least one value.");
        return;
    }

    const activity = {
        date: new Date().toLocaleDateString(),
        steps,
        calories,
        workout
    };

    activities.push(activity);
    saveData();
    updateUI();
    clearInputs();
}

function clearInputs() {
    document.getElementById("stepsInput").value = "";
    document.getElementById("caloriesInput").value = "";
    document.getElementById("workoutInput").value = "";
}

function updateUI() {
    let totalSteps = 0;
    let totalCalories = 0;
    let totalWorkout = 0;

    const today = new Date().toLocaleDateString();

    const activityList = document.getElementById("activityList");
    activityList.innerHTML = "";

    activities.forEach(activity => {
        if (activity.date === today) {
            totalSteps += activity.steps;
            totalCalories += activity.calories;
            totalWorkout += activity.workout;
        }

        const li = document.createElement("li");
        li.textContent = `${activity.date} - Steps: ${activity.steps}, Calories: ${activity.calories}, Workout: ${activity.workout} min`;
        activityList.appendChild(li);
    });

    document.getElementById("totalSteps").textContent = totalSteps;
    document.getElementById("totalCalories").textContent = totalCalories;
    document.getElementById("totalWorkout").textContent = totalWorkout;

    document.getElementById("stepsProgress").style.width = Math.min((totalSteps / 10000) * 100, 100) + "%";
    document.getElementById("caloriesProgress").style.width = Math.min((totalCalories / 500) * 100, 100) + "%";
    document.getElementById("workoutProgress").style.width = Math.min((totalWorkout / 120) * 100, 100) + "%";
}

updateUI();
