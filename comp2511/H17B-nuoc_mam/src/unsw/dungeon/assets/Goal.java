package unsw.dungeon.assets;

import java.util.List;
import java.util.concurrent.*;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;

/**
 * Class for storing goals and determining their type
 * Supports all advanced goals given the proper structure of JSON goals are correctly
 */
public class Goal {
    public String mainGoal;
    public BooleanProperty mainGoalComplete;
    public boolean subGoalComplete;
    public CopyOnWriteArrayList<String> subGoals;
    public boolean andMainState;

    /**
     * Constructor class for Goal
     * 
     * If a Goal contains no sub goals, it will state subgoals as false
     * 
     * @param mainGoal of type String of the main goal for the dungeon
     * @param subGoalStatus of type boolean if there exists subgoals
     * @param subGoals of type List<String> if there exists subgoals
     */
    public Goal(String mainGoal, boolean subGoalStatus, List<String> dudsubGoals, boolean andMainState) {
        this.mainGoal = mainGoal;
        this.mainGoalComplete = new SimpleBooleanProperty(false);
        this.subGoalComplete = subGoalStatus;
        this.subGoals = new CopyOnWriteArrayList<String>();
        if (dudsubGoals == null) {
            this.subGoals = null;
        } else {
            this.subGoals.addAll(dudsubGoals);
        }
        
        System.out.println(this.subGoals);
        this.andMainState = andMainState;
    }

    /**
     * Check to see if all goals have been completed
     * 
     * @param goal of type String of the goal to check
     * @return of type boolean if goals have been met.
     */
    public boolean checkGoal(String goal) {
        if (this.mainGoal.equals(goal)) {
            if (this.hasCompletedSubGoal()) { // all subgoals have been completed.
                this.mainGoalComplete.set(true);
            } else {
                this.mainGoalComplete.set(false);
            }

        } else {
            System.out.println("Checking subgoals for: " + goal);
            completeSubGoal(goal);
            if (mainGoal.equals("AND") && subGoals.isEmpty()) {
                mainGoalComplete.set(true);
            } else if (mainGoal.equals("OR") && hasCompletedSubGoal()) {
                mainGoalComplete.set(true);
            } 
        }

        return mainGoalComplete.get();
    }

    /**
     * Check if sub goals have been completed
     * 
     * @return of type boolean if sub goals have been completed.
     */
    public boolean hasCompletedSubGoal() {
        return subGoalComplete;
    }

    public BooleanProperty getMainGoal() {
        return this.mainGoalComplete;
    }

    /**
     * Check to see if sub goals have been completed
     * 
     * @param subGoal of type String name of sub goal
     */
    public void completeSubGoal(String subGoal) {

        if (this.subGoals == null) {
            return; // No sub goals exists
        }
        // something is not right here... 
        // current logic states if a subgoal is found (even if it's just one), 
        // all sub goals become completed. this is only true if main goal was an OR.
        // doesn't work with main goal is an AND.
        // correct logic: find sub goal and mark it as true somehow... other sub goals are 
        // still incomplete hence false.
        for (String subGoalName : subGoals) {
            if (subGoal.equals(subGoalName)) {
                subGoals.remove(subGoalName);
                if (subGoals.isEmpty() || andMainState == false) {
                    this.subGoalComplete = true;
                    System.out.println("COMPLETED");
                }
            }
        } 
    }
}