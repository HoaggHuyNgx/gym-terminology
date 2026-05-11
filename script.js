const workouts = [
  {
    day: 1,
    title: "Upper",
    type: "Upper",
    focus: "Lưng, ngực, vai và tay sau với 2 working sets mỗi bài.",
    duration: "~60 phút",
    intensity: "14 sets",
    note: "Tổng: 14 sets · ~60 phút",
    exercises: [
      ["Bent-over Barbell Row", "Barbell tự do", "2 × 6-8", "2"],
      ["Lat Pulldown", "Lat Pulldown Machine", "2 × 8-12", "2"],
      ["Incline DB Press", "Dumbbell + ghế nghiêng", "2 × 8-12", "2"],
      ["Pec Fly", "Rear Delt/Pec Fly Machine", "2 × 12-15", "1-2"],
      ["Shoulder Press", "Chest/Shoulder Press Machine", "2 × 8-12", "2-3"],
      ["Cable Lateral Raise", "Cable Machine", "2 × 12-20", "1-2"],
      ["Rope Triceps Pressdown", "Cable Machine", "2 × 10-15", "1-2"]
    ]
  },
  {
    day: 2,
    title: "Lower Posterior",
    type: "Lower",
    focus: "Posterior chain: deadlift, hip thrust, lunges, leg curl và core.",
    duration: "~55 phút",
    intensity: "12 sets",
    note: "Tổng: 12 sets · ~55 phút",
    exercises: [
      ["Stiff-leg Deadlift", "Barbell tự do", "2 × 6-8", "2"],
      ["Barbell Hip Thrust", "Barbell + bench", "2 × 8-10", "2"],
      ["Walking Lunges", "Dumbbell", "2 × 10-12/chân", "2"],
      ["Prone Leg Curl", "Prone Leg Curl Machine", "2 × 10-15", "1-2"],
      ["Hyperextension", "Hyperextension Bench", "2 × 10-15", "3"],
      ["Cable Crunch", "Cable Machine", "2 × 10-15", "2"]
    ]
  },
  {
    day: 3,
    title: "Rest + Zone 2",
    type: "Recovery",
    focus: "Cardio Zone 2 nhẹ, giãn cơ và mobility để hồi phục.",
    duration: "25-35 phút",
    intensity: "Zone 2",
    note: "Treadmill incline max 6km/h 25-35 phút hoặc Bike Zone 2.",
    exercises: [
      ["Treadmill Incline / Bike Zone 2", "Treadmill hoặc Bike", "25-35 phút", "-"],
      ["Hip Flexor Stretch", "Bodyweight", "2 × 45s/bên", "-"],
      ["Doorway Chest Stretch", "Bodyweight", "2 × 45s", "-"],
      ["Wall Slide", "Wall", "2 × 12", "-"],
      ["Forearm Stretch", "Bodyweight", "2 × 30s/bên", "-"],
      ["Child's Pose", "Bodyweight", "60s", "-"]
    ]
  },
  {
    day: 4,
    title: "Push",
    type: "Push",
    focus: "Ngực trên, chest press, vai giữa, Y-flies và tay sau.",
    duration: "~60 phút",
    intensity: "14 sets",
    note: "Tổng: 14 sets · ~60 phút",
    exercises: [
      ["Smith Incline Press", "Smith Machine", "2 × 6-10", "2"],
      ["Chest Press Machine", "Chest/Shoulder Press Machine", "2 × 8-12", "2"],
      ["Pec Fly", "Rear Delt/Pec Fly Machine", "2 × 12-15", "1-2"],
      ["Shoulder Press Machine", "Chest/Shoulder Press Machine", "2 × 8-12", "2-3"],
      ["Cable Lateral Raise", "Cable Machine", "2 × 12-20", "1-2"],
      ["Y-Flies DB", "Dumbbell + ghế 45°", "2 × 12-15", "2"],
      ["Overhead Cable Triceps", "Cable Machine", "2 × 10-15", "1-2"]
    ]
  },
  {
    day: 5,
    title: "Pull",
    type: "Pull",
    focus: "Pulldown, row, rear delt, face pull và biceps.",
    duration: "~60 phút",
    intensity: "14 sets",
    note: "Tổng: 14 sets · ~60 phút",
    exercises: [
      ["Lat Pulldown", "Lat Pulldown Machine", "2 × 8-12", "2"],
      ["Seated Cable Row", "Seated Row Machine", "2 × 8-12", "2"],
      ["DB One-Arm Row", "Dumbbell + bench", "2 × 8-12", "2"],
      ["Straight-Arm Cable Pulldown", "Cable Machine", "2 × 12-15", "2"],
      ["Rear Delt Fly", "Rear Delt/Pec Fly Machine", "2 × 12-20", "1-2"],
      ["Face Pull", "Cable Machine", "2 × 15-20", "2-3"],
      ["Biceps Curl DB", "Dumbbell", "2 × 10-15", "2"]
    ]
  },
  {
    day: 6,
    title: "Legs",
    type: "Legs",
    focus: "Leg press, Smith squat, leg extension/curl và core side plank.",
    duration: "~65 phút",
    intensity: "14 sets",
    note: "Tổng: 14 sets · ~65 phút",
    exercises: [
      ["Leg Press", "Leg Press Machine", "2 × 10-15", "2"],
      ["Smith Squat", "Smith Machine", "2 × 8-12", "2"],
      ["Leg Extension", "Leg Extension Machine", "2 × 12-15", "1-2"],
      ["Leg Curl", "Leg Curl Machine", "2 × 10-15", "1-2"],
      ["Bulgarian Split Squat", "Dumbbell + bench", "2 × 8-10/chân", "2"],
      ["Hyperextension", "Hyperextension Bench", "2 × 10-15", "3"],
      ["Side Plank", "Bodyweight", "2 × 30-45s/bên", "-"]
    ]
  }
];

const state = {
  activeDay: 1,
  complete: JSON.parse(localStorage.getItem("hoang-huy-complete-v4") || "{}"),
  timerTotal: 90,
  timerLeft: 90,
  timerId: null
};

const scheduleGrid = document.querySelector("#scheduleGrid");
const dayTabs = document.querySelector("#dayTabs");
const activeDayName = document.querySelector("#activeDayName");
const activeDayFocus = document.querySelector("#activeDayFocus");
const activeDayType = document.querySelector("#activeDayType");
const activeWorkoutTitle = document.querySelector("#activeWorkoutTitle");
const activeWorkoutNote = document.querySelector("#activeWorkoutNote");
const exerciseRows = document.querySelector("#exerciseRows");
const completeToggle = document.querySelector("#completeToggle");
const weekProgressText = document.querySelector("#weekProgressText");
const weekProgressBar = document.querySelector("#weekProgressBar");
const timerDisplay = document.querySelector("#timerDisplay");
const timerStart = document.querySelector("#timerStart");
const timerReset = document.querySelector("#timerReset");

function renderSchedule() {
  scheduleGrid.innerHTML = workouts
    .map(
      (workout) => `
        <button class="day-card ${workout.day === state.activeDay ? "is-active" : ""}"
          data-day="${workout.day}" data-type="${workout.type}" type="button">
          <span class="day-number">Ngày ${workout.day}</span>
          <h3>${workout.title}</h3>
          <p>${workout.focus}</p>
          <span class="chip-row">
            <span class="chip">${workout.duration}</span>
            <span class="chip">${workout.intensity}</span>
            <span class="chip ${workout.type === "Recovery" ? "orange" : ""}">${workout.type}</span>
          </span>
        </button>
      `
    )
    .join("");

  scheduleGrid.querySelectorAll(".day-card").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveDay(Number(button.dataset.day), true);
    });
  });
}

function renderTabs() {
  dayTabs.innerHTML = workouts
    .map(
      (workout) => `
        <button class="day-tab ${workout.day === state.activeDay ? "is-active" : ""}"
          data-day="${workout.day}" type="button" role="tab"
          aria-selected="${workout.day === state.activeDay}">
          D${workout.day}
        </button>
      `
    )
    .join("");

  dayTabs.querySelectorAll(".day-tab").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveDay(Number(button.dataset.day), false);
    });
  });
}

function renderWorkout() {
  const workout = workouts.find((item) => item.day === state.activeDay);

  activeDayName.textContent = `Ngày ${workout.day}`;
  activeDayFocus.textContent = workout.focus;
  activeDayType.textContent = workout.type;
  activeWorkoutTitle.textContent = workout.title;
  activeWorkoutNote.textContent = workout.note;
  completeToggle.checked = Boolean(state.complete[workout.day]);

  exerciseRows.innerHTML = workout.exercises
    .map(
      ([name, equipment, prescription, rir]) => `
        <tr>
          <td data-label="Bài">${name}</td>
          <td data-label="Máy / Thiết bị">${equipment}</td>
          <td data-label="Sets × Reps">${prescription}</td>
          <td data-label="RIR">${rir}</td>
        </tr>
      `
    )
    .join("");

  updateProgress();
}

function updateProgress() {
  const completed = workouts.filter((workout) => state.complete[workout.day]).length;
  const percent = Math.round((completed / workouts.length) * 100);
  weekProgressText.textContent = `${completed}/${workouts.length}`;
  weekProgressBar.style.width = `${percent}%`;
}

function setActiveDay(day, scrollToWorkout) {
  state.activeDay = day;
  renderSchedule();
  renderTabs();
  renderWorkout();
  resetTimer();

  if (scrollToWorkout) {
    document.querySelector("#workout").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function persistCompletion() {
  localStorage.setItem("hoang-huy-complete-v4", JSON.stringify(state.complete));
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(state.timerLeft);
}

function startTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
    timerStart.textContent = "Start";
    return;
  }

  timerStart.textContent = "Pause";
  state.timerId = setInterval(() => {
    state.timerLeft -= 1;
    updateTimerDisplay();

    if (state.timerLeft <= 0) {
      resetTimer();
    }
  }, 1000);
}

function resetTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
  }

  state.timerId = null;
  state.timerLeft = state.timerTotal;
  timerStart.textContent = "Start";
  updateTimerDisplay();
}

completeToggle.addEventListener("change", () => {
  state.complete[state.activeDay] = completeToggle.checked;
  persistCompletion();
  updateProgress();
});

timerStart.addEventListener("click", startTimer);
timerReset.addEventListener("click", resetTimer);

renderSchedule();
renderTabs();
renderWorkout();
updateTimerDisplay();
