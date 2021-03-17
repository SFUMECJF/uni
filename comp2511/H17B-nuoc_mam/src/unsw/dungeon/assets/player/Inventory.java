package unsw.dungeon.assets.player;

import java.util.ArrayList;

import javafx.beans.property.IntegerProperty;
import unsw.dungeon.assets.items.*;
import javafx.beans.property.SimpleIntegerProperty;

/**
 * The Inventory of the player
 * 
 * The class has the responsibility to store collectable items within inventory.
 * Also removes the image of the from the dungeon.
 * 
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Inventory {
    
    private Key hasKey;
    private Sword hasSword;
    private ArrayList<Treasure> treasureBag;
    private IntegerProperty treasureBagNumber;

    public Inventory() {
        this.hasKey = null;
        this.hasSword = new Sword(-1, -1);
        hasSword.attack();
        hasSword.attack();
        hasSword.attack();
        hasSword.attack();
        hasSword.attack();
        this.treasureBag = new ArrayList<>();
        this.treasureBagNumber = new SimpleIntegerProperty(0);
    }

    /**
     * Gets the Key from the inventory
     * 
     * @return Key from inventory
     */
    public Key getKey() {
        return this.hasKey;
    }

    /**
     * Removes key from inventory
     */
    public void removeKey() {
        this.hasKey = null;
    }

    /**
     * Gets sword from the inventory
     * 
     * @return type Sword
     */
    public Sword getSword() {
        return this.hasSword;
    }

    /**
     * Removes Sword from inventory
     */
    public void removeSword() {
        this.hasSword = null;
    }

    /**
     * Checks if a Key can be picked up
     * 
     * @param key that the player has picked up
     * @return true if a key does not exist in the inventory
     * @return false if a key is already stored in inventory
     */
    public boolean pickUpKey(Key key) {
        
        if (getKey() == null) {
            this.hasKey = key;
            System.out.println("Player has picked a key!");
            return true;
        } else {
            System.out.println("Can't pick up Key. Player already has a key!");
            return false;
        }
    }

    /**
     * Collects and stores treasure in inventory that the Player has picked up
     * 
     * @param treasure of type Treasure the player has picked up
     */
    public void addTreasure(Treasure treasure) {
        treasureBag.add(treasure);
        this.treasureBagNumber.set(treasureBagNumber.get() + 1);
        System.out.println("Player has picked a treasure!");
    }

    /**
     * Checks if a Sword can be picked up
     * 
     * @param sword picked up by the Player
     * @return true if no Sword exists in the inventory
     * @return false if a Sword already exists in the inventory
     */
    public boolean pickUpSword(Sword sword) {
        
        if (getSword().getDurability() == 0) {
            this.hasSword.resetSword();
            System.out.println("Player has picked up sword!");
            return true;
        } else {
            System.out.println("Can't pick up sword. Player already has a sword!");
            return false;
        }
    }

    /**
     * Counts the amount of treasure the inventory has stored
     * 
     * @return number of type int 
     */

    public IntegerProperty countTreasureSize() {
        return this.treasureBagNumber;
    }

}