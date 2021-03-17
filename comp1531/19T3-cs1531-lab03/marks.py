students = [
    {
        "name": "Matt",
        "homework": [90.0, 97.0, 75.0, 92.0],
        "quizzes": [88.0, 40.0, 94.0],
        "tests": [75.0, 90.0],
    },
    {
        "name": "Mich",
        "homework": [100.0, 92.0, 98.0, 100.0],
        "quizzes": [82.0, 83.0, 91.0],
        "tests": [89.0, 97.0],
    },
    {
        "name": "Mark",
        "homework": [0.0, 87.0, 75.0, 22.0],
        "quizzes": [0.0, 75.0, 78.0],
        "tests": [100.0, 100.0],
    }
]

def average(workType):
    total = 0
    counter = 0
    for work in students:
        for x in work[workType]:
            total += x
            counter += 1
    return total/counter

if __name__ == '__main__':
    print("Average homework mark:", average("homework"))
    print(f"Average quiz mark:", average("quizzes"))
    print(f"Average test mark:", average("tests"))