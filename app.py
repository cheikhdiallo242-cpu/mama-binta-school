from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

STUDENT_NAME = "Mama Binta"

# ---------------- LECTURE : DONNÉES ----------------

alphabet_lessons = [
    "La lettre A se prononce « a » comme Avion ✈️",
    "La lettre B se prononce « be » comme Banane 🍌",
    "La lettre C se prononce « ce » comme Chat 🐱",
    "La lettre D se prononce « de » comme Dent 🦷"
]

syllable_exercises = [
    {"question": "Quelle syllabe fait le son « ba » ?", "choices": ["ba", "da", "ma"], "answer": "ba"},
    {"question": "Quelle syllabe fait le son « be » ?", "choices": ["bi", "be", "bo"], "answer": "be"},
    {"question": "Quelle syllabe fait le son « ma » ?", "choices": ["na", "la", "ma"], "answer": "ma"},
]

# ---------------- MATHS : DONNÉES ----------------

addition_lessons = [
    "Additionner, c’est réunir des choses.\n\n2 pommes 🍎 + 3 pommes 🍎 = 5 pommes",
    "3 bonbons 🍬 + 2 bonbons 🍬 = 5 bonbons"
]

subtraction_lessons = [
    "Soustraire, c’est enlever.\n\n5 pommes 🍎 - 2 pommes 🍎 = 3 pommes",
    "4 jouets 🧸 - 1 jouet 🧸 = 3 jouets"
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
    ex = random.choice(syllable_exercises)
    return jsonify(ex)


# -------- MATHS --------

@app.route("/lesson/addition")
def lesson_addition():
    return jsonify({
        "title": "Leçon d’addition ➕",
        "content": random.choice(addition_lessons)
    })


@app.route("/lesson/subtraction")
def lesson_subtraction():
    return jsonify({
        "title": "Leçon de soustraction ➖",
        "content": random.choice(subtraction_lessons)
    })


@app.route("/math/addition")
def math_addition():
    a = random.randint(1, 10)
    b = random.randint(1, 10)
    return jsonify({
        "question": f"{STUDENT_NAME} a {a} pommes 🍎 et reçoit {b} pommes 🍎. Combien a-t-elle ?",
        "answer": a + b
    })


@app.route("/math/subtraction")
def math_subtraction():
    a = random.randint(5, 15)
    b = random.randint(1, a)
    return jsonify({
        "question": f"{STUDENT_NAME} a {a} bonbons 🍬 et en mange {b}. Combien reste-t-il ?",
        "answer": a - b
    })


if __name__ == "__main__":
    app.run()
