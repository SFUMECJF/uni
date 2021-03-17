package unsw.dungeon.assets.environment;

import unsw.dungeon.assets.*;

/**
 * An entity for exits
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Exit extends Entity{

    public Exit(int x, int y) {
        super(x, y);
        this.setimagepath("images/exit.png");
    }
    
}