package unsw.dungeon.assets.items;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.player.*;

/**
 * A blanket interface for all potions
 * 
 * Is a movable object that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public interface Potion extends SoundEntity{
    public void usePotion(Player player, Dungeon dungeon);
}