package unsw.enrolment;

import java.util.Observable;

public abstract class Mark extends Observable{
    protected String name;

    protected int mark;

    public Mark(String name) {
        this.name = name;
        this.mark = 0;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    public int getMark() {
        return this.mark;
    }

    public String getName() {
        return this.name;
    }

}