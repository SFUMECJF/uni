package unsw.enrolment;

public class Exam extends Mark {
    public Exam(String name) {
        super(name);
        this.setMark(0);

    }

    @Override
    public void setMark(int mark) {
        this.mark = mark;
        setChanged();
        notifyObservers();
    }
}