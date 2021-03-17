package unsw.enrolment;

import java.util.ArrayList;
import java.util.List;

public class Assessment extends Mark{
    public static int assessNumber = 1;

    public int milestoneNumber = 1;
    protected ArrayList<Milestone> milestones;
    
    public Assessment() {
        super("ass" + Integer.toString(assessNumber));
        incrementAssess();
        this.mark = 0; // sets mark as 0 as it is incomplete
                       // or is assessment with milestone
                       
        this.milestones = new ArrayList<>();
    }

    // new milestone which is a subAssessment/submark
    // will also autoupdate the mark according to number of inputs given
    public void addMilestone(int mark) {
        Milestone nextMilestone = new Milestone(milestoneNumber, mark);
        this.incrementMilestone();
        milestones.add(nextMilestone);
        this.calcMark();
        setChanged();
        notifyObservers();
    }    

    public void calcMark() {
        if (milestones.size() == 1) {
            this.mark = milestones.get(0).getMark();
        } else {
            int total = 0;
            for (Milestone aMilestone : milestones) {
                total += aMilestone.getMark();
            }
            this.mark = total/milestones.size();
        }
        
    }

    public static void incrementAssess() {
        assessNumber++;
    }

    public void incrementMilestone() {
        this.milestoneNumber++;
    }
    
    public int getmilestoneNumber() {
        return milestoneNumber;
    }

    public int getLastMilestone() {
        return milestones.get(milestones.size() - 1).getMark();
    }
}