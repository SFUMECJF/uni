#Added datetime module to get current year instead of it being static/rigid
import datetime

class Student:
    def __init__(self, firstName, lastName, birth_year):
        self.name = firstName + " " + lastName
        self.birth_year = birth_year

if __name__ == '__main__':
    s = Student("Rob", "Everest", 1961)
    now = datetime.datetime.now()
    years_old = now.year - s.birth_year
    print(f"{s.name} is {years_old} old")
