package unsw.dungeon.assets.environment;

import java.util.List;

import unsw.dungeon.assets.*;
/**
 * An entity for the door in the dungeon
 * 
 * Is a movable object that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Boulder extends Entity implements SoundEntity {

    public Boulder(Dungeon dungeon, int x, int y) {
        super(x, y);
        // set entity as movable
        this.movable = new Movable(this, dungeon);
        this.setimagepath("images/boulder.png");
    }
    
    /**
     * Calls moveEntity command if entity is movable.
     * ensures the trigger from current x y is turned off before move so
     * trigger is not left on
     * @param x int to move entity by x axis
     * @param y int to move entity by y axis
     */
    public void move(int x, int y) {
        checkTrigger(false);
        playSound();
        movable.moveEntity(x, y);
        checkTrigger(true);
    }

    /**
     * Function that checks whether the boulder is situated on the same
     * coordinates as a floorswitch
     * 
     * Will activate switch if that is the fact
     */
    public void checkTrigger(boolean status) {
        List<Entity> entityList = this.movable.dungeon.getEntity(getX(), getY());
        
        for (Entity anEntity : entityList) {
            if (anEntity instanceof FloorSwitch) {
                FloorSwitch floorSwitch = (FloorSwitch)anEntity;
                floorSwitch.setSwitch(status);
                movable.dungeon.updateGoalStatus();
            }
        }
    }
    
    // plays boulder sound
    @Override
    public void playSound() {
        Sound.playBoulderMove();
    }

}