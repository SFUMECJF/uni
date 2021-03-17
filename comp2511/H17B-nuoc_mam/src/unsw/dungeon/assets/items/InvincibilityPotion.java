package unsw.dungeon.assets.items;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.player.*;

/**
 * An entity for invincibility potion
 * Potion is the interface for this class which is a interface component for
 * all possible potions
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class InvincibilityPotion extends Entity implements Potion {

    public InvincibilityPotion(int x, int y) {
        super(x, y);
        this.setimagepath("images/brilliant_blue_new.png");
    }
    
    // Collection of potion and use effect
    // Potion use is yet to be implemented
    @Override
    public void usePotion(Player player, Dungeon dungeon) {
        // set player invicibility for 5 seconds
        player.setInvincibilityState(true);
        player.setStatusTimer(player, this);
        // remove entity
        dungeon.removeEntity(this);
        
    }
    /**
     * plays sound from potion collect file
     */
    @Override
    public void playSound() {
        Sound.playGetPotion();
    }

}