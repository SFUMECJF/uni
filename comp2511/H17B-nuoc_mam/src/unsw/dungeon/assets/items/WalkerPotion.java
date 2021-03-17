package unsw.dungeon.assets.items;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.player.*;

public class WalkerPotion extends Entity implements Potion{
    
    public WalkerPotion(int x, int y) {
        super(x, y);
        this.setimagepath("images/brilliant_purple_new.png");
    }
    // Collection of potion and use effect
    // Potion use is yet to be implemented
    @Override
    public void usePotion(Player player, Dungeon dungeon) {
        // set player invicibility for 5 seconds
        player.setWalkerState(true);
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