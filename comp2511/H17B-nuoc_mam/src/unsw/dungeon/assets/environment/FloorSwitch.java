package unsw.dungeon.assets.environment;

import unsw.dungeon.assets.*;

/**
 * An entity for floor switches
 * 
 * Is an object that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class FloorSwitch extends Entity implements SoundEntity{

    public Entity trigger; 
    public Dungeon dungeon;
    public boolean activated;
    
    /**
     * Floorswitch constructor 
     * 
     * @param dungeon of type Dungeon of the current dungeon
     * @param x of type int X coordinate of floor switch
     * @param y of type int Y coordinate of floor switch
     * @param tX of type int X coordinate of floor switch trigger target
     * @param tY of type int Y coordinate of floor switch trigger target
     */
    public FloorSwitch(Dungeon dungeon, int x, int y, int tX, int tY) {
        super(x, y);
        
        // for goal testing purposes
        // dummy trigger value. No trigger is really set.
        if (dungeon != null) {
            this.trigger = dungeon.getEntity(tX, tY).get(0);
            System.out.println("Switch Trigger is: " 
                + dungeon.getEntity(tX, tY).get(0).getimagePath());
        }
        
        this.setimagepath("images/pressure_plate.png");
        this.activated = false;
    }   

    /**
     * Activates the floor switch status
     * Also checks if it has triggered anything
     * 
     * @param status of type boolean
     */
    public void setSwitch(boolean status) {

        if (trigger instanceof Wall) {
            System.out.println("I'm a wall... I trigger nothing!");

        } else if (trigger instanceof Door) {
            Door door = (Door) trigger;
            System.out.println("Trigger was a door. You opened it");

            // Makes sure that the door stays open
            if (status) {
                door.setLockStatus(false);
            }
        }
        this.activated = status;  
    }

    // returns the current status of the switch
    public boolean activatedStatus() {
        return this.activated;
    }

    // plays the sound of the switch being activated
    @Override
    public void playSound() {
        Sound.playSwitch();
    }
    
}