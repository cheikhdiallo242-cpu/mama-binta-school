from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

STUDENT_NAME = "Mama Binta"

# ================= LECTURE =================

alphabet_lessons = [
    "La lettre A fait le son « a » comme Avion ✈️",
    "La lettre B fait le son « be » comme Banane 🍌",
    "La lettre M fait le son « me » comme Maman 👩",
    "La lettre L fait le son « le » comme Livre 📘"
]

reading_exercises = [
    {"question": "Quelle syllabe fait « ba » ?", "choices": ["ba", "da", "ta"], "answer": "ba"},
    {"question": "Quelle syllabe fait « ma » ?", "choices": ["la", "ma", "na"], "answer": "ma"},
    {"question": "Quelle syllabe fait « le » ?", "choices": ["li", "le", "lo"], "answer": "le"}
]

# ================= ÉCRITURE =================

writing_exercises = [
    {"question": "Complète : É _ O L E 🏫", "choices": ["C", "K", "S"], "answer": "C"},
    {"question": "Complète : C A H I _ R 📘", "choices": ["E", "A", "O"], "answer": "E"},
    {"question": "Complète : M A M A N 👩", "choices": ["M", "N", "L"], "answer": "M"},
    {"question": "Complète : F A M I _ L E 👨‍👩‍👧", "choices": ["L", "N", "R"], "answer": "L"},
    {"question": "Complète : C R A Y O _ ✏️", "choices": ["N", "M", "R"], "answer": "N"},
    {"question": "Complète : S A _ L E 🏖️", "choices": ["B", "M", "L"], "answer": "B"},
    {"question": "Complète : T A B L _ 🪑", "choices": ["E", "A", "I"], "answer": "E"},
    {"question": "Complète : É C O L I _ R 🎒", "choices": ["E", "A", "R"], "answer": "E"}
]

# ================= MATHS (SCOLAIRES) =================

math_addition_problems = [
    lambda: (7, 3, "crayons ✏️"),
    lambda: (4, 5, "enfants 👧🧒"),
    lambda: (6, 2, "bonbons 🍬"),
    lambda: (3, 6, "livres 📚")
]

math_subtraction_problems = [
    lambda: (9, 4, "pommes 🍎"),
    lambda: (8, 3, "crayons ✏️"),
    lambda: (10, 5, "bonbons 🍬"),
    lambda: (7, 2, "balles ⚽")
]

# ================= ROUTES =================

@app.route("/")
def home():
    return render_template("index.html")

# ----- Lecture -----

@app.route("/lesson/reading")
def lesson_reading():
    return jsonify({
        "title": "Lecture 📖",
        "content": random.choice(alphabet_lessons)
    })

@app.route("/exercise/reading")
def exercise_reading():
    return jsonify(random.choice(reading_exercises))

# ----- Écriture -----

@app.route("/exercise/writing")
def exercise_writing():
    return jsonify(random.choice(writing_exercises))

# ----- Maths -----

@app.route("/math/addition")
def math_addition():
    a, b, item = random.choice(math_addition_problems)()
    return jsonify({
        "question": f"{STUDENT_NAME} a {a} {item}. Elle en reçoit {b}. Combien a-t-elle ?",
        "answer": a + b
    })

@app.route("/math/subtraction")
def math_subtraction():
    a, b, item = random.choice(math_subtraction_problems)()
    return jsonify({
        "question": f"{STUDENT_NAME} a {a} {item}. Elle en donne {b}. Combien reste-t-il ?",
        "answer": a - b
    })

if __name__ == "__main__":
    app.run()
