package unsw.dungeon.assets.items;

import javafx.beans.property.SimpleIntegerProperty;
import unsw.dungeon.assets.*;

import javafx.beans.property.IntegerProperty;

/**
 * An entity for the sword in the dungeon
 * 
 * Is an object that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Sword extends Entity implements SoundEntity{

    private IntegerProperty durability;

    public Sword(int x, int y) {
        super(x, y);
        this.setimagepath("images/greatsword_1_new.png");
        this.durability = new SimpleIntegerProperty(5);
    }

    /**
     * Method to check if a sword can be used
     * 
     * @return True if it has not reached 0 usage, otherwise false.
     */
    public boolean canUse() {

        int swordDurability = this.durability.get();
        if (swordDurability != 0) {
            return true;
        }
        return false;
    }
    
    // returns the durability of the sword
    public int getDurability() {
        return this.durability.get();
    }

    // reduces the current durability of the sword by 1 (total of 5)
    public void attack() {
        this.durability.set(durability.get() - 1);;
    }

    public void resetSword() {
        this.durability.set(5);;
    }
    public IntegerProperty getTrackDurability() {
        return this.durability;
    }
    // plays the sound of the sword being picked up
    @Override
    public void playSound() {
        Sound.playGetSword();
    }

}