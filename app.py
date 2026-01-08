from flask import Flask, jsonify, request, render_template
import random

app = Flask(__name__)

STUDENT_NAME = "Mama Binta"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/math/lesson")
def math_lesson():
    return jsonify({
        "title": "Addition",
        "lesson": "Additionner, c’est compter plusieurs choses ensemble.",
        "example": "Exemple : 2 + 3 = 5"
    })


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


@app.route("/math/check", methods=["POST"])
def math_check():
    data = request.json
    if int(data["user_answer"]) == int(data["correct_answer"]):
        return jsonify({
            "result": "Bravo Mama Binta 🎉 Tu as bien travaillé !"
        })
    else:
        return jsonify({
            "result": "Ce n’est pas grave 😊 Réessaie encore."
        })


if __name__ == "__main__":
    app.run()
