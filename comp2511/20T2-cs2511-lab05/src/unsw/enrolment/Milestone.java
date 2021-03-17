package unsw.enrolment;


public class Milestone extends Mark{
    public Milestone(int milestoneNumber, int mark) {
        super("milestone" + Integer.toString(milestoneNumber));
        this.setMark(mark);
        setChanged();
        notifyObservers();
    }
}