from flask import Flask, jsonify, request, render_template
import random

app = Flask(__name__)

STUDENT_NAME = "Mama Binta"


@app.route("/")
def home():
    return render_template("index.html")


# ----------- LEÇONS -----------

@app.route("/lesson/addition")
def lesson_addition():
    return jsonify({
        "title": "Leçon d’addition ➕",
        "content": (
            "Additionner, c’est compter plusieurs choses ensemble.\n\n"
            "Exemple :\n"
            "Si tu as 2 bonbons et encore 3 bonbons,\n"
            "alors tu as 5 bonbons.\n\n"
            "2 + 3 = 5 🍬"
        )
    })


@app.route("/lesson/subtraction")
def lesson_subtraction():
    return jsonify({
        "title": "Leçon de soustraction ➖",
        "content": (
            "Soustraire, c’est enlever des choses.\n\n"
            "Exemple :\n"
            "Si tu as 5 bonbons et que tu en manges 2,\n"
            "il te reste 3 bonbons.\n\n"
            "5 - 2 = 3 🍬"
        )
    })


# ----------- EXERCICES -----------

@app.route("/math/exercise")
def math_exercise():
    a = random.randint(1, 20)
    b = random.randint(1, 20)
    return jsonify({
        "question": f"{STUDENT_NAME}, combien font {a} + {b} ?",
        "answer": a + b
    })


@app.route("/math/subtraction")
def math_subtraction():
    a = random.randint(5, 20)
    b = random.randint(1, a)
    return jsonify({
        "question": f"{STUDENT_NAME}, combien font {a} - {b} ?",
        "answer": a - b
    })


if __name__ == "__main__":
    app.run()
