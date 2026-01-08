from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

STUDENT_NAME = "Mama Binta"


# ---------------- LEÇONS ----------------

addition_lessons = [
    "Additionner, c’est réunir des choses.\n\n2 pommes 🍎 + 3 pommes 🍎 = 5 pommes",
    "Si tu as 1 jouet 🧸 et encore 4 jouets 🧸, tu as 5 jouets.",
    "3 bonbons 🍬 + 2 bonbons 🍬 = 5 bonbons"
]

subtraction_lessons = [
    "Soustraire, c’est enlever.\n\n5 pommes 🍎 - 2 pommes 🍎 = 3 pommes",
    "Tu as 6 bonbons 🍬 et tu en manges 1.\nIl reste 5 bonbons.",
    "4 jouets 🧸 - 2 jouets 🧸 = 2 jouets"
]


# ---------------- ROUTES ----------------

@app.route("/")
def home():
    return render_template("index.html")


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


# ---------------- EXERCICES ----------------

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
