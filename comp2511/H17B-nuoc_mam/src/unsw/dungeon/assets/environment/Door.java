package unsw.dungeon.assets.environment;

import unsw.dungeon.assets.*;

/**
 * An entity for the door in the dungeon
 * 
 * Is an object that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Door extends Entity implements SoundEntity{

    private int doorID;
    private boolean lockStatus;
    //private int doorID; // will need identifier if we have multiple doors

    public Door(int x, int y, int doorID) {
        super(x, y);
        this.lockStatus = true;
        this.doorID = doorID;
        this.setimagepath("images/closed_door.png");
    }
    
    /**
     * Status of door being locked or unlocked
     * 
     * @return status of type boolean
     */
    public boolean isLocked() {
        return lockStatus;
    }
    
    /**
     * sets the lock status based on the boolean status
     * @param status the status to be set on the door
     */
    public void setLockStatus(boolean status) {
        this.lockStatus = status;
        playSound();
        if (lockStatus == false) {
            this.setimagepath("images/open_door.png");
        } else {
            this.setimagepath("images/closed_door.png");
        }
    }


    // Unlocks the door (usually for keys)
    public void unlockDoor() {
        this.lockStatus = false;
        playSound();
        this.setimagepath("images/open_door.png");
    }

    // returns doorID affiliated with KEYID
    public int getdoorID() {
        return this.doorID;
    }

    @Override
    public void playSound() {
        Sound.playDoor();
    }
    
}