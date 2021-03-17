package unsw.enrolment;

public class Grade {
    private int mark;
    private String grade;

    public Grade(int mark) {
        this.mark = mark;
        setGrade();
    }

    public int getMark() {
        return this.mark;
    }

    public String setGrade() {
        if (mark < 50) {grade = "fail";}
        else if (mark >= 50 && mark < 65) {grade = "pass";}
        else if (mark >= 65 && mark < 75) {grade = "credit";}
        else if (mark >= 75 && mark < 85) {grade = "distinction";}
        else {grade = "high disctinction";}

        return grade;
    }
}
