package unsw.dungeon.assets.trackers;

import javafx.collections.ObservableList;

import unsw.dungeon.assets.items.*;
import unsw.dungeon.assets.*;
import unsw.dungeon.assets.environment.*;
/**
 * This class is a static helper class that allows for the easy check of goals
 * completion. It is called from dungeon via trackEntities
 * 
 * Currently supporting completing subgoals of
 * - Killing all enemies
 * - Collecting all treasure
 * - Triggering all FloorSwitches (Not actively testing for yet)
 */

public final class EntityTracker {

    /**
     * public static method that allows for the checking of goals
     * If statements to check every single possible goal
     * 
     * @param entities list of entities in dungeon
     * @param dungeon is dungeon
     */
    public static void checkChange(ObservableList<Entity> entities, Dungeon dungeon) {
        
        // Filtering through possible goal completions
        Treasure treasureChecker = new Treasure(-1, -1);
        if (!existanceCheck(entities, treasureChecker)) {
            System.out.println("COLLECTED ALL TREASURE");
            dungeon.checkGoal("treasure");
        }
        Enemy enemyChecker = new Enemy(null, -1, -1);
        if (!existanceCheck(entities, enemyChecker)) {
            System.out.println("KILLED ALL ENEMIES");
            dungeon.checkGoal("enemies");
        }
        FloorSwitch switchCheck = new FloorSwitch(null, -1, -1, -1, -1);
        //if (!statusCheck(entities, switchCheck)) {
        if (!checkFloorSwitches(entities, switchCheck)) {
            System.out.println("ACTIVATED ALL SWITCHES");
            dungeon.checkGoal("boulders");

        } else {
            System.out.println("Still some switches not yet activated");
        }
    }

    /**
     * Checks if all floor switches have been activated in the dungeon
     * 
     * @param entities of type List<Entity> of entities that exist in the dungeon
     * @param check of type FloorSwitch 
     * @return true if all switches have been activated, else false
     */
    private static boolean checkFloorSwitches(ObservableList<Entity> entities, FloorSwitch check) {
        
        for (Entity e : entities) {

            if (e instanceof FloorSwitch) {
                FloorSwitch switchToCheck = (FloorSwitch) e;

                if (switchToCheck.activatedStatus() == false) {
                    System.out.println("An inactive switch was found! Still more to find activate!");
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * private static method to check for entity existance. 
     * 
     * @param entities list of entities to look in
     * @param checker is the instance to find in entities
     * 
     * @return true if alive/not completed. False if dead/completed
     */
    private static boolean existanceCheck(ObservableList<Entity> entities, Entity checker) {
        boolean status = false;
        
        if (checker instanceof Enemy) {
            for (Entity anEntity : entities) {
                if (anEntity instanceof Enemy) {
                    status = true;
                }
            } 
        } else if (checker instanceof Treasure) {
            for (Entity anEntity : entities) {
                if (anEntity instanceof Treasure) {
                    status = true;
                }
            }
        }
        return status;
    }
}
