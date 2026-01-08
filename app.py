from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

STUDENT_NAME = "Mama Binta"

# ---------------- LECTURE ----------------

alphabet_lessons = [
    "La lettre A se prononce « a » comme Avion ✈️",
    "La lettre B se prononce « be » comme Banane 🍌",
    "La lettre C se prononce « ce » comme Chat 🐱",
    "La lettre D se prononce « de » comme Dent 🦷"
]

reading_exercises = [
    {"question": "Quelle syllabe fait « ba » ?", "choices": ["ba", "da", "ma"], "answer": "ba"},
    {"question": "Quelle syllabe fait « ma » ?", "choices": ["na", "ma", "la"], "answer": "ma"}
]

# ---------------- ÉCRITURE ----------------

writing_exercises = [
    {
        "question": "Complète le mot : B _ N A N E 🍌",
        "choices": ["A", "O", "E"],
        "answer": "A"
    },
    {
        "question": "Complète le mot : C H _ T 🐱",
        "choices": ["A", "O", "E"],
        "answer": "A"
    },
    {
        "question": "Complète le mot : M _ I S O N 🏠",
        "choices": ["A", "E", "A"],
        "answer": "A"
    }
]

# ---------------- MATHS ----------------

addition_exercises = [
    lambda: (random.randint(1, 10), random.randint(1, 10))
]

subtraction_exercises = [
    lambda: (random.randint(5, 15), random.randint(1, 5))
]

# ---------------- ROUTES ----------------

@app.route("/")
def home():
    return render_template("index.html")

# -------- LECTURE --------

@app.route("/lesson/reading")
def lesson_reading():
    return jsonify({
        "title": "Leçon de lecture 📖",
        "content": random.choice(alphabet_lessons)
    })


@app.route("/exercise/reading")
def exercise_reading():
    return jsonify(random.choice(reading_exercises))


# -------- ÉCRITURE --------

@app.route("/exercise/writing")
def exercise_writing():
    return jsonify(random.choice(writing_exercises))


# -------- MATHS --------

@app.route("/math/addition")
def math_addition():
    a, b = random.choice(addition_exercises)()
    return jsonify({
        "question": f"{STUDENT_NAME} a {a} pommes 🍎 et reçoit {b}. Combien a-t-elle ?",
        "answer": a + b
    })


@app.route("/math/subtraction")
def math_subtraction():
    a, b = random.choice(subtraction_exercises)()
    return jsonify({
        "question": f"{STUDENT_NAME} a {a} bonbons 🍬 et en mange {b}. Combien reste-t-il ?",
        "answer": a - b
    })


if __name__ == "__main__":
    app.run()
