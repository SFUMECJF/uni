package unsw.dungeon.assets.items;

import unsw.dungeon.assets.*;
/**
 * An entity for the Treasure in the dungeon
 * 
 * Is an that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Treasure extends Entity implements SoundEntity{

    public Treasure(int x, int y) {
        super(x, y);
        this.setimagepath("images/gold_pile.png");
    }
    
    // plays sound of treasure being picked up
    @Override
    public void playSound() {
        Sound.playGetTreasure();
    }
}